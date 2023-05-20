import React from "react";
import "../css/main.scss";
import "../css/interactive_map.scss";

export default function InteractiveMap() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/image/large_background_grey.png)`,
      }}
    >
      <div className="content">
        <img
          className="worldMap"
          src={process.env.PUBLIC_URL + "/image/worldMap.png"}
          alt="Map of the fictional world called Tavaraen."
        ></img>
      </div>
    </div>
  );
}
