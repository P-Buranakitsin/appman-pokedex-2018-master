import React, { Component } from "react";
import "./App.css";
import Modal from "./components/Modal";

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b",
  bottomBarBackground: "#ec5656",
  colorAddButton: "#dc7777",
  bottomBarTextColor: "#ffffff",
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div className="App">
        <h1 style={{ height: "10%" }}>My Pokedex</h1>
        <div className="Content" style={{ height: "80%" }}></div>
        <div
          style={{
            backgroundColor: COLORS.bottomBarBackground,
            width: "100%",
            height: "10%",
            position: "relative",
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.colorAddButton,
              borderRadius: "50%",
              padding: 40,
              position: "absolute",
              bottom: 0,
              left: "50%",
              cursor: "pointer",
              transform: "translate(-50%)",
              width: 50,
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: COLORS.bottomBarTextColor,
              fontSize: 90,
            }}
            onClick={this.showModal}
          >
            +
          </div>
        </div>
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <div>Modal</div>
        </Modal>
      </div>
    );
  }
}

export default App;
