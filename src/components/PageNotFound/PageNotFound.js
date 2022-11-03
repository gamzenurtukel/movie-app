import React from "react";
import Lottie from "lottie-react";
import NotFound from "../../Lottie/notFound.json";
import styles from "./PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <Lottie animationData={NotFound} loop={true} className={styles.lottie} />
    </div>
  );
};

export default PageNotFound;
