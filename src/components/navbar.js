import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./search.js";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      name: window.localStorage.getItem("name")
    };
  }
  render() {
    return (
      <div>
        <nav className="blue darken-3">
          <div className="nav-wrapper">
            <Link to="/shoppinglists" className="brand-logo center">
              Shoppinglists
            </Link>
            <a
              data-activates="main-menu"
              className="button-collapse show-on-large"
            >
              <i className="fa fa-bars" />
            </a>
            <ul className="right hide-on-small-only use">
              <li>
                <Link to="/">
                  <i className="fa fa-user fa-3" aria-hidden="true" />
                  {this.state.name}
                </Link>
              </li>
              <li>
                <Link to="/logout">
                  <i className="fa fa-sign-out" aria-hidden="true" />Log Out
                </Link>
              </li>
            </ul>

            <ul className="side-nav" id="main-menu">
              <li />
              <li>
                <Link to="/">
                  <i className="fa fa-users" /> Shoppinglists
                </Link>
              </li>
              <li>
                <Link to="/shoppinglist/add">
                  <i className="fa fa-plus" /> Add ShoppingList
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
