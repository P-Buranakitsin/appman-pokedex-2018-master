import React from "react";

const ProgressBar = ({ COLORS, value, label }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", marginBottom: 12 }}>
      <div style={{ fontSize: 20, width: "10%" }}>{label}</div>
      <div
        style={{
          backgroundColor: COLORS.levelTubeBackground,
          width: "65%",
          boxShadow: `2px 2px ${COLORS.levelTubeBoxShadow}`,
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
            backgroundColor: COLORS.levelTubeValueBackground,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
