import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../config";

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    let { shoppinglist } = this.props;
    this.state = {
      item: shoppinglist,
      redirect: false
    };
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    instance
      .delete(`/shoppinglists/${this.state.item.id}`)
      .then(response => {
        this.setState({ redirect: true });
        toast.success(response.data.message);
      })
      .catch(err => {
        toast.error(err);
      });
  }

  render() {
    const { id, name } = this.state.item;
    const { redirect, item } = this.state;
    if (redirect) {
      return <Redirect push to={"/shoppinglists"} />;
    }
    if (!item) {
      return <div>Loading...</div>;
    }
    return (
      <li className="collection-item">
        <Link to={`/shoppinglists/${id}`}>{name}</Link>
        <Link className="btn right" to={`/shoppinglists/edit/${id}`}>
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
