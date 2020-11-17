import React from 'react';
import '../assets/css/login.css';
import { Link } from 'react-router-dom';
import firebase from '../core/firebase/firebase';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
            email: '',
            password: '',
        };
    } 

    componentDidMount() {
        console.log("Login");

        this.checkUserLogin();
    }

    checkUserLogin = () => {
        let userData = JSON.parse(localStorage.getItem('user'));
        if(userData) this.props.history.push('/yourloads')
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
    }

    login = async() => {
        this.setState({ loading: true });
        let tempCustomers = [];

        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
            if (res.user.uid) {
                localStorage.setItem('user', JSON.stringify(res.user));

                const customerRef = firebase.database().ref('customers');

                customerRef.on('value', (snapshot) => {
                    const customers = snapshot.val();
                    for (let id in customers) {
                      tempCustomers.push({ id, ...customers[id] });
                    }

                    let customer = tempCustomers.filter(item => item.company_email == res.user.email);
                    localStorage.setItem('customer', JSON.stringify(customer[0]));
                    window.location.href = '/yourloads';
                    this.setState({ loading: false });
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    }


    render() {
        return(
            // driver
            <section> 
                <div className="login-form py-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <div className="card-body">
                                    <form>
                                        <div class="form-group">
                                            <label>Email address</label>
                                            <input type="email" class="form-control" placeholder="Enter email" name="email" value={this.state.email} onChange={(event) => this.handleChange(event)}/>
                                            <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                                        </div>
                                        <div class="form-group">
                                            <label>Password</label>
                                            <input type="password" name="password" className="form-control" value={this.state.password} onChange={(event) => this.handleChange(event)} placeholder="Password" />
                                        </div>
                                        
                                        <div className="row">
                                            <div className="col-6 col-md-6">
                                                <div class="form-check pb-2">
                                                    <input type="checkbox" class="form-check-input" />
                                                    <label class="form-check-label"><small>Remember Me</small></label>
                                                </div>
                                            </div>
                                            <div className="col-6 col-md-6">
                                                <a className="d-block text-right"><small>Forget Password?</small></a>
                                            </div>
                                        </div>
                                        
                                        {
                                            !this.state.loading ?
                                            <a className="btn btn-primary w-100 mt-5 font-weight-bold" onClick={ () => {this.login()} }>Login</a>
                                            :
                                            <p className="text-center mt-5"><b>Loading ...</b></p>
                                        }

                                        {/* <div className="col-12 col-md-6 text-center pt-3">
                                            <Link to="/signup">Don't have an account? Sign Up</Link>
                                        </div> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default Login;