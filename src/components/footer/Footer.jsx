import styles from "../../styles/components/footer/footer.module.css";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="#" className={styles["footer-logo"]}>
        로고
      </a>
      <p className={styles.copy}>카피라이트</p>
      <div className={styles.sns}>SNS</div>
    </footer>
  );
};

export default Footer;
