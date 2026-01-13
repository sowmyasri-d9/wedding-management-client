import React, { useEffect, useState } from "react";
import axios from "axios";

const DJList = () => {
  const [djs, setDJs] = useState([]);

  useEffect(() => {
    axios.get("/api/djs").then((response) => setDJs(response.data));
  }, []);

  return (
    <div>
      <h2>DJs</h2>
      <ul>
        {djs.map((dj) => (
          <li key={dj._id}>{dj.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DJList;
