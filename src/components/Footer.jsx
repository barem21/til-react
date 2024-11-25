import footer from "./footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={footer.layout}>
        <a href="#">로고</a>
        <div>카피라이트</div>
        <div>SNS link</div>
      </div>
    </footer>
  );
};

export default Footer;
