import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

class ShoppingListItem extends Component {
  constructor(props) {
    super(props);
    let listId = this.props.listid;
    this.state = {
      item: props.shoppinglistItem,
      listid: listId,
      redirect: false
    };
  }

  onDelete = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = window.localStorage.getItem("token");
    axios
      .delete(
        `http://localhost:5000/api/v1/shoppinglists/${this.state
          .listid}/items/${this.state.item.id}`
      )
      .then(response => {
        this.setState({ redirect: true });
        toast.success(response.data.message);
      })
      .catch(err => {
        // toast.error(err.response.data.message);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to={`/shoppinglists/${this.state.listid}`} />;
    }
    return (
      <li className="collection-item">
        {this.state.item.name}
        <Link
          className="btn right"
          to={`/shoppinglists/${this.state.listid}/items/edit/${this.state.item
            .id}`}
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

export default ShoppingListItem;
