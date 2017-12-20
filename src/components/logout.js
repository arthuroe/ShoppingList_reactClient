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
    // console.log("yeah");
    axios.defaults.headers.common[
      "Authorization"
    ] = window.localStorage.getItem("token");
    axios.post("http://localhost:5000/api/v1/auth/logout").then(response => {
      // console.log(this.state.token);
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("name");
      this.setState({ logout: true });
      toast.success(response.data.message);
    });
  };

  render() {
    if (this.state.logout) {
      return <Redirect to="/" />;
    }
    return <div>Processing...</div>;
  }
}

export default Logout;
