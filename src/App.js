import React, { Component } from "react";
import "./App.css";

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
  render() {
    return (
      <div className="App">
        <h1 style={{height: "10%"}}>My Pokedex</h1>
        <div className="Content" style={{height: "80%"}}>

        </div>
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
              fontSize: 90
            }}
          >
            +
          </div>
        </div>
      </div>
    );
  }
}

export default App;
