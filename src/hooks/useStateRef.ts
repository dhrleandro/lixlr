import React from 'react';

type GetterFunction<S> = () => S;
type SetterFunction<S> = (state: S) => void;

// Hook criado para evitar a utilização de ref.current o tempo todo no código, ao invés disso utilizaremos uma função getter
// como se fosse um useState(), mas ao inves de pegar o valor com state, pegamos usando state()
// Não faz o componente re-renderizar caso o estado mude pois estamos utilizando useRef()
// https://www.smashingmagazine.com/2020/11/react-useref-hook/
export const useStateRef = <T>(state: T): [GetterFunction<T>, SetterFunction<T>] => {

  const refState = React.useRef<T>(state);

  function getState(): T {
    return refState.current;
  }

  function setRefState(state: T) {
    refState.current = state;
  }

  return [
    getState,
    setRefState
  ]
}
