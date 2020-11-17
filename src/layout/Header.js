import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import '../assets/css/header.css'
import Login from '../components/Login';
// import logo from '../assets/img/logo_465x320.png'

function Header(props) {

    const [menuToggle, setMenuToggle] = useState(false);
    const [headerTitle, setHeaderTitle] = useState('');
    const [userData, setUserData] = useState(props);

    const logout = () => {
        localStorage.clear('user');
        window.location.href = '/login';
    }

    return(
        <div>
            <div className="header">

                <div className={"mobile-menu-toggle " + (menuToggle ? 'change' : '')} onClick={() => setMenuToggle(!menuToggle)}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>

                <div onClick={() => logout()} className={!userData.user ? 'display-none' : 'logout-b'}>
                    <i className="fas fa-power-off"></i>
                </div>

                <h4 className="header-title">{headerTitle}</h4>

                <div className="desktop-menu container">
                    <div className="row">

                        <div className="col-sm-4 col-md-4 col-lg-4">
                            <div className='logo'>
                                {/* <img src={logo} /> */}
                                <a href="#">Dominus Freight</a>
                            </div>
                        </div>

                        <div className="col-sm-8 col-md-8 col-lg-8">
                            <div className="nav">
                                 <ul>
                                    <li><Link to="/login">Login</Link></li>
                                    {/* <li><Link to="/signup">Sign Up</Link></li> */}
                                    <li><Link to="/loadconfirmation">Load Confirmation</Link></li>
                                    <li><Link to="/realtime">Real Time Tracking</Link></li> 
                                    <li><Link to="/yourloads">Your Loads</Link></li>
                                    <li><Link to="/loaddetails">Load Details</Link></li> 
                                    <li><Link to="/shipper">Shipper</Link></li> 
                                    <li><Link to="/allpayment">All Payment</Link></li>
                                    <li><Link to="/setting">Setting</Link></li>
                                 </ul>
                            </div>
                        </div>
                       
                    </div>
                </div>

                {
                     userData.user && userData.customer ?
                     <div className={"mobile-menu sidenav " + (menuToggle ? 'open' : 'close')}>
                        <Link to="/login" 
                            className={userData.user ? 'display-none' : ''}
                            onClick={() => { setMenuToggle(!menuToggle); setHeaderTitle('Login')} }>
                            Login
                        </Link>
    
                        <Link to="/yourloads"
                            onClick={() => { setMenuToggle(!menuToggle); setHeaderTitle('Your Loads')}}>
                            Your Loads
                        </Link>
    
                        <Link to="/allpayment" 
                            className={userData.customer.account_type == 'shipper' ? '' : 'display-none'}
                            onClick={() => { setMenuToggle(!menuToggle); setHeaderTitle('All Payment')}}> 
                            All Payment 
                        </Link>
    
                        <Link to="/setting"
                            onClick={() => { setMenuToggle(!menuToggle); setHeaderTitle('Setting')}}> 
                            Setting 
                        </Link>
                    </div>
                    :
                    <div className={"mobile-menu sidenav " + (menuToggle ? 'open' : 'close')}>
                        <Link to="/login"
                            onClick={() => { setMenuToggle(!menuToggle); setHeaderTitle('Login')} }>
                            Login
                        </Link>
                    </div>
                }

            </div>
        </div>
    );
}

export default Header;