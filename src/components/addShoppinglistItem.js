import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

class AddShoppingListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    let listId = this.props.match.params.id;
    e.preventDefault();
    axios.defaults.headers.common[
      "Authorization"
    ] = window.localStorage.getItem("token");
    axios
      .post(`http://localhost:5000/api/v1/shoppinglists/${listId}/items`, {
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
    return (
      <div>
        <br />
        <Link className="btn grey" to="/shoppinglists">
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

export default AddShoppingListItem;
