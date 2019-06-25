import React, { Component } from "react";
import "./reservationlist.css";
import axios from "axios";

class Reservationlist extends Component {
  constructor(props) {
    super(props);

    this.deleteUser.bind(this);
    this.state = {
    users: []
  };
}

  componentDidMount() {
    this.getUsers();
  }

  getUsers = _ => {
    fetch("/users")
      .then(response => response.json())
      .then(response => this.setState({ users: response.data }))
      .catch(err => console.error(err));
  };


  deleteUser = id => {
    axios
      .delete(`/delete/${id}`)
      .then(() => {
        this.getUsers();
      })
      .then(res => {
        const allUser = res.data;
        this.setState({ allUser });
      })
      .catch(err => {
        console.error(err);
      });
  };



  render() {
    const { users } = this.state;
    return <div className="App">
    <table>
      <thead>
    <tr>
       <th>Full name</th>
          <th>Address</th>
          <th>Phone number</th>
          <th>Food option</th>
          <th>Quantity</th>
          <th>Day</th>
          <th>Time</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
          {users.map(user => 
        <tr key={user.id}>
          <td>{user.name} </td>
          <td>{user.Address}</td>
          <td> {user.phone_number}</td>
          <td>{user.ruoka}</td>
          <td>{user.quantity}</td>
          <td>{user.Day}</td>
          <td>{user.time}</td>

          <button
            className="del-button"
            onClick={() => this.deleteUser(user.id)}
          >
            Delete
          </button>
        </tr>
        )}
        </tbody>
      
    </table>
    
    </div>;
  }
}

export default Reservationlist;
