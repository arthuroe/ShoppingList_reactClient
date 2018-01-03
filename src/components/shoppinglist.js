import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    let filter = this.props.filter;
    this.state = {
      item: props.shoppinglist,
      redirect: false
    };
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    axios.defaults.headers.common[
      "Authorization"
    ] = window.localStorage.getItem("token");
    axios
      .delete(
        `http://localhost:5000/api/v1/shoppinglists/${this.state.item.id}`
      )
      .then(response => {
        this.setState({ redirect: true });
        toast.success(response.data.message);
      })
      .catch(err => {
        toast.error(err.response.data.message);
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={"/shoppinglists"} />;
    }
    return (
      <li className="collection-item">
        <Link to={`/shoppinglists/${this.state.item.id}`}>
          {this.state.item.name}
        </Link>
        <Link
          className="btn right"
          to={`/shoppinglists/edit/${this.state.item.id}`}
        >
          Edit
        </Link>
        <button onClick={this.onDelete} className="btn red right">
          Delete
        </button>
      </li>
    );
  }
}

export default ShoppingList;
