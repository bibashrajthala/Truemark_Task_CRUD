import React from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import "./header.css";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header__logo-container">
          <Logo className="header__logo" />
        </div>
      </header>
    </>
  );
};

export default Header;
