import React from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      reset: false
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
      .post("http://localhost:5000/api/v1/auth/reset-password", {
        email: this.state.email
      })
      .then(response => {
        this.setState({ reset: true });
        toast.success(response.data.message);
      })
      .catch(err => {
        toast.error(err.response.data.message);
      });
  };

  render() {
    if (this.state.reset) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <main>
          <div className="valign-wrapper row login-box">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnHover
            />
            <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
              <form className="form-signin" onSubmit={e => this.onSubmit(e)}>
                <div className="card-content">
                  <span className="card-title">Reset Password</span>
                  <p>New password will be sent to your email address.</p>
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
                  </div>
                  <div className="card-action center-align">
                    <button
                      type="submit"
                      className="btn green waves-effect waves-light"
                    >
                      Reset
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

export default ResetPassword;
