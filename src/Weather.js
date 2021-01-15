import React from "react";
import axios from "axios";

export default class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "",
      url: "",
      info: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ city: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${this.state.city}`
      )
      .then((response) => {
        this.setState({ info: response });
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            City:
            <input type="text" name="city" onChange={this.handleChange} />
          </label>
          <button type="submit">Search</button>
        </form>
        {/* <input
          name="city"
          value={this.state.city}
          onChange={this.handleInputChange}
        /> */}
        <p>{this.state.info.data}</p>
      </div>
    );
  }
}
