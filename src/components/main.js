import React from "react";
import { Route, Switch } from "react-router-dom";
import ShoppingLists from "./shoppinglists";
import ShoppingListItems from "./shoppinglistItems";
import AddShoppingList from "./addShoppinglist";
import EditShoppingList from "./editShoppinglist";
import AddShoppingListItem from "./addShoppinglistItem";
import EditShoppingListItem from "./editShoppinglistItem";
import Login from "./login.js";
import Register from "./register.js";
import Logout from "./logout.js";
import ResetPassword from "./reset-password.js";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/shoppinglists" component={ShoppingLists} />
      <Route exact path="/shoppinglists/:id" component={ShoppingListItems} />
      <Route
        exact
        path="/shoppinglists/edit/:id"
        component={EditShoppingList}
      />
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
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/reset-password" component={ResetPassword} />
      <Route path="/" component={Login} />
    </Switch>
  </main>
);

export default Main;
