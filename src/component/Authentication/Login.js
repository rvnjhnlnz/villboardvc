import React, { Component } from 'react';
import './Login.css'
import axios from 'axios'
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import Logo from '../../images/background.png'
import { decodeToken, useJwt } from "react-jwt";


export default class Login extends Component {
    state = {
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        message: "",
        loggedIn: false,
    };
    validate = () => {
        let emailError = "";
        let isValid = true;
        let passwordError = "";
        /*if (!this.state.email.includes("@")) {
          emailError = "invalid email";
        }
    
        if (emailError) {
          this.setState({ emailError });
          return false;
        }*/
        if (!this.state.email) {
            emailError = "Please enter your email Address"
            isValid = false;
            console.log('1')
        }
        else if (typeof this.state.email !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.email)) {
                emailError = "Please enter valid email address."
                isValid = false;
                console.log('2')
            }
        }
        if (!this.state.password) {
            passwordError = "Please enter your password"
            isValid = false;
            console.log('4')
        }

        if (emailError || passwordError) {
            this.setState({ emailError, passwordError });
            return isValid;
        }
        this.setState({ emailError, passwordError });
        passwordError = "";
        return isValid;
    };
    handleSubmit = e => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        const isValid = this.validate();
        if (isValid) {
            console.log('3')
            axios.post('authenticate', data)
                .then(res => {
                    console.log(res)
                    localStorage.setItem('token', res.data.token);
                    this.setState({
                        loggedIn: true
                    });
                    this.props.setUser(res.data);
                }).catch(err => {
                    //console.log(err.response.data.msg);
                    this.setState({
                        message: err.response.data.msg
                    })
                })
        }
    }

    render() {
        if (this.state.loggedIn) {
            const decodedToken = decodeToken(localStorage.getItem('token'))
            if(decodedToken.role == 'admin'){
                console.log("ADMIN ");
                return <Redirect to={'/'}/>
            }
            else if(decodedToken.role == 'homeowners'){
                console.log("Homeowners");
                return <Redirect to={'/'} />;
            }
            else if(decodedToken.role == 'security'){
                console.log("security");
                return <Redirect to={'/'} />;
            }
        }

        let error = '';
        if (this.state.message) {
            error = (
                <div className="" style={{ fontSize: 12, color: "red" }}>
                    {this.state.message}
                </div>
            )
        }

        return (
            <div>
                <div className="l_wrapper">
                    <div class="l_container">
                        {error}
                        <header className = "l_logo"><img src = {Logo}/></header>
                        <form onSubmit={this.handleSubmit}>
                            <div className="login_input-field">
                                <input type="text"  className="form-control"
                                    onChange={e => this.state.email = e.target.value} />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.emailError}
                                </div>
                                <label className="l_label">Email</label>
                            </div>
                            <div className="login_input-field">
                                <input type="password"  className="form-control"
                                    onChange={e => this.state.password = e.target.value} />
                                <div style={{ fontSize: 12, color: "red" }}>
                                    {this.state.passwordError}
                                </div>
                                <label className="l_label">Password</label>
                            </div>
                            <div className="login_input-field">
                                <input type="submit" value='LOGIN' className="login_submitBtn" />
                            </div>
                        </form>
                        <div className="signup">
                            Not a member? <a href="/Register">Signup now</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}