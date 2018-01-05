import React, { Component } from "react";
import ShoppingList from "./shoppinglist";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Pagination from "./pagination";
import Navbar from "./navbar";
import instance from "../config";

class ShoppingLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: window.localStorage.getItem("token"),
      shoppinglists: [],
      term: "",
      response: {},
      page: 1
    };
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.searchingFor = this.searchingFor.bind(this);
  }

  componentWillMount() {
    // Loads the shoppinglists into the component
    this.getShoppinglists(this.state.page);
  }

  searchingFor(term) {
    return function(x) {
      return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
    };
  }

  searchHandler(e) {
    this.setState({ term: e.target.value });
    document.getElementById("pagination").style.display = "none";
  }

  getShoppinglists(page) {
    // Fetches shoppinglists from the API
    instance
      .get(`/shoppinglists?limit=5&page=${page}`)
      .then(response => {
        this.setState({
          shoppinglists: response.data.shoppinglists,
          response: response.data,
          page: response.data.current
        });
      })
      .catch(err => {});
  }

  nextPage() {
    //Load the next page of shoppinglist items
    this.getShoppinglists(this.state.response.next);
  }

  prevPage() {
    //Load the previous page of shoppinglist items
    this.getShoppinglists(this.state.response.prev);
  }

  render() {
    const { shoppinglists, authenticated, term } = this.state;
    //Restrict unauthorized access
    if (!authenticated) {
      return <Redirect to="/" />;
    }

    //Notify user items are being loaded
    if (!shoppinglists) {
      return <div>Loading...</div>;
    }
    //Iterate through the shoppinglist object obtained from the API
    const shopping = shoppinglists
      .filter(this.searchingFor(term))
      .map((shoppinglist, i) => {
        return (
          <ShoppingList key={shoppinglist.id} shoppinglist={shoppinglist} />
        );
      });
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1>shoppinglists</h1>
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
          <ul className="collection">{shopping}</ul>
          <Pagination
            page={this.state.response.current}
            pages={this.state.response.pages}
            onNext={this.nextPage}
            onPrev={this.prevPage}
          />
          <div className="fixed-action-btn">
            <Link to="/shoppinglist/add" className="btn-large btn-floating red">
              <i className="fa fa-plus" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingLists;
