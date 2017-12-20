import React from "react";
import axios from "axios";

import { Redirect, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      name: "",
      token: "",
      email: "",
      password: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/auth/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        window.localStorage.setItem("token", response.data.access_token);
        this.setState({
          token: response.data.access_token,
          name: response.data.welcome,
          authenticated: true
        });
        window.localStorage.setItem("authenticated", true);
        window.localStorage.setItem("name", response.data.welcome);
        toast.success(response.data.message);
      })
      .catch(err => {
        toast.error(err.response.data.message);
      });
  };

  render() {
    if (this.state.token) {
      return <Redirect to="/shoppinglists" />;
    }
    return (
      <div className="container">
        <main>
          <div className="valign-wrapper row login-box">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              pauseOnHover
            />
            <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
              <form className="form-signin" onSubmit={e => this.onSubmit(e)}>
                <div className="card-content">
                  <span className="card-title">Login</span>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="email"
                        className="validate"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={e => this.onChange(e)}
                        value={this.state.email}
                      />
                    </div>
                    <div className="input-field col s12">
                      <input
                        type="password"
                        className="validate"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={e => this.onChange(e)}
                        value={this.state.password}
                      />
                    </div>
                  </div>
                  <div className="card-action center-align">
                    <button
                      type="submit"
                      className="btn green waves-effect waves-light"
                    >
                      Login
                    </button>
                  </div>
                  <p className="center-align">
                    <Link to="/reset-password">Forgot password?</Link>
                  </p>
                  <p className="center-align">
                    Dont have an account? Register{" "}
                    <Link to="/register">here.</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Login;
