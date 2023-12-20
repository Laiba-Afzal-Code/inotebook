import React from "react";
import Note from "./Note";

export const Home = (props) => {
  const {showAlert} = props;
  return (
    <div>
      <Note showAlert={showAlert}/>
    </div>
  );
};

export default Home;
