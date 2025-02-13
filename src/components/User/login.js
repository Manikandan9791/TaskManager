import React, { Component } from 'react'
import { history } from '../../helpers/history';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LoginFlag: true,
            email: "",
            password: "",
            passwordFlag: false,
            EmailFlag: false
        };
    }

    isValidEmail = (email) => {
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }



    HandleChange = (e) => {
        this.setState({passwordFlag:false})
        this.setState({EmailFlag:false})
        let value = e.target.value;
        let name = e.target.name;
        this.setState({ [name]: value })
    }

    SubmitHandler = (e) => {
        debugger
        e.preventDefault()
        let IsValid = true;
        if (this.state.password.length < 6) {
            this.setState({passwordFlag:true})
            IsValid = false;
            // this.state.passwordFlag = true;
            // alert('1234');
        }
        if (this.isValidEmail(this.state.email) == false) {
            IsValid = false;
            this.setState({EmailFlag:true})
            // this.state.EmailFlag = true;
            // alert('5678')
        }
        else if(IsValid == true){
            let AuthObj = {Usermail:this.state.email,password : this.state.password}
            localStorage.setItem('login_credentials',JSON.stringify(AuthObj));
            history.push('/TaskPage')
        }
    }

    render() {
        return (
            <>
                <section class="Logincontainer forms blue">
                    <div class="form login">
                        <div class="form-content">
                            <header>Login</header>
                            <form onSubmit={this.SubmitHandler}>
                                <div class="field input-field">
                                    <input type="email" placeholder="Email" class="input" name='email' value={this.state.email} onChange={(e) => { this.HandleChange(e) }} />
                                </div>
                                {this.state.EmailFlag && <p className='red'>Please Enter Correct E-Mail Address</p>}
                                <div class="field input-field">
                                    <input type="password" maxlength="10" placeholder="Password" class="password" name='password' value={this.state.password} onChange={(e) => { this.HandleChange(e) }} />
                                    <i class='bx bx-hide eye-icon'></i>
                                </div>
                                {this.state.passwordFlag && <p className='red'>PassWord Should be More Then 6 Digits</p>}
                                <div class="form-link">
                                    <button type="submit"  class="btn btn-primary btn-lg btn-block">Login</button>
                                </div>
                                <div class="form-link">
                                    <a href="#" class="forgot-pass">Forgot password?</a>
                                </div>
                            </form>
                            <div class="form-link">
                                <span>Don't have an account? <a href="#" class="link signup-link">Signup</a></span>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}
