import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./navbar";
import instance from "../config";

class EditShoppingListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: window.localStorage.getItem("token"),
      name: "",
      listid: this.props.match.params.listid
    };
  }

  componentWillMount() {
    this.getShoppinglistItemName();
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getShoppinglistItemName() {
    let itemId = this.props.match.params.id;
    let listId = this.props.match.params.listid;

    instance
      .get(`/shoppinglists/${listId}/items/${itemId}`)
      .then(response => {
        this.setState({
          name: response.data.shoppinglist_item[0].name
        });
      })
      .catch(err => {});
  }

  onSubmit = e => {
    let itemId = this.props.match.params.id;
    let listId = this.props.match.params.listid;
    e.preventDefault();

    instance
      .put(`/shoppinglists/${listId}/items/${itemId}`, {
        name: this.state.name
      })
      .then(response => {
        this.props.history.push(`/shoppinglists/${listId}`);
        toast.success(response.data.message);
      })
      .catch(err => {
        toast.error(err.response.data.message);
      });
  };

  render() {
    const { name, authenticated, listid } = this.state;
    if (!authenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Navbar />
        <div className="container">
          <br />
          <Link className="btn grey" to={`/shoppinglists/${listid}`}>
            Back
          </Link>
          <h1>Edit shoppinglist Item</h1>
          <form onSubmit={e => this.onSubmit(e)}>
            <div className="input-field">
              <input
                type="text"
                id="name"
                name="name"
                ref="name"
                onChange={e => this.onChange(e)}
                value={name}
              />
              <label htmlFor="name">Name</label>
            </div>
            <input type="submit" value="Save" className="btn" />
          </form>
        </div>
      </div>
    );
  }
}

export default EditShoppingListItem;
