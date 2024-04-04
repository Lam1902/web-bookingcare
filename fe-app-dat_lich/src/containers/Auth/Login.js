import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

// import * as actions from "../../store/actions";
import * as actions from "../../store/actions"
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginAPI } from '../../services/userService';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email : '',
          password: '',
          showPass: false,
          errMessage: '',
        }
    }

 
    handleOnChangeemail = (event) => {
      this.setState({
        email: event.target.value
      })
    }

    handleOnChangepassword = (event) => {
      this.setState ({
        password : event.target.value
      })
    }

    handleLogin = async () => {
      this.setState ({
        errMessage: '',
      })
      try {
      let res = await handleLoginAPI(this.state.email, this.state.password)
      
      if(res && res.errCode !==0 ) {
        this.setState ({
          errMessage: res.message
        })
      }
      if(res && res.errCode ===0 ) {
       // xử lí login thành công
       this.props.userLoginSuccess(res.userdata)
      }
      console.log(this.state.errMessage)
      }catch (e) {
        if(e.response) {
          if(e.response.data){
              this.setState ({
          errMessage: e.response.data.message,
        })
          }
        }
      
      }
    }

    handleClickEye = () => {
      this.setState({
        showPass: !this.state.showPass
      })
    }

    render() {
        
        return (
            <div className='login-background'>
                <div className='login'>
                <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-xl-10">
        <div class="card rounded-3 text-black">
          <div class="row g-0">
            <div class="col-lg-6 card-body-tong">
              <div class="card-body p-md-5 mx-md-4">
                <form>

                    <div>
                        <img></img>
                    </div>
                  <h2>Please login </h2>

                  <div class="form-outline mb-4">
                  <label class="form-label" for="form2Example11">Email</label>
                    <input type="email" id="email" class="form-control"
                      placeholder="Your email" name='email'
                      value={this.state.email}  
                      onChange={(event) => this.handleOnChangeemail(event)}/>
                  
                  </div>

                  <div class="form-outline mb-4">
                  <label class="form-label" for="form2Example22">Password</label>

                  <div className='div-password'>
                  <input type={this.state.showPass ? 'text' : 'password'} 
                  id="password" class="form-control" name='password'
                    placeholder='Your password'  
                    onChange={(event) => this.handleOnChangepassword(event)}/>
                    <span onClick={()=> {this.handleClickEye()}}>
                        <i className={this.state.showPass ? 'fas fa-eye i' : 'fas fa-eye-slash i'}></i>
                    </span>
                  </div>
                   
              
                  </div>

                  <div class="text-center pt-1 mb-5 pb-1">
                    <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" 
                    type="button"  onClick={()=> { this.handleLogin()}} >Login</button>
                    <a class="text-muted" href="#!">Forgot password?</a>
                  </div>

                  <div className="col-lg-6" style={{ color: 'red' }}>
                   <p>{this.state.errMessage}</p>
                  </div>


                  <div className='login-with'>
                    <p className='text-loginwith'>login with</p>
                    <span className='icon-facebook'>
                           <i className="fab fa-facebook">    Facebook</i>
                          
                    </span>
                    <span className='icon-google'>
                           <i className="fab fa-google">    Google</i>
                    </span>
                  </div>

                  <div class="d-flex align-items-center justify-content-center pb-4">
                    <p class="mb-0 me-2">Don't have an account?</p>
                    <button type="button" class="btn btn-outline-danger">Create new</button>
                  </div>
                 

                </form>

              </div>
            </div>
            <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
              <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 class="mb-4">We are more than just a company</h4>
                <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
  
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
