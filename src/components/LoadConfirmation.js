import React from 'react';
import firebase from '../core/firebase/firebase';
import '../assets/css/loadconfirmation.css';
import { Link } from 'react-router-dom';

import DataHolding from '../core/services/data-holding-service';

class LoadConfirmation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: '',
            loading: false,
            carrier: {}
        };
    } 

    componentDidMount() {
        this.getDetails();    
    }

    async getDetails() {
        var details = DataHolding.setData();
        await console.log(details);
        this.setState({ data: details });

        if (!this.state.data.id) {
            this.props.history.push('/yourloads');
        }
    }

    confirmLoad = (id) => {
        firebase.database().ref('loads/' + id).update
        ({
          confirmation: true,
        }, function(error) {
          if (error) {
            // The write failed...
          } else {
            // The write Success...
          }
        });
    
        this.props.history.push('/yourloads');
    }

    render() {
        return(
            // driver
            <section>
                <div className="load py-5">
                    <div className="container">
                        {
                            this.state.data != '' ?
                            <div className="row justify-content-center">
                                <div className="col-md-4">
                                    <Link to="/yourloads" className="d-block text-left pb-3 text-dark"><i class="fas fa-chevron-left"></i> Back to your Loads</Link>
                                    <ul class="list-group">
                                        <li class="list-group-item">
                                            <h3>Carrier Company</h3>
                                            <p>{JSON.parse(this.state.data.carrier).company_name}</p>
                                        </li>
                                        <li class="list-group-item">
                                            <h3>Pickup Location & Time</h3>
                                            <p>{this.state.data.pickup_location}</p>
                                            <small className="text-muted">{new Date(this.state.data.pickup_date_time).toLocaleString()}</small>
                                        </li>
                                        <li class="list-group-item">
                                            <h3>Dropoff Location & Time</h3>
                                            <p>{this.state.data.delivery_location}</p>
                                            <small className="text-muted">{new Date(this.state.data.delivery_date_time).toLocaleString()}</small>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-12 col-md-6">
                                    <div class="form-check pt-3">
                                        <input type="checkbox" class="form-check-input" />
                                        <label class="form-check-label"><small>Enable GPS</small></label>
                                    </div>

                                    <a className="btn btn-primary w-100 mt-5 font-weight-bold" onClick={() => { this.confirmLoad(this.state.data.id) }}>Confirm</a>
                                </div>
                            </div>
                            :
                            <p>No Data Found</p>
                        }
                    </div>
                </div>
            </section>
        );
    }
}
export default LoadConfirmation;