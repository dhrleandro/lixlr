import React from "react";
import { Close } from "../icons";
import styles from "../styles/Modal.module.css";
import Button from "./Button";

interface ModalProps {
  style?: React.CSSProperties,
  children?: React.ReactNode;
  solidCloseButton?: boolean;
  solidCloseButtonText?: string;
  w?: number;
  h?: number;
  opened: boolean;
}

function Modal(props: ModalProps) {

  const [opened, setOpened] = React.useState(props.opened);

  return (
    <div
      className={`
        ${styles.modal}
        ${opened ? '' : styles.closed}
      `}
    >
      <div
        className={styles.modalFront}
        style={{
          ...props.style,
          width: props.w+'px' ?? '300px',
          height: props.h+'px' ?? '300px'
        }}
      >
        <Button
          className={styles.close}
          click={() => setOpened(false)}
        >
          <Close />
        </Button>

        {props.children}

        <Button
          solid={true}
          w={100}
          h={64}
          click={() => setOpened(false)}
        >
          {props.solidCloseButtonText}
        </Button>

      </div>
    </div>
  );
}

export default Modal;
