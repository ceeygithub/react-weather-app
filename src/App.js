
import React from "react";
import "./index.css";
import Current from "./Current";




function App() {

  return (
    <div>
      <div className="container my-5 py-5 ">

        <main>
          <Current />
        </main>

      </div>
      <div className="ms-5 ps-5 pb-5 footer"> <a href="https://github.com/ceeygithub/react-weather-app" target="_blank" rel="noreferrer" >Open-source code</a> by <a href="https://wonderful-entremet-4edd92.netlify.app" rel="noreferrer" >Cynthia Ekhomwandolor</a> from <a href="https://shecodes.io/" rel="noreferrer"  >She Codes</a>
      </div>
    </div>
  );
}

export default App;

