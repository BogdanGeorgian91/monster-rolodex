import React, { Component } from "react";

import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

import "./App.css";

import * as configcat from "configcat-js";

class App extends Component {
  constructor(props) {
    super(props);

    this.client = configcat.createClientWithAutoPoll(
      "SWLaCHXSUUeOpas6rc_ztQ/NeC-Udsl70qVjozi79M17Q",
      {
        pollIntervalSeconds: 2,
        logger: configcat.createConsoleLogger(3),
      }
    );

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json().then())
      .then((users) => {
        // console.log(users);
        return this.setState({ monsters: users });
      });
    // console.log(this.client);
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) => {
      // console.log(monster);
      return monster.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return (
      <div className="App">
        <h1> Monsters Rolodex </h1>
        <h2>
          Hello! This is a dummy app from the past that I've used it now to test
          ConfigCat's Very Basic Features!
        </h2>
        <h2>
          You can ignore the search functionality. It just returns based on the name.
        </h2>
        <h2>
          All of the characters will have the FIRST Feature Flag enabled, but
          only one of them will have the SECOND.
        </h2>
        <h2>
          Hmmm, this sounds like a job for the Scooby Gang. Discover him and win
          a Scooby Snacks!{" "}
        </h2>
        <SearchBox
          placeholder="search monster"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} client={this.client} />
      </div>
    );
  }
}

export default App;
