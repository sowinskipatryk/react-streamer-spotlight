import React from 'react';
import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';

const ModalOverlay = (props) => {
    return <div className={styles.modal}>{props.children}</div>;
}

const portalElement = document.getElementById('overlays');

const Modal = props => {
    return <>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </>
}

export default Modal;