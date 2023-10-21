import React from "react";
import ProgressBar from "./ProgressBar";
import { BiHappy } from "react-icons/bi";
import "./Card.css";

const Card = ({ cards, COLORS }) => {
  return (
    <>
      {cards.map((card, index) => {
        return (
          <div
            style={{
              backgroundColor: COLORS.cardBackground,
            }}
            key={`card-${index}`}
            className="card"
          >
            <img src={card.imageUrl} alt="cardImage" style={{ width: "25%" }} />
            <div style={{ marginLeft: 24, width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h2
                  style={{
                    fontSize: 38,
                    fontWeight: "normal",
                    fontFamily: "Gaegu",
                  }}
                >
                  {card.name.toUpperCase()}
                </h2>
                <h2
                  style={{
                    color: COLORS.colorAddButton,
                  }}
                  className="add-button"
                >
                  Add
                </h2>
              </div>

              <ProgressBar value={`${card.hp}%`} COLORS={COLORS} label={"HP"} />
              <ProgressBar
                value={card.strength}
                COLORS={COLORS}
                label={"STR"}
              />
              <ProgressBar
                value={card.weakness}
                COLORS={COLORS}
                label={"WEAK"}
              />
              {[...Array(card.happiness)].map((e, i) => (
                <BiHappy
                  size={40}
                  key={`happy-${i}`}
                  style={{ marginRight: 8, marginTop: 10 }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
