import React from 'react';
import styles from "../styles/Sidebar.module.css";
import Button from './Button';
import { Close } from '../icons';

export interface SidebarProps {
  children?: React.ReactNode;
  openIcon?: JSX.Element;
}

function Sidebar(props: SidebarProps) {

  const [visible, setVisible] = React.useState(false);

  return (
    <div className={`${styles.sidebar} ${visible ? styles.visible : ''}`}>
      <div className={styles.sidebarBody}>
        <Button
          solid={!visible}
          light={visible}
          className={styles.toggleButton}
          click={() => setVisible(!visible)}
          w={32}
          h={32}
        >
          {visible ? (<Close />) : props.openIcon}
        </Button>

        {props.children}

      </div>
    </div>
  );
}

export default Sidebar;
