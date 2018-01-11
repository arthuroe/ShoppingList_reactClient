import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import ShoppingListItem from "./shoppinglistItem";
import { ToastContainer } from "react-toastify";
import Pagination from "./pagination";
import Navbar from "./navbar";
import instance from "../config";

class ShoppingListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: window.localStorage.getItem("token"),
      listname: "",
      listid: "",
      items: [],
      term: "",
      page: 1,
      response: {}
    };
    this.searchHandler = this.searchHandler.bind(this);
    this.searchingFor = this.searchingFor.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  componentWillMount() {
    this.getShoppinglistName();
    this.getShoppinglistItems(this.state.page);
  }

  searchingFor(term) {
    return function(x) {
      return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
    };
  }

  searchHandler(e) {
    this.setState({ term: e.target.value });
  }

  getShoppinglistItems(page) {
    // Fetches shoppinglist items from the API
    let listId = this.props.match.params.id;
    instance
      .get(`/shoppinglists/${listId}/items?limit=5&page=${page}`)
      .then(response => {
        this.setState({
          items: response.data.items,
          response: response.data,
          page: response.data.current
        });
      })
      .catch(err => {});
  }

  getShoppinglistName(page) {
    // Get the name of the shoppinglist from which items are being fetched
    let listId = this.props.match.params.id;
    instance
      .get(`/shoppinglists/${listId}?limit=20&page=${page}`)
      .then(response => {
        this.setState({
          listname: response.data.shoppinglist[0].name,
          listid: response.data.shoppinglist[0].id
        });
      })
      .catch(err => {});
  }

  nextPage() {
    //Load the next page of shoppinglist items
    this.getShoppinglistItems(this.state.response.next);
  }

  prevPage() {
    //Load the prevoius page of shoppinglist items
    this.getShoppinglistItems(this.state.response.prev);
  }

  render() {
    //Restrict unauthorized access
    if (!this.state.authenticated) {
      return <Redirect to="/" />;
    }

    //Notify user items are being loaded
    if (!this.state.items) {
      return <div>loading</div>;
    }
    const shoppinglistItems = this.state.items
      .filter(this.searchingFor(this.state.term))
      .map((shoppinglistItem, i) => {
        return (
          <ShoppingListItem
            listid={this.state.listid}
            key={shoppinglistItem.id}
            shoppinglistItem={shoppinglistItem}
          />
        );
      });
    return (
      <div>
        <Navbar />
        <div className="container">
          <br />
          <Link className="btn grey" to="/shoppinglists">
            Back
          </Link>
          <h1>{this.state.listname}</h1>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
          />
          <form>
            <input
              id="search"
              type="text"
              placeholder="search"
              onChange={this.searchHandler}
            />
          </form>
          <ul className="collection">{shoppinglistItems}</ul>
          <Pagination
            page={this.state.response.current}
            pages={this.state.response.pages}
            onNext={this.nextPage}
            onPrev={this.prevPage}
          />
          <Link
            to={`/shoppinglist/items/add/${this.state.listid}`}
            className="btn-large btn-floating red"
          >
            <i className="fa fa-plus" />
          </Link>
        </div>
      </div>
    );
  }
}

export default ShoppingListItems;
