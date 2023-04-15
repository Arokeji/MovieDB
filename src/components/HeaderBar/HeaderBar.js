import "./HeaderBar.scss";
import logo from "../../assets/logo.png";
import { useContext, useState } from "react";
import { LanguageSelector } from "../../App";
import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";

const HeaderBar = () => {
  // Language
  const { language, setLanguage } = useContext(LanguageSelector);
  // States
  const [currentComponent, setCurrentComponent] = useState("Movies");
  return (
    <header className="header">
      <div className="header__navigation">
        <img className="header__logo" src={logo} alt="MovieDataBase" />
        <nav className="header__options">
          <NavLink to="/" className={currentComponent === "Movies" ? "header__link--selected" : "header__link"} onClick={() => setCurrentComponent("Movies")} >
            <FormattedMessage id="header:movies" />
          </NavLink>
          <NavLink to="/quizz/" className={currentComponent === "Quizz" ? "header__link--selected" : "header__link"} onClick={() => setCurrentComponent("Quizz")} >
            <FormattedMessage id="header:quiz" />
          </NavLink>
        </nav>
      </div>
      <div className="header__language">
        <button className={language === "es-ES" ? "header__country--selected" : "header__country"} onClick={() => setLanguage("es-ES")}>
          ES
        </button>
        <button className={language === "en-EN" ? "header__country--selected" : "header__country"} onClick={() => setLanguage("en-EN")}>
          EN
        </button>
      </div>
    </header>
  );
};

export default HeaderBar;
