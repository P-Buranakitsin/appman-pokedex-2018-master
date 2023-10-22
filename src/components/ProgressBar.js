import React from "react";
import * as colors from "../colors.module.scss";

const ProgressBar = ({ value, label }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", marginBottom: 12 }}>
      <div style={{ fontSize: 20, width: "10%" }}>{label}</div>
      <div
        style={{
          backgroundColor: colors.levelTubeBackground,
          width: "65%",
          boxShadow: `2px 2px ${colors.levelTubeBoxShadow}`,
          borderRadius: 18,
          height: 32,
          marginLeft: 80,
        }}
      >
        <div
          style={{
            width: `${value}`,
            height: "100%",
            borderRadius: 18,
            backgroundColor: colors.levelTubeValueBackground,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
