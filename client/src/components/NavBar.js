import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";

import { AuthContext } from "../context/auth";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);

  const [activeMenuItem, setActiveMenuItem] = useState("login");

  const handleMenuItemClick = (_, { name }) => {
    setActiveMenuItem(name);
  };

  return (
    <Menu
      pointing
      secondary
      color="blue"
      size="massive"
      test-class="navbar"
    >
      <Menu.Item
        as={Link}
        to="/"
        name="quiz"
        test-class="navbar-item-quiz"
        onClick={handleMenuItemClick}
        active={activeMenuItem === "quiz"}
      />
      {user ? (
        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/login"
            name="logout"
            onClick={logout}
            test-class="navbar-item-logout"
            active={activeMenuItem === "logout"}
          />
        </Menu.Menu>
      ) : (
        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/register"
            name="register"
            test-class="navbar-item-register"
            onClick={handleMenuItemClick}
            active={activeMenuItem === "register"}
          />
          <Menu.Item
            as={Link}
            to="/login"
            name="login"
            test-class="navbar-item-login"
            onClick={handleMenuItemClick}
            active={activeMenuItem === "login"}
          />
        </Menu.Menu>
      )}
    </Menu>
  );
}
