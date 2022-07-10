import React, { Component } from "react";
import "./card.styles.css";

class Card extends Component {
  constructor(props) {
    super(props);

    this.monsterName = this.props.monster.name;
    this.email = this.props.monster.email;
    this.id = this.props.monster.id;

    this.client = props.client;
    this.checkFeature = this.checkFeature.bind(this);
    this.checkProofOfConcept = this.checkProofOfConcept.bind(this);

    this.state = {
      userName: this.props.monster.name,
      userEmail: this.props.monster.email,
    };
  }

  async checkFeature() {
    const value = await this.client.getValueAsync(
      "isMyFirstFeatureEnabled",
      false
    );
    this.setState(() => ({ isFeatureEnabled: value }));
  }

  async checkProofOfConcept() {
    const userObject = {
      identifier: this.state.userName,
      email: this.state.userEmail,
    };
    const value = await this.client.getValueAsync(
      "ispocfeatureenabled",
      false,
      userObject
    );
    // console.log(value);
    this.setState({ isPOCEnabled: value });
  }

  render() {
    return (
      <div className="card-container">
        <img
          alt="monster"
          src={`https://robohash.org/${this.id}?set=set2&size=180x180`}
        />
        <h2> {this.monsterName} </h2>
        <p> {this.email} </p>
        <button onClick={this.checkFeature}>
          Check if{" "}
          <span>
            <b>FIRST</b>
          </span>{" "}
          Feature Flag is enabled
        </button>
        <p>
          <b>
            {this.state.isFeatureEnabled !== undefined
              ? this.state.isFeatureEnabled.toString()
              : " Awaiting Click"}
          </b>
        </p>

        <button onClick={this.checkProofOfConcept}>
          Check if{" "}
          <span>
            <b>SECOND</b>{" "}
          </span>{" "}
          Feature Flag is enabled
        </button>
        <p>
          <b>
            {this.state.isPOCEnabled !== undefined
              ? this.state.isPOCEnabled.toString()
              : " Awaiting Click"}
          </b>
        </p>
      </div>
    );
  }
}

export default Card;
