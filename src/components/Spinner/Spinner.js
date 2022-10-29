import { Spin } from "antd";
import styles from "./Spinner.module.css";

export default function Spinner({ tip = "Loading..." }) {
  return (
    <div className={styles.spinnerContainer}>
      <Spin tip={tip} />
    </div>
  );
}
