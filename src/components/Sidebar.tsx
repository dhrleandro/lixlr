import React from 'react';
import styles from "../styles/Sidebar.module.css";
import Button from './Button';
import { Close } from '../icons';

export interface SidebarProps {
  children?: React.ReactNode;
  openIcon?: JSX.Element;
  right?: boolean
  buttonTop?: number;
}

function Sidebar(props: SidebarProps) {

  const [visible, setVisible] = React.useState(false);

  return (
    <div className={`
      ${styles.sidebar}
      ${visible ? (props.right ? styles.visibleRight : styles.visibleLeft) : ''}
      ${props.right ? styles.right : styles.left}
    `}>
      <div className={styles.sidebarBody}>
        <Button
          solid={!visible}
          light={visible}
          className={`
            ${styles.toggleButton}
            ${props.right ? styles.btnRight : styles.btnLeft}
          `}
          click={() => setVisible(!visible)}
          w={32}
          h={32}
          style={{top: props.buttonTop ? props.buttonTop+'px' : 0}}
        >
          {visible ? (<Close />) : props.openIcon}
        </Button>

        <div className={styles.content}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
