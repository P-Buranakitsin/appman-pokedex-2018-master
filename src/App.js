import React, { Component } from "react";
import "./App.scss";
import Modal from "./components/Modal";
import Cards from "./components/Cards";

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

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  search(value) {
    this.setState({ query: value });
    const filteredCards = this.state.allCards.filter((card) => {
      return (
        !this.state.selectedCards.includes(card) &&
        (card.name.toLowerCase().includes(value.toLowerCase()) ||
          card.type.toLowerCase().includes(value.toLowerCase()))
      );
    });
    this.setState({ cards: filteredCards });
  }

  add(index) {
    this.setState({
      selectedCards: [...this.state.selectedCards, this.state.cards[index]],
    });
    const filteredCards = this.state.cards.filter((_, i) => {
      return i !== index;
    });
    this.setState({ cards: filteredCards });
  }

  delete(index) {
    const filteredSelectedCards = this.state.selectedCards.filter((_, i) => {
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
  }

  render() {
    return (
      <div className="app">
        <h1 style={{ height: "10%" }}>My Pokedex</h1>
        <div className="content" style={{ height: "80%" }}>
          <Cards
            cards={this.state.selectedCards}
            mode={"DELETE"}
            handleDelete={this.delete}
          />
        </div>
        <div className="bottom-bar">
          <div className="open-modal-button" onClick={this.showModal}>
            +
          </div>
        </div>
        <Modal
          show={this.state.show}
          handleClose={this.hideModal}
          cards={this.state.cards}
          handleSearch={this.search}
        >
          {this.state.cards.length > 0 ? (
            <Cards cards={this.state.cards} mode={"ADD"} handleAdd={this.add} />
          ) : (
            <h3>No pokemon found</h3>
          )}
        </Modal>
      </div>
    );
  }
}

export default App;
