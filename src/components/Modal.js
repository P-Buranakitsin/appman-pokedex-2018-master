import React, { Component } from "react";
import './Modal.css'

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName} onClick={handleClose}>
        <section className="modal-main" onClick={(e) => e.stopPropagation()}>
          {children}
          <button type="button" onClick={handleClose}>
            Close
          </button>
        </section>
      </div>
    );
  }

export default Modal;