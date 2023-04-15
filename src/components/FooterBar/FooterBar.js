import "./FooterBar.scss";
import bigLogo from "../../assets/big_logo.png";

const FooterBar = () => {
  return (
    <footer className="footer">
      <img className="footer__logo" src={bigLogo} alt="The Movie Database" />
    </footer>
  );
};

export default FooterBar;
