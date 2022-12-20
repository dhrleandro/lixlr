/**
 * Leandro Daher, 2022
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Pinch_zoom_gestures
 */

export default class PinchGesture {

  private element: HTMLElement;

  // Global vars to cache event state
  private evCache: any = [];
  private prevDiff: number = -1;

  private pinchInCallback: () => void;
  private pinchOutCallback: () => void;

  constructor(element: HTMLElement, pinchInCallback: () => void, pinchOutCallback: () => void) {
    this.element = element;
    this.pinchInCallback = pinchInCallback;
    this.pinchOutCallback = pinchOutCallback;
  }

  private log(msg: string, ev?: PointerEvent) {
    // console.log({msg, ev});
  }

  private removeEvent(ev: PointerEvent) {
    // Remove this event from the target's cache
    const index = this.evCache.findIndex((cachedEv: PointerEvent) => cachedEv.pointerId === ev.pointerId);
    this.evCache.splice(index, 1);
  }

  public mountEvents() {
    // Install event handlers for the pointer target
    this.element.addEventListener('pointerdown', this.pointerdownHandler.bind(this));
    this.element.addEventListener('pointermove', this.pointermoveHandler.bind(this));

    // Use same handler for pointer{up,cancel,out,leave} events since
    // the semantics for these events - in this app - are the same.
    this.element.addEventListener('pointerup', this.pointerupHandler.bind(this));
    this.element.addEventListener('pointercancel', this.pointerupHandler.bind(this));
    this.element.addEventListener('pointerout', this.pointerupHandler.bind(this));
    this.element.addEventListener('pointerleave', this.pointerupHandler.bind(this));
  }

  public unmountEvents() {
    // Install event handlers for the pointer target
    this.element.removeEventListener('pointerdown', this.pointerdownHandler.bind(this));
    this.element.removeEventListener('pointermove', this.pointermoveHandler.bind(this));

    // Use same handler for pointer{up,cancel,out,leave} events since
    // the semantics for these events - in this app - are the same.
    this.element.removeEventListener('pointerup', this.pointerupHandler.bind(this));
    this.element.removeEventListener('pointercancel', this.pointerupHandler.bind(this));
    this.element.removeEventListener('pointerout', this.pointerupHandler.bind(this));
    this.element.removeEventListener('pointerleave', this.pointerupHandler.bind(this));
  }

  public getCountOfPoints() {
    return this.evCache.length;
  }

  private pointerdownHandler(ev: PointerEvent) {
    // The pointerdown event signals the start of a touch interaction.
    // This event is cached to support 2-finger gestures
    this.evCache.push(ev);
    this.log("pointerDown", ev);
  }

  private pointermoveHandler(ev: PointerEvent) {
    // This function implements a 2-pointer horizontal pinch/zoom gesture.
    //
    // If the distance between the two pointers has increased (zoom in),
    // the target element's background is changed to "pink" and if the
    // distance is decreasing (zoom out), the color is changed to "lightblue".
    //
    // This function sets the target element's border to "dashed" to visually
    // indicate the pointer's target received a move event.
    this.log("pointerMove", ev);

    // Find this event in the cache and update its record with this event
    const index = this.evCache.findIndex((cachedEv: PointerEvent) => cachedEv.pointerId === ev.pointerId);
    this.evCache[index] = ev;

    // If two pointers are down, check for pinch gestures
    if (this.evCache.length === 2) {
      // Calculate the distance between the two pointers
      const curDiff = Math.abs(this.evCache[0].clientX - this.evCache[1].clientX);

      if (this.prevDiff > 0) {
        if (curDiff > this.prevDiff) {
           // The distance between the two pointers has increased
           this.log("Pinch moving OUT -> Zoom in", ev);
           this.pinchInCallback();
        }
        if (curDiff < this.prevDiff) {
          // The distance between the two pointers has decreased
          this.log("Pinch moving IN -> Zoom out",ev);
          this.pinchOutCallback();
        }
      }

      // Cache the distance for the next move event
      this.prevDiff = curDiff;
    }
  }

  private pointerupHandler(ev: PointerEvent) {
    this.log(ev.type, ev);
    // Remove this pointer from the cache and reset the target's
    // background and border
    this.removeEvent(ev);

    // If the number of pointers down is less than two then reset diff tracker
    if (this.evCache.length < 2) {
      this.prevDiff = -1;
    }
  }

}
