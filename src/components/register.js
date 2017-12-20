import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registered: false,
      username: "",
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
      .post("http://localhost:5000/api/v1/auth/register", {
        name: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        // console.log(`then${response}`);
        this.setState({ registered: true });
        // console.log(this.state.registered);
        this.props.history.push("/");
        toast.success(response.data.message);
      })
      .catch(err => {
        // console.log(`err:${err}`);
        toast.error(err.response.data.message);
      });
  };

  render() {
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
                  <span className="card-title">Register Here</span>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        type="text"
                        className="validate"
                        id="username"
                        name="username"
                        placeholder="Name"
                        onChange={e => this.onChange(e)}
                        value={this.state.username}
                      />
                    </div>
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
                      id="submit"
                      name="submit"
                      className="btn green waves-effect waves-light"
                    >
                      Submit
                    </button>
                  </div>
                  <p className="center-align">
                    <Link to="/">Login</Link>
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

export default Register;
