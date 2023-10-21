import React, { Component } from "react";
import "./App.css";
import Modal from "./components/Modal";
import Card from "./components/Card";

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
  bottomBarBoxShadow: "#d9333387",
  cardBackground: "#f3f4f7",
  levelTubeBackground: "#e4e4e4",
  levelTubeValueBackground: "#f3701a",
  levelTubeBoxShadow: "#d4d4d4",
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      cards: [],
      selectedCards: [],
      allCards: [],
      show: false,
      query: "",
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.search = this.search.bind(this);
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3030/api/cards")
      .then((res) => res.json())
      .then(
        (result) => {
          const formattedCards = result.cards.map((card) => {
            const hp = Number(card.hp)
              ? Number(card.hp) > 100
                ? 100
                : Number(card.hp)
              : 0;
            const strength = card.attacks
              ? card.attacks.length * 50 > 100
                ? `100%`
                : `${card.attacks.length * 50}%`
              : `0%`;
            const weakness = card.weaknesses
              ? card.weaknesses.length * 100 > 100
                ? `100%`
                : `${card.weaknesses.length * 100}%`
              : `0%`;
            const damage = card.attacks
              ? card.attacks.reduce((prev, next) => {
                  return (
                    Number(prev) +
                    Number((next.damage || "").replace(/\D/g, ""))
                  );
                }, 0)
              : 0;
            const happiness = Math.round((hp / 10 + damage / 10 + 10) / 5);
            return {
              name: card.name,
              imageUrl: card.imageUrl,
              hp,
              strength,
              weakness,
              damage,
              happiness,
              type: card.type,
            };
          });
          this.setState({
            isLoaded: true,
            cards: formattedCards,
            allCards: formattedCards,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  search = (value) => {
    this.setState({ query: value });
    const filteredAllCards = this.state.allCards.filter((card) => {
      return !this.state.selectedCards.includes(card);
    });
    const filteredCards = filteredAllCards.filter((card) => {
      return (
        card.name.toLowerCase().includes(value.toLowerCase()) ||
        card.type.toLowerCase().includes(value.toLowerCase())
      );
    });
    this.setState({ cards: filteredCards });
  };

  add = (index) => {
    this.setState({
      selectedCards: [...this.state.selectedCards, this.state.cards[index]],
    });
    const filteredCards = this.state.cards.filter((card, i) => {
      return i !== index;
    });
    this.setState({ cards: filteredCards });
  };

  delete = (index) => {
    const filteredSelectedCards = this.state.selectedCards.filter((card, i) => {
      return i !== index;
    });
    this.setState({ selectedCards: filteredSelectedCards });
    const filteredAllCards = this.state.allCards.filter((card) => {
      return (
        !filteredSelectedCards.includes(card) &&
        (card.name.toLowerCase().includes(this.state.query.toLowerCase()) ||
          card.type.toLowerCase().includes(this.state.query.toLowerCase()))
      );
    });
    this.setState({
      cards: filteredAllCards,
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="app">
        <h1 style={{ height: "10%" }}>My Pokedex</h1>
        <div className="content" style={{ height: "80%" }}>
          <Card
            cards={this.state.selectedCards}
            COLORS={COLORS}
            mode={"DELETE"}
            handleDelete={this.delete}
          />
        </div>
        <div
          style={{
            backgroundColor: COLORS.bottomBarBackground,
            width: "100%",
            height: "10%",
            position: "relative",
            boxShadow: COLORS.bottomBarBoxShadow,
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.bottomBarBackground,
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
        <Modal
          show={this.state.show}
          handleClose={this.hideModal}
          cards={this.state.cards}
          handleSearch={this.search}
        >
          <Card
            cards={this.state.cards}
            COLORS={COLORS}
            mode={"ADD"}
            handleAdd={this.add}
          />
        </Modal>
      </div>
    );
  }
}

export default App;
