import React from "react";
import "./Modal.scss";
import Search from "../search.png";

const Modal = ({ handleClose, show, children, handleSearch }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName} onClick={handleClose}>
      <section className="modal-main" onClick={(e) => e.stopPropagation()}>
        <div style={{ position: "relative" }}>
          <form>
            <label htmlFor="search"></label>
            <input
              type="text"
              id="search"
              name="searchPokemon"
              placeholder="Find pokemon"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
            <img
              style={{
                position: "absolute",
                bottom: "50%",
                right: 8,
                width: 32,
                height: 32,
                transform: "translate(0%, 50%)",
              }}
              src={Search}
              alt="search"
            />
          </form>
        </div>
        <div style={{ overflow: "auto", marginTop: 12 }}>{children}</div>
      </section>
    </div>
  );
};

export default Modal;
