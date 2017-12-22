import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class EditShoppingListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      listid: ""
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
    axios.defaults.headers.common[
      "Authorization"
    ] = window.localStorage.getItem("token");
    axios
      .get(
        `http://localhost:5000/api/v1/shoppinglists/${listId}/items/${itemId}`
      )
      .then(response => {
        this.setState({
          name: response.data.shoppinglist_item[0].name
        });
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

  onSubmit = e => {
    let itemId = this.props.match.params.id;
    let listId = this.props.match.params.listid;
    e.preventDefault();
    axios.defaults.headers.common[
      "Authorization"
    ] = window.localStorage.getItem("token");
    axios
      .put(
        `http://localhost:5000/api/v1/shoppinglists/${listId}/items/${itemId}`,
        {
          name: this.state.name
        }
      )
      .then(response => {
        this.props.history.push(`/shoppinglists/${listId}`);
        toast.success(response.data.message);
      })
      .catch(err => {
        toast.error(err.response.data.message);
      });
  };

  render() {
    return (
      <div>
        <br />
        <Link className="btn grey" to={`/shoppinglists/${this.state.listid}`}>
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
              value={this.state.name}
            />
            <label htmlFor="name">Name</label>
          </div>
          <input type="submit" value="Save" className="btn" />
        </form>
      </div>
    );
  }
}

export default EditShoppingListItem;
