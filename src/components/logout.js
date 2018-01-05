import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.onSubmit();
  }

  onSubmit = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = window.localStorage.getItem("token");
    axios.post("http://localhost:5000/api/v1/auth/logout").then(response => {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("name");
      window.localStorage.setItem("authenticated", false);
      this.setState({ logout: true, authenticated: false });
      toast.success(response.data.message);
    });
  };

  render() {
    const { logout } = this.state;
    if (logout) {
      return <Redirect to="/" />;
    }
    return <Redirect to="/" />;
  }
}

export default Logout;
