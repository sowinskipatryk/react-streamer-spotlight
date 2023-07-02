import React from 'react';
import styles from './Backdrop.module.css';

const Backdrop = ({setShowForm}) => {
    return <div className={styles.backdrop} onClick={() => {setShowForm(false)}}></div>
}

export default Backdrop;