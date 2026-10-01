import React, { useContext } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import { auth } from "../../../Utility/firebase";
import { DataContext } from "../../../DataContext/DataContext";

function Header() {
  // 1. ከ DataContext ውስጥ state እና dispatch ን መቀበል
  const [{ basket, user }, dispatch] = useContext(DataContext);

  // 2. በካርት ውስጥ ያሉትን ጠቅላላ የዕቃዎች ብዛት (Quantity) ማስላት
  const totalItemCount = basket?.reduce(
    (amount, item) => item.amount + amount,
    0,
  );
  // 🟢 Sign Out የማድረጊያ Function
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className="header">
      {/* Top section for mobile / regular flex row for desktop */}
      <div className="header__top">
        {/* Logo */}
        <Link to="/">
          <img
            className="header__logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="amazon logo"
          />
        </Link>

        {/* Deliver To */}
        <div className="header__option header__delivery">
          <LocationOnIcon className="header__locationIcon" />
          <div className="header__optionLine">
            <span className="header__optionLineOne">Delivered to</span>
            <span className="header__optionLineTwo">Ethiopia</span>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="header__search header__searchDesktop">
          <select className="header__select">
            <option value="all">All</option>
          </select>
          <input
            className="header__searchInput"
            type="text"
            placeholder="Search Product"
          />
          <SearchIcon className="header__searchIcon" />
        </div>

        {/* Navigation Options */}
        <div className="header__nav">
          {/* Language Selection */}
          <div className="header__option header__language">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
              alt="US Flag"
              className="header__flagImg"
            />
            <select className="header__languageSelect">
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="am">AM</option>
            </select>
          </div>

          {/* 🟢 የተስተካከለው የ Sign In / Sign Out ክፍል */}
          <Link to={!user && "/auth"}>
            <div onClick={handleAuthentication} className="header__option">
              <span className="header__optionLineOne">
                {user
                  ? `Hello, ${user.email?.split("@")[0]}`
                  : "Hello, Sign in"}
              </span>
              <span className="header__optionLineTwo">
 
                 {user ? "Sign Out" : "Account & Lists"}
              </span>
            </div>
          </Link>

          {/* Returns & Orders */}
          <Link to="/orders" className="header__clearLink">
            <div className="header__option header__returns">
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo">& Orders</span>
            </div>
          </Link>

          {/* Cart with Dynamic Count */}
          <Link to="/cart" className="header__clearLink">
            <div className="header__optionCart">
              <div className="header__cartIconContainer">
                {/*  static 0 የነበረው በ totalItemCount ተክቶታል */}
                <span className="header__cartCount">{totalItemCount || 0}</span>
                <ShoppingCartOutlinedIcon className="header__cartIcon" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="header__search header__searchMobile">
        <select className="header__select">
          <option value="all">All</option>
        </select>
        <input
          className="header__searchInput"
          type="text"
          placeholder="Search Product"
        />
        <SearchIcon className="header__searchIcon" />
      </div>
    </div>
  );
}

export default Header;
