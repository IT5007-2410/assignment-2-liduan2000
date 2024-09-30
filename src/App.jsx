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
    this.setSelector = this.setSelector.bind(this);
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
      this.setState((prevState) => {
        if (prevState.travellers.length >= 10) {
          alert("All seats are booked! Cannot add more travellers.");
          return null;
        }
        const passengerExists = prevState.travellers.some(
          (traveller) => traveller.name.toLowerCase() === passenger.name.toLowerCase()
        );
        if (passengerExists) {
          alert("This traveller has already been booked!");
          return null;
        }
        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(passenger.phone)) {
          alert("Phone number must be numeric!");
          return null;
        }
        alert("Traveller added successfully!");
        return {
          travellers: [...prevState.travellers, passenger],
        };
      });
    }

  deleteTraveller(travellerId) {
      /*Q5. Write code to delete a passenger from the traveller state variable.*/
    this.setState((prevState) => {
      const travellerExists = prevState.travellers.some(
        (traveller) => traveller.id === travellerId
      );

      if (!travellerExists) {
        alert("ID does not exist!");
        return null;
      }
      alert("Traveller deleted successfully!");
      return {
        travellers: prevState.travellers.filter(
          (traveller) => traveller.id !== travellerId
        ),
      };
    });
  }

  render() {
    return (
      <div>
        <h1 style={styles.title}>Ticket To Ride</h1>
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
          {/*Q3. Code to call component that Displays Travellers.*/}
          
          {/*Q4. Code to call the component that adds a traveller.*/}
          {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
          {this.state.selector === 1 && <Homepage travellers={this.state.travellers} />}
          {this.state.selector === 2 && <Display travellers={this.state.travellers} />}
          {this.state.selector === 3 && <Add bookTraveller={this.bookTraveller} />}
          {this.state.selector === 4 && <Delete deleteTraveller={this.deleteTraveller} />}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
  },
  title: {
    marginBottom: '10px',
    color: '#333',
    fontSize: '2em',
    textAlign: 'center',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  navButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  seatContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 40px)', // 5 seats per row, adjust as needed
    gap: '10px',
  },
  seat: {
    width: '40px',
    height: '40px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Light shadow for visual depth
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f9fa',  // Light grey background for table
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Light shadow for depth
  },
  th: {
    backgroundColor: '#007bff',  // Bootstrap blue for table header
    color: 'white',
    padding: '10px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  td: {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',  // Subtle border between rows
  },
  tr: {
    transition: 'background-color 0.2s ease',  // Smooth hover effect
  },
  trHover: {
    backgroundColor: '#f1f1f1',  // Light grey background on hover
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f8f9fa', // Light grey background
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Light shadow for depth
    width: '300px',
    margin: '20px auto',
  },
  label: {
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#333', // Darker font color
    display: 'block',
    width: '100%',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  inputFocus: {
    borderColor: '#007bff', // Change border color on focus
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontSize: '16px',
    width: '100%',
    marginTop: '20px',
  },
};

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
