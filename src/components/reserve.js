import React from "react";
import "./reserve.css";
import moment from "moment";
import Modal from "./Modal.js";
import Input from "./form/Input";
import Select from "./form/Select";


const initialState = {
  user: {
    name: "",
    Address: "",
    phone_number: "",
    ruoka: "",
    quantity: ""
  },
  nameError: "",
  AddressError: "",
  phone_numberError: "",
  ruokaError: "",
  quantityError: ""

}


export default class reserve extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.state = {
      users: [],

      user: {
        name: "",
        Address: "",
        phone_number: "",
        ruoka: "",
        quantity: ""
      },
      nameError: "",
      AddressError: "",
      phone_numberError: "",
      ruokaError: "",
      quantityError: "",
    
     
      FoodOption: ["Option 1", "Option 2 "],
      showModal: false,
      modalData: { data: "", time: "" },

      currentDate: new Date(),

     days: ["Friday", "Saturday", "Sunday"],
      times: [
        "17:00-17:30",
        "17:30-18:00",
        "18:00-18:30",
        "18:30-19:00",
        "19:00-19:30",
        "19:30-20:00",
        "20:00-20:30"
      ],
      reservedTime: {
        friday: [],
        saturday: [],
        sunday: []
      }, 
    };

    this.handleFullName = this.handleFullName.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handlePhonenumber = this.handlePhonenumber.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleConfirmReservation = this.handleConfirmReservation.bind(this);
  }

  validate = () => {
    let nameError = "";
    let AddressError = "";
    let phone_numberError = "";
    let ruokaError = "";
    let quantityError = "";

    if(!this.state.user.name){
      nameError = "Invalid name!!";
    }
    if(!this.state.user.Address){
      AddressError = "Invalid Address!!";
    }
    var phoneno =/^\d{10}$/;
    if(!this.state.user.phone_number.match(phoneno)){
      phone_numberError = "Invalid Phone number!!";
    }
    if(!this.state.user.ruoka){
      ruokaError = "Invalid food option!!";
    }
    if(this.state.user.quantity < 1 ){
      quantityError = "Invalid quantity!!";
    }

    if (nameError || AddressError || phone_numberError || ruokaError || quantityError ) {
      this.setState({ nameError, AddressError, phone_numberError, ruokaError, quantityError });
      return false;
    }
    
    return true;
  };

  handleFullName(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        user: {
          ...prevState.user,
          name: value
        }
      }),
      () => console.log(this.state.user)
    );
  }

  handleAddress(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        user: {
          ...prevState.user,
          Address: value
        }
      }),
      () => console.log(this.state.user)
    );
  }

  handlePhonenumber(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        user: {
          ...prevState.user,
          phone_number: value
        }
      }),
      () => console.log(this.state.user)
    );
  }

  handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      prevState => ({
        user: {
          ...prevState.user,
          [name]: value
        }
      }),
      () => console.log(this.state.user)
    );
  }

  closeModalHandler = () => {
    this.setState({
      showModal: false
    });
  };

  // show modal and save the day time in state
  showForm(day, time) {
    this.setState({
      showModal: true,
      modalData: {
        day,
        time
      }
    });
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = _ => {
    fetch("/users")
      .then(res => res.json())
      .then(json => { 
        this.setState({ users: json.data })})
      .catch(err => console.error(err));
  };

  // reserve time slot after modal confirmation
  handleConfirmReservation = e => {
    e.preventDefault();

    const { reservedTime, modalData } = this.state;
    const loweredCaseDay = modalData.day.toLowerCase();
    const { user } = this.state;
    const isValid = this.validate();
    if (isValid) {
    fetch(
     `/users/add?name= ${user.name}&Address=${user.Address}&phone_number=${
          user.phone_number
        }&ruoka=${user.ruoka}&quantity=${user.quantity}&Day=${
          modalData.day
        }&time=${modalData.time}`
      ) 
        .then(this.getUsers)
        .catch(err => console.error(err)); 
        
   


      if (Object.keys(reservedTime).includes(loweredCaseDay)) {
        const updatedReservedTime = [
          ...reservedTime[loweredCaseDay],
          modalData.time
        ];

        this.setState(prevState => ({
          reservedTime: {
            ...prevState.reservedTime,
            [loweredCaseDay]: updatedReservedTime
          },
          showModal: false,
          modalData: {},
        
        }));
      }
      this.setState(initialState);
    }
  };

  render() {
    const { currentDate, times, days, reservedTime, modalData, users } = this.state;

    const weeknumber = moment(currentDate).week();
    const fifthOfWeek = moment().startOf('isoWeek').add(4, 'd').format("MM-DD-YYYY");
    const endOfWeek = moment().endOf('isoWeek').format("MM-DD-YYYY");

    const timeHeader = times.map((time, i) => (
      <th key={`header-time-${i}`}>{time}</th>
    ));

    const timeList = days.map(day => {
      console.log(day)
      let row = [];

      times.forEach(time => {

        console.log(time);

        
        const reserved = reservedTime[day.toLowerCase()].includes(time);
       const dbReserved = users.find(data => {
         const {Day: reservedDay, time: reservedTime} = data;

        return  reservedDay.toLowerCase() === day.toLowerCase() && reservedTime === time
       }  );



        // return the row and background red if it is reserved
        return row.push(
          <td bgcolor={reserved || dbReserved ? "red" : "#fff"}>
            <button
              disabled={reserved || dbReserved}
              onClick={() => this.showForm(day, time)}
            >
              {reserved || dbReserved ? "Booked" : "Book"}
            </button>
          </td>
        );
      });

      return (
        <tr>
          <th>{day}</th> {row}
        </tr>
      );
    });

    return (
      <div>
       <h3> Week number = {weeknumber}<br/>
        (From {fifthOfWeek} to {endOfWeek})</h3>
        <table>
          <thead>
            <th />
            {timeHeader}
          </thead>
          <tbody>{timeList}</tbody>
        </table>
        <Modal
          className="modal"
          show={this.state.showModal}
          close={this.closeModalHandler}
        >
          <p>{`Would you like to reserve ${modalData.time} on ${
            modalData.day
          }??`}</p>
          <form>
            <Input
              inputType={"text"}
              title={"Full Name"}
              name={"name"}
              value={this.state.user.name}
              placeholder={"Enter your name"}
              handleChange={this.handleInput}
              required
            />{" "}
            {/* Name of the user */}
            <div style={{ color: "red", fontSize: 12 }}>
              {this.state.nameError}
            </div>
            <Input
              inputType={"text"}
              title={"Address"}
              name={"Address"}
              value={this.state.user.Address}
              placeholder={"Enter your address"}
              handleChange={this.handleInput}
            />{" "}
            {/* Address of the user */}
            <div style={{ color: "red", fontSize: 12 }}>
              {this.state.AddressError}
            </div>
            <Input
              inputType={"tel"}
              title={"Phone number (0XXXXXXXXX)"}
              name={"phone_number"}
              value={this.state.user.phone_number}
              placeholder={"Enter your phone number"}
              handleChange={this.handleInput}
            />{" "}
            {/* Phone number */}
            <div style={{ color: "red", fontSize: 12 }}>
              {this.state.phone_numberError}
            </div>
            <Select
              title={"Option"}
              name={"ruoka"}
              options={this.state.FoodOption}
              value={this.state.user.ruoka}
              placeholder={"Select Option"}
              handleChange={this.handleInput}
            />{" "}
            <div style={{ color: "red", fontSize: 12 }}>
              {this.state.ruokaError}
            </div>
            <Input
              inputType={"number"}
              title={"Quantity"}
              name={"quantity"}
              value={this.state.user.quantity}
              placeholder={"How about quantity??"}
              handleChange={this.handleInput}
              required
            />{" "}
            {/* quantity of food */}
            <div style={{ color: "red", fontSize: 12 }}>
              {this.state.quantityError}
            </div>
            <button
              className="btn-reserve"
              onClick={this.handleConfirmReservation}
            >
              Reserve
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}
