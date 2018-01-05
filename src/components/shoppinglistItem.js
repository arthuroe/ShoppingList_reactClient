import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../config";

class ShoppingListItem extends Component {
  constructor(props) {
    super(props);
    let { listid, shoppinglistItem } = this.props;
    this.state = {
      item: shoppinglistItem,
      listid: listid,
      redirect: false
    };
  }

  onDelete = () => {
    //Deletes item from shoppinglist
    instance
      .delete(`/shoppinglists/${this.state.listid}/items/${this.state.item.id}`)
      .then(response => {
        this.setState({ redirect: true });
        //return a flash message
        toast.success(response.data.message);
      })
      .catch(err => {});
  };

  render() {
    const { id, name } = this.state.item;
    const { item, listid } = this.state;
    //Reload  items page after delete
    if (this.state.redirect) {
      return <Redirect push to={`/shoppinglists/${listid}`} />;
    }
    //Notify user items are being loaded
    if (!item) {
      return <div>Loading...</div>;
    }
    return (
      <li className="collection-item">
        {name}
        <Link
          className="btn right"
          to={`/shoppinglists/${listid}/items/edit/${id}`}
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
