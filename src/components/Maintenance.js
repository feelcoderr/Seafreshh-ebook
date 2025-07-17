import styles from "./Maintenance.module.css";

export default function Maintenance() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>We'll be back soon!</h1>
        <p className={styles.subtitle}>
          Our website is currently undergoing scheduled maintenance.
          <br /> We should be back shortly. Thank you for your patience.
        </p>
        <div className={styles.footer}>— The Team</div>
      </div>
    </div>
  );
}
