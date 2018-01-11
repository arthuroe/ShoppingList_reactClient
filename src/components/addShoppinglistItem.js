import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./navbar";
import instance from "../config";

class AddShoppingListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: window.localStorage.getItem("token"),
      name: "",
      listId: this.props.match.params.id
    };
  }

  onChange = e => {
    //Updates state with user input
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    //Sends a request to for adding shoppinglist item to API
    let listId = this.props.match.params.id;
    e.preventDefault();
    instance
      .post(`/shoppinglists/${listId}/items`, {
        name: this.state.name
      })
      .then(response => {
        //Redirects to shoppinglist items page after successfully adding an item
        this.props.history.push(`/shoppinglists/${listId}`);
        //notifies a user on successfully adding an item to a list
        toast.success(response.data.message);
      })
      .catch(err => {
        //notifies a user on issues when adding an item to a list
        toast.error(err.response.data.message);
      });
  };

  render() {
    const { name, authenticated, listId } = this.state;
    //Blocks unauthorized access
    if (!authenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Navbar />
        <div className="container">
          <br />
          <Link className="btn grey" to={`/shoppinglists/${listId}`}>
            Back
          </Link>
          <h1>Add shoppinglist Item</h1>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
          />
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

export default AddShoppingListItem;
