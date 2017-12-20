import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ShoppingListItem from "./shoppinglistItem";
import { ToastContainer } from "react-toastify";

class ShoppingListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listname: "",
      listid: "",
      items: []
    };
  }

  componentWillMount() {
    this.getShoppinglistName();
    this.getShoppinglistItems();
  }

  getShoppinglistItems() {
    let listId = this.props.match.params.id;
    axios.defaults.headers.common[
      "Authorization"
    ] = window.localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/api/v1/shoppinglists/${listId}/items`)
      .then(response => {
        this.setState({ items: response.data.shoppinglist_items });
      })
      .catch(err => {
        `err:${err}`;
        // if (
        //   err.response.data.message ==
        //     "Invalid token. Please register or login" ||
        //   "Expired token. Please login to get a new token" ||
        //   "Token blacklisted. Please log in again." ||
        //   "Token is missing!"
        // ) {
        //   this.props.history.push("/");
        // }
      });
  }

  getShoppinglistName() {
    let listId = this.props.match.params.id;
    axios.defaults.headers.common[
      "Authorization"
    ] = window.localStorage.getItem("token");
    axios
      .get(`http://localhost:5000/api/v1/shoppinglists/${listId}`)
      .then(response => {
        this.setState({
          listname: response.data.shoppinglist[0].name,
          listid: response.data.shoppinglist[0].id
        });
      })
      .catch(err => {
        `err:${err}`;
      });
  }

  render() {
    const shoppinglistItems = this.state.items.map((shoppinglistItem, i) => {
      return (
        <ShoppingListItem
          listid={this.state.listid}
          key={shoppinglistItem.id}
          shoppinglistItem={shoppinglistItem}
        />
      );
    });
    return (
      <div>
        <br />
        <Link className="btn grey" to="/shoppinglists">
          Back
        </Link>
        <h1>{this.state.listname}</h1>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        <ul className="collection">{shoppinglistItems}</ul>
        <Link
          to={`/shoppinglist/items/add/${this.state.listid}`}
          className="btn-large btn-floating red"
        >
          <i className="fa fa-plus" />
        </Link>
      </div>
    );
  }
}

export default ShoppingListItems;
