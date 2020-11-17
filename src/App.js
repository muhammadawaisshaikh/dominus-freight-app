import React, {useState} from 'react';
import './App.css';

import Header from './layout/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import LoadConfirmation from './components/LoadConfirmation';
import RealTime from './components/RealTime';
import YourLoads from './components/YourLoads'; 
import LoadDetails from './components/LoadDetails';
import Shipper from './components/Shipper';
import AllPayment from './components/AllPayment';
import Setting from './components/Setting';

import { 
  HashRouter as Router, 
  Redirect,
  Route,
  Switch   
} from 'react-router-dom';

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [customer, setCustomer] = useState(JSON.parse(localStorage.getItem('customer')));

  return (
    <Router>
      <div className="App">
        <Header user={user} customer={customer} />
          
          {/* all components */} 
          <div>
            <Switch>
              <Route exact path="/dominus-freight-app">
                  <Redirect to="/login" />
              </Route>

              <Route exact path="/">
                  <Redirect to="/login" />
              </Route>

              <Route path='/login' component={Login}></Route>
              {/* <Route path='/signup' component={Signup}></Route> */}
              <Route path='/loadconfirmation' component={LoadConfirmation}></Route>
              <Route path='/realtime' component={RealTime}></Route>
              <Route path='/yourloads' component={YourLoads}></Route> 
              <Route path='/loaddetails' component={LoadDetails}></Route> 
              <Route path='/shipper' component={Shipper}></Route>
              <Route path='/allpayment' component={AllPayment}></Route>
              <Route path='/setting' component={Setting}></Route>
            </Switch>
          </div>

      </div>
    </Router>
  );
}

export default App;
