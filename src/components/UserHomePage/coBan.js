import React, { useState } from "react";
import styles from "./coBan.module.css";
import cobanimg from '../../assets/images/cobanimg.png'
const coBan = () => {

    return (
        <div className={styles.container}>
            <img src={cobanimg} alt="logo"></img>
        </div>
    );
};

export default coBan;