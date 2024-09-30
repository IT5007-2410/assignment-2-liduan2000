/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: Date.now(), name: 'Jack', phone: 88885555, email: "jack@outlook.com",
    bookingTime: new Date(),
  },
  {
    id: Date.now() + 1, name: 'Rose', phone: 88884444, email: "rose@outlook.com",
    bookingTime: new Date(),
  },
];


function TravellerRow(props) {
  const { traveller } = props;
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  return (
    <tr style={styles.tr}>
      {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td style={styles.td}>{traveller.id}</td>
      <td style={styles.td}>{traveller.name}</td>
      <td style={styles.td}>{traveller.phone}</td>
      <td style={styles.td}>{traveller.email}</td>
      <td style={styles.td}>{new Date(traveller.bookingTime).toLocaleString()}</td>
    </tr>
  );
}

function Display(props) {
  const { travellers } = props;
    /*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  return (
    <div>
      <br></br>
      <table style={styles.table}>
        <thead>
          <tr>
            {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Phone</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Booking Time</th>
          </tr>
        </thead>
        <tbody>
          {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
          {travellers.map((traveller, index) => (
            <TravellerRow key={index} traveller={traveller} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const { name, phone, email } = this.state;

    const newTraveller = {
      id: Date.now(),
      name,
      phone,
      email,
      bookingTime: new Date(),
    };

    this.props.bookTraveller(newTraveller);

    this.setState({
      name: '',
      phone: '',
      email: '',
    });
  }

  render() {
    const { name, phone, email } = this.state;

    return (
      <form name="addTraveller" onSubmit={this.handleSubmit} style={styles.form}>
        {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <label style={styles.label}>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            placeholder="Enter name"
            required
            style={styles.input}
          />
        </label>
        <br />
        <label style={styles.label}>
          Phone:
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={this.handleChange}
            placeholder="Enter phone number"
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
            placeholder="Enter email"
            required
            style={styles.input}
          />
        </label>
        <br />
        <button type="submit" style={styles.button}>Add Traveller</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      travellerId: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const { travellerId } = this.state;

    this.props.deleteTraveller(parseInt(travellerId));

    this.setState({ travellerId: '' });
  }

  render() {
    const { travellerId } = this.state;
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit} style={styles.form}>
      {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <label style={styles.label}>
          ID to Delete:
          <input
            type="number"
            name="travellerId"
            value={travellerId}
            onChange={this.handleChange}
            placeholder="Enter ID"
            required
            style={styles.input}
          />
        </label>
        <br />
        <button type="submit" style={styles.button}>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
  constructor(props) {
    super(props);
  }

    render(){
    const totalSeats = 10;
    const bookedSeats = this.props.travellers.length;
    const freeSeats = totalSeats - bookedSeats;
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Total Free Seats: {freeSeats}</h2>
        <div style={styles.seatContainer}>
          {Array.from({ length: totalSeats }, (_, index) => (
            <div
              key={index}
              style={{
                ...styles.seat,
                backgroundColor: index < bookedSeats ? '#6c757d' : '#28a745', // Grey for booked, green for free
              }}
            />
          ))}
        </div>
      </div>
    );
    }
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value)
  {
    /*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
  }

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
  }
  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
        <div style={styles.navbar}>
          {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
          <button style={styles.navButton} onClick={() => this.setSelector(1)}>Homepage(Free Seats)</button>
          <button style={styles.navButton} onClick={() => this.setSelector(2)}>Display Travellers</button>
          <button style={styles.navButton} onClick={() => this.setSelector(3)}>Add Traveller</button>
          <button style={styles.navButton} onClick={() => this.setSelector(4)}>Delete Traveller</button>
        </div>
        <div>
          {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
          {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
          {this.state.selector === 1 && <Homepage travellers={this.state.travellers} />}
          {/*Q3. Code to call component that Displays Travellers.*/}
          {this.state.selector === 2 && <Display travellers={this.state.travellers} />}
          
          {/*Q4. Code to call the component that adds a traveller.*/}
          {this.state.selector === 3 && <Add bookTraveller={this.bookTraveller} />}
          {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
          {this.state.selector === 4 && <Delete deleteTraveller={this.deleteTraveller} />}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
