import React, { Component } from "react";
import axios from "axios";
import ShoppingList from "./shoppinglist";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

class ShoppingLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppinglists: []
    };
    this.searchHandler = this.searchHandler.bind(this);
  }

  componentWillMount() {
    this.getShoppinglists();
  }

  getShoppinglists() {
    axios.defaults.headers.common[
      "Authorization"
    ] = window.localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/v1/shoppinglists")
      .then(response => {
        this.setState({ shoppinglists: response.data.shoppinglists });
      })
      .catch(err => {
        toast.error(err.response.data.message);
        if (
          err.response.data.message ==
            "Invalid token. Please register or login" ||
          "Expired token. Please login to get a new token" ||
          "Token blacklisted. Please log in again." ||
          "Token is missing!"
        ) {
          this.props.history.push("/");
        }
      });
  }

  render() {
    const shoppinglists = this.state.shoppinglists.map((shoppinglist, i) => {
      return <ShoppingList key={shoppinglist.id} shoppinglist={shoppinglist} />;
    });
    return (
      <div>
        <h1>shoppinglists</h1>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        <form>
          <input id="search" type="text" placeholder="search" />
        </form>
        <ul className="collection">{shoppinglists}</ul>
        <div className="fixed-action-btn">
          <Link to="/shoppinglist/add" className="btn-large btn-floating red">
            <i className="fa fa-plus" />
          </Link>
        </div>
      </div>
    );
  }
}

export default ShoppingLists;
