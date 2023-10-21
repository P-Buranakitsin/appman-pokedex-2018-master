import React from "react";
import "./Modal.css";
import { BiSearch } from "react-icons/bi";

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
              onChange={(e) => {handleSearch(e.target.value)}}
            />
            <BiSearch
              style={{
                position: "absolute",
                bottom: "50%",
                right: 8,
                transform: "translate(0%, 50%)",
              }}
              size={32}
              color="#ec5656"
            />
          </form>
        </div>
        <div style={{ overflow: "auto", marginTop: 12 }}>{children}</div>
      </section>
    </div>
  );
};

export default Modal;
