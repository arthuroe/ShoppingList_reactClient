import React from "react";
import { Route } from "react-router-dom";
import ShoppingLists from "./shoppinglists";
import ShoppingListItems from "./shoppinglistItems";
import AddShoppingList from "./addShoppinglist";
import EditShoppingList from "./editShoppinglist";
import AddShoppingListItem from "./addShoppinglistItem";
import EditShoppingListItem from "./editShoppinglistItem";

const Main = () => (
  <main>
    <Route exact path="/shoppinglists" component={ShoppingLists} />
    <Route exact path="/shoppinglists/:id" component={ShoppingListItems} />
    <Route exact path="/shoppinglists/edit/:id" component={EditShoppingList} />
    <Route exact path="/shoppinglist/add" component={AddShoppingList} />
    <Route
      exact
      path="/shoppinglist/items/add/:id"
      component={AddShoppingListItem}
    />
    <Route
      exact
      path="/shoppinglists/:listid/items/edit/:id"
      component={EditShoppingListItem}
    />
  </main>
);

export default Main;
