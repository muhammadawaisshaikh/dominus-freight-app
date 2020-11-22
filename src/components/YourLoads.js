import React from 'react';
import '../assets/css/yourloads.css';
import firebase from '../core/firebase/firebase';
import { Link } from 'react-router-dom';
import DataHolding from '../core/services/data-holding-service';

class YourLoads extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loads: [],
            itemsToUse: [],
            loading: false,
            customerData: JSON.parse(localStorage.getItem('customer')),
            typeFilter: 'all'
        };
    } 

    componentDidMount() {
        this.getLoads();
    }

    getLoads = () => {
        let account = '';
        let tempLloads = [];
        let filteredLoads = [];

        const loadRef = firebase.database().ref('loads');
    
        loadRef.on('value', (snapshot) => {
          const loads = snapshot.val();
    
          for (let id in loads) {
            tempLloads.push({ id, ...loads[id] });
          }

            //   this.setState({ loads: tempLloads });

            if (this.state.customerData.account_type == 'admin') {
                this.setState({ loads: tempLloads });
                this.setState({ itemsToUse: tempLloads });
            }
            else {
                tempLloads.map((item, i) => {
                    if (this.state.customerData.account_type == 'driver') {
                        account = JSON.parse(item.driver).company_email;
                    }
                    if (this.state.customerData.account_type == 'shipper') {
                        account = JSON.parse(item.shipper).company_email;
                    }
                    if (this.state.customerData.account_type == 'carrier') {
                        account = JSON.parse(item.carrier).company_email;
                    }
            
                    if (account == this.state.customerData.company_email) {
                        filteredLoads.push(item);
                        console.log(item);
                    }
                })
                
                this.setState({ loads: filteredLoads });
                this.setState({ itemsToUse: filteredLoads });

                this.setState({ loading: true });
            }
        });
    };

    setData = (data) => {
        if (data.load_type == 'active') {
            DataHolding.getData(data);

            if (this.state.customerData.account_type == 'driver') {
                if (data.confirmation == true) {
                    this.props.history.push('/realtime', { data });
                }
                if (data.confirmation == false) {
                    this.props.history.push('/loadconfirmation', { data });
                }
            }
            else {
                this.props.history.push('/loaddetails', { data });
            }
        }
        else {
            alert('Load Type is not active.');
        }
    }

    filterByType = (value) => {
        let filtered = [];
    
        this.setState({ typeFilter: value });
        console.log(this.state.typeFilter);
    
        if (value == '' || value == 'all') {
          this.setState({ itemsToUse: this.state.loads });
        }
        if (value == 'past') {
          filtered = this.state.loads.filter(item => item.load_type == 'past');
          this.setState({ itemsToUse: filtered });
        }
        if (value == 'active') {
          filtered = this.state.loads.filter(item => item.load_type == 'active');
          this.setState({ itemsToUse: filtered });
        }
        if (value == 'upcoming') {
            filtered = this.state.loads.filter(item => item.load_type == 'upcoming');
            this.setState({ itemsToUse: filtered });
          }
      }

    render() {
        return(
            // trucking company
            <section>
                <div className="loads py-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <div className="card-body">
                                       
                                    <div className="row">
                                        <div className="col-6">
                                            <h2>Loads Type</h2>
                                        </div>

                                        <div className="col-6">
                                            <a href="#"><span className="badge badge-pill badge-success float-right px-4 py-2">Filter</span></a>
                                        </div>
                                    </div>

                                    <div className="form-group mt-5">
                                        <select className="form-control" onChange={(e) => { this.filterByType(e.target.value) }}>
                                            <option>Select Load Status Type</option>
                                            <option value="all">All</option>
                                            <option value="active">Active</option>
                                            <option value="upcoming">Upcoming</option>
                                            <option value="past">Past</option>
                                        </select>
                                    </div>

                                    {
                                        this.state.loading && this.state.itemsToUse.length > 0 ?
                                        <ul className="list-group">
                                            {
                                                this.state.itemsToUse.map((item, key) => {
                                                    return (
                                                        <li className="list-group-item" key={key} onClick={() => this.setData(item)}>
                                                            <h6>Load ID: {item.id}</h6>
                                                            <p className="pt-3">Pickup: {item.pickup_location}</p>
                                                            <p>Delivery: {item.delivery_location}</p>
                                                        </li>
                                                    
                                                    )
                                                })
                                            }
                                        </ul>
                                        :
                                        <div>
                                            { !this.state.loading ? <p className="py-4 text-center">Loading ...</p> : null}
                                            { this.state.loading ? <p className="py-4 text-center">No Loads Found</p> : null}
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default YourLoads;