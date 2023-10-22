import React from "react";
import ProgressBar from "./ProgressBar";
import "./Card.scss";
import * as colors from "../colors.module.scss";
import Cute from "../cute.png";

const Card = ({ cards, mode, handleAdd, handleDelete }) => {
  return (
    <>
      {cards.map((card, index) => {
        return (
          <div
            style={{
              backgroundColor: colors.cardBackground,
            }}
            key={`card-${index}`}
            className="card"
          >
            <img
              src={card.imageUrl}
              alt="cardImage"
              style={{ width: "25%", objectFit: "contain" }}
            />
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
                {mode === "ADD" && (
                  <h2
                    style={{
                      color: colors.colorAddButton,
                    }}
                    className="add-button"
                    onClick={() => handleAdd(index)}
                  >
                    Add
                  </h2>
                )}
                {mode === "DELETE" && (
                  <h2
                    style={{
                      color: colors.colorAddButton,
                    }}
                    className="delete-button"
                    onClick={() => handleDelete(index)}
                  >
                    X
                  </h2>
                )}
              </div>

              <ProgressBar value={`${card.hp}%`} label={"HP"} />
              <ProgressBar value={card.strength} label={"STR"} />
              <ProgressBar value={card.weakness} label={"WEAK"} />
              {[...Array(card.happiness)].map((e, i) => (
                <img
                  src={Cute}
                  key={`happy-${i}`}
                  style={{
                    marginRight: 8,
                    marginTop: 10,
                    width: 38,
                    height: 38,
                  }}
                  alt="cute"
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
