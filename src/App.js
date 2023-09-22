
import React from "react";
import "./index.css";
import Search from "./Search";
import Current from "./Current";
import Hour from "./Hour";
import Week from "./Week";


function App() {


  return (
    <div>
      <div className="container my-5 py-5 ">
        <header >
          <Search />
        </header>
        <main>
          <Current />
          <Hour />
          <Week />
        </main>
      </div>
      <div className="ms-5 ps-5 pb-5 footer"> <a href="https://github.com/ceeygithub/react-weather-app" target="_blank" rel="noreferrer" >Open-source code</a> by <a href="https://wonderful-entremet-4edd92.netlify.app" rel="noreferrer" >Cynthia Ekhoe</a> from <a href="https://shecodes.io/" rel="noreferrer"  >She Codes</a>
      </div>
    </div>
  );
}

export default App;
