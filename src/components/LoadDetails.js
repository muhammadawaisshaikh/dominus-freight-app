import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/loaddetails.css';

import map from '../assets/img/map.png'

import DataHolding from '../core/services/data-holding-service';

class LoadDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: '',
            loading: false,
            userDetails: JSON.parse(localStorage.getItem('user')),
            customerDetails: JSON.parse(localStorage.getItem('customer')),
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

        // console.log("getDetails > ", this.state.data);
    }

    render() {
        return(
            // trucking company
            <section>
                <div className="detail py-5">
                    <div className="container">
                        <div className="row justify-content-center">

                            <div className="col-12 pb-3">
                                <Link to="/yourloads" className="badge badge-pill badge-dark px-3 py-2"><i class="pr-2 fas fa-chevron-left"></i>Back</Link>
                            </div>

                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">

                                        <h2>Load Details</h2>

                                        <div class="form-check pt-4">
                                            <input type="checkbox" class="form-check-input" />
                                            <label class="form-check-label"><small>Notify me on all activities</small></label>
                                        </div>

                                        <h4>Pickup Time</h4>
                                        <p>{new Date(this.state.data.pickup_date_time).toLocaleString()} </p>

                                        <h4>Estimated Delivery (Google Maps)</h4>
                                        <p>{new Date(this.state.data.delivery_date_time).toLocaleString()}</p>

                                        <h4>Live Tracking</h4>
                                        <img src={map} />

                                        {
                                            this.state.customerDetails.account_type == 'shipper' ?
                                            <div>
                                                <div class="form-check pt-4">
                                                    <input type="checkbox" class="form-check-input" />
                                                    <label class="form-check-label"><small>Agree on price</small></label>
                                                </div>

                                                <button type="submit" className="btn btn-success w-100 mt-2 font-weight-bold">Pay Now</button>

                                                <button type="submit" className="btn btn-warning w-100 mt-4 font-weight-bold">Contact For Help</button>
                                            </div>
                                            :
                                            null
                                        }

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default LoadDetails;