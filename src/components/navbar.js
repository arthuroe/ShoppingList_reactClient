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
            <Link to="/shoppinglists" className="brand-logo center">
              Shoppinglists
            </Link>
            <ul className="right hide-on-small-only use">
              <li>
                <i className="fa fa-user fa-3" aria-hidden="true" />
                {this.state.name}
              </li>
              <li>
                <Link to="/logout">
                  <i className="fa fa-sign-out" aria-hidden="true" />Log Out
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
