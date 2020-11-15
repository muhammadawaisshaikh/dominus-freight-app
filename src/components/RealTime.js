import React from 'react';
import firebase from '../core/firebase/firebase';
import '../assets/css/realtime.css';
import { Link } from 'react-router-dom';

class RealTime extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: props.location.state,
            update: 'No Update',
            loading: false
        };
    } 

    componentDidMount() {
        console.log("RealTime", this.state.data);

        this.setState({
            loading: true
        });
    }

    sendUpdate = (e) => {
        this.setState({ 
            update: e.target.value 
        });

        const updateRef = firebase.database().ref('updates');
  
        const updateData = {
            update: this.state.update,
            driver: this.state.data.data.driver
        };
        
        // storing update as a new record
        updateRef.push(updateData, function(error) {
            if (error) {
                alert("Update could not be sent." + error);
            } else {
                alert("Update Sent successfully.");
            }
        });
    }

    pickupLoad = (id) => {
        firebase.database().ref('loads/' + id).update
        ({
          status: 'pickup',
        }, function(error) {
          if (error) {
            // The write failed...
          } else {
            // The write Success...
          }
        });
    
        this.props.history.push('/yourloads');
    }

    deliverLoad = (id) => {
        firebase.database().ref('loads/' + id).update
        ({
          status: 'delivered',
          load_type: 'past',
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
                <div className="time py-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <div className="card-body">

                                    {
                                        this.state.data.data.status == "Load Created" || this.state.data.data.status == "pickup" ?
                                        <div>
                                            <h2>Send Update</h2>
                                            <div className="form-group">
                                                <select className="form-control" onChange={(e) => { this.sendUpdate(e) }}>
                                                    <option value="accident">Accident</option>
                                                    <option value="traffic">Traffic</option>
                                                    <option value="rest-stop">Rest Stop</option>
                                                    <option value="help">Help</option>
                                                </select>

                                                <textarea className="form-control" rows="5" placeholder="Your Notes" disabled>the notes entered for the load</textarea>
                                            </div>
                                        </div>
                                        :
                                        <div className="text-center">
                                            <h3 className="text-success pb-2"><i class="fas fa-check-circle"></i></h3>
                                            <p>Delivered Successfully</p>
                                        </div>
                                    }

                                    {
                                        this.state.data.data.status == "Load Created" ?
                                            <a className="btn btn-primary w-100 mt-4 font-weight-bold" onClick={() => { this.pickupLoad(this.state.data.data.id) }}>Pickup</a>
                                        :
                                        null
                                    }

                                    {
                                        this.state.data.data.status == "pickup" ?
                                            <a className="btn btn-success w-100 mt-4 font-weight-bold" onClick={() => { this.deliverLoad(this.state.data.data.id) }}>Delivered</a>
                                        :
                                        null
                                    }

                                    {
                                        this.state.data.data.status == "delivered" ?
                                            <a className="btn btn-warning w-100 mt-4 font-weight-bold">Give Rating</a>
                                        :
                                        null
                                    }

                                    <Link to="/yourloads" className="d-block text-center pt-3"><i class="fas fa-chevron-left"></i> Back to your Loads</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default RealTime;