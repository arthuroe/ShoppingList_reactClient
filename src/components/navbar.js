import React, { Component } from "react";
import { Link } from "react-router-dom";

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
            <a href="/shoppinglists" className="brand-logo center">
              Shoppinglists
            </a>
            <a
              data-activates="main-menu"
              className="button-collapse show-on-large"
            >
              <i className="fa fa-bars" />
            </a>
            <ul className="right hide-on-small-only">
              <li>
                <a href="/">
                  <i className="fa fa-user fa-3" aria-hidden="true" />
                  {this.state.name}
                </a>
              </li>
              <li>
                <a href="/logout">
                  <i className="fa fa-sign-out" aria-hidden="true" />Log Out
                </a>
              </li>
            </ul>
            <ul className="side-nav" id="main-menu">
              <li>
                <a href="/">
                  <i className="fa fa-users" /> Shoppinglists
                </a>
              </li>
              <li>
                <a href="/shoppinglist/add">
                  <i className="fa fa-plus" /> Add ShoppingList
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
