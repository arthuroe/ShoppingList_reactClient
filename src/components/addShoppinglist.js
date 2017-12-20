import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

class AddShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: window.localStorage.getItem("token"),
      name: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    axios.defaults.headers.common[
      "Authorization"
    ] = window.localStorage.getItem("token");
    axios
      .post("http://localhost:5000/api/v1/shoppinglists/", {
        name: this.state.name
      })
      .then(response => {
        this.props.history.push("/shoppinglists");
        toast.success(response.data.message);
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
  };

  render() {
    if (!this.state.authenticated) {
      <Redirect to="/" />;
    }
    return (
      <div>
        <br />
        <Link className="btn grey" to="/shoppinglists">
          Back
        </Link>
        <h1>Add shoppinglist</h1>
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

export default AddShoppingList;
