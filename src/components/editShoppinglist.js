import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./navbar";
import instance from "../config";

class EditShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: window.localStorage.getItem("token"),
      name: ""
    };
  }

  componentWillMount() {
    this.getShoppinglistName();
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getShoppinglistName() {
    let listId = this.props.match.params.id;
    instance
      .get(`/shoppinglists/${listId}`)
      .then(response => {
        this.setState({
          name: response.data.shoppinglist[0].name
        });
      })
      .catch(err => console.log(err));
  }

  onSubmit = e => {
    let listId = this.props.match.params.id;
    e.preventDefault();
    instance
      .put(`/shoppinglists/${listId}`, {
        name: this.state.name
      })
      .then(response => {
        this.props.history.push(`/shoppinglists`);
        toast.success(response.data.message);
      })
      .catch(err => {
        toast.error(err.response.data.message);
        if (
          err.response.data.message ===
            "Invalid token. Please register or login" ||
          "Expired token. Please login to get a new token" ||
          "Token blacklisted. Please log in again." ||
          "Token is missing!"
        ) {
          this.props.history.push("/");
        }
      });
  };

  render() {
    const { name, authenticated } = this.state;
    if (!authenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Navbar />
        <div className="container">
          <br />
          <Link className="btn grey" to="/shoppinglists">
            Back
          </Link>
          <h1>Edit shoppinglist</h1>
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
              <label htmlFor="name" />
            </div>
            <input type="submit" value="Save" className="btn" />
          </form>
        </div>
      </div>
    );
  }
}

export default EditShoppingList;
