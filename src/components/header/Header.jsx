import styles from "../../styles/components/header/header.module.css";
const Header = () => {
  return (
    <header className={styles.header}>
      <a href="#" className={styles.logo}>
        로고
      </a>
      <nav className={styles.gnb}>메뉴</nav>
    </header>
  );
};

export default Header;
