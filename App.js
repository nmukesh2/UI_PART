import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Navbar, Form, FormControl } from "react-bootstrap";
import { Button, Checkbox } from "semantic-ui-react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { display: [], host: [], pass: "", passwords: [] };
  }

  handleCheckBox = host => {
    //let hosts = this.state.host;
    //hosts.push(host);
    this.setState({ host });
    console.log(host);
  };

  handleOnBlur = index => {
    console.log("On Blur");
    let password = {
      key: index,
      value: this.state.pass,
      host: this.state.host
    };

    for (var i = 0; i < this.state.passwords.length; i++) {
      if (this.state.passwords[i].key === index) {
        //TODO: Delete the entry

        const passwords = this.state.passwords.filter(
          password => password.key === index
        );

        console.log(
          "Matched" +
            this.state.passwords[i].key +
            "," +
            this.state.passwords[i].value
        );
        console.log(passwords);
        this.state.passwords = passwords;

        console.log(this.state.passwords);
        // this.setState({ passwords: passwords });
      }

      console.log(i);
    }

    this.setState({
      passwords: [...this.state.passwords, password]
    });

    // console.log(this.state.passwords);
  };

  handleSend = (event, index) => {
    event.preventDefault();
    // let passes = this.input.value;
    //passes.push(this.input.value);
    //pass: this.props.handleSend(this.textInput.value);
    // let newPass = { pass: e.target.value };

    /*  this.setState({
       pass: [...this.state.pass, newPass]
     });*/

    this.setState({ pass: event.target.value });

    //console.log(newPass);
  };

  /* handle = newPass =>{

    this.setState({
       pass: [...this.state.pass, newPass]
     });
  }*/

  async componentDidMount() {
    const url = "http://www.mocky.io/v2/5e1ff7713000005900d1eae6";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ display: data });
    console.log(data);
  }

  handleSubmit = e => {
    e.preventDefault();

    console.log("");

    const usr = {
      host: this.state.host,
      pass: this.state.pass
    };

    axios
      .post("http://jsonplaceholder.typicode.com/posts/1001", {
        host: this.state.host,
        pass: this.state.pass
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };

  render() {
    return (
      <div className="bg">
        <Navbar bg="light" expand="lg">
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              l
              className="mr-sm-2"
            />
            <Button variant="outlin    e-success">Search</Button>
          </Form>
        </Navbar>
        <h1 style={{ backgroundColor: "#a64dff", fontSize: 40 }}>
          ISE - OS PATCH DASHBOARD
        </h1>
        <h1 style={{ backgroundColor: "#a64dff", fontSize: 40 }}>OR-SDEDS</h1>

        <form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{ backgroundColor: "#a64dff", fontSize: 15 }}>
                  Host Name
                </th>
                <th style={{ backgroundColor: "#a64dff", fontSize: 15 }}>
                  Host Status
                </th>
                <th style={{ backgroundColor: "#a64dff", fontSize: 15 }}>
                  OS - Version
                </th>
                <th style={{ backgroundColor: "#a64dff", fontSize: 15 }}>
                  Patching Passwords
                </th>
                <th style={{ backgroundColor: "#a64dff", fontSize: 15 }}>
                  Patching Status
                </th>
              </tr>
            </thead>

            <tbody>
              {this.state.display.map((disp, index) => {
                return (
                  <tr>
                    {disp.value.includes("092019") ? (
                      <td style={{ color: "green" }}>{disp.host}</td>
                    ) : (
                      <td style={{ color: "red" }}>{disp.host}</td>
                    )}
                    <td>Server is UP</td>

                    {disp.value.includes("092019") ? (
                      <td style={{ color: "green" }}>{disp.value}</td>
                    ) : (
                      <td style={{ color: "red" }}>{disp.value}</td>
                    )}
                    {disp.value.includes("092019") ? (
                      <td style={{ color: "green" }}>No Required</td>
                    ) : (
                      <td>
                        <input
                          type="text"
                          placeholder="**********"
                          name="password"
                          onChange={event => this.handleSend(event, index)}
                          onBlur={() => this.handleOnBlur(index)}
                          //ref={input => (this.textInput = input)}
                        />
                      </td>
                    )}

                    {disp.value.includes("092019") ? (
                      <td>Patched</td>
                    ) : (
                      <td>
                        <Checkbox
                          onClick={() => this.handleCheckBox(disp.host)}
                        />
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <div>
            {" "}
            <Button onClick={this.handleSubmit}>Send</Button>
          </div>
        </form>
        
      </div>
      
    );
  }
}

export default App;
