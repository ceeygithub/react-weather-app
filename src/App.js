
import React from "react";
import "./index.css";
import Search from "./Search";
import Current from "./Current";
import Hour from "./Hour";
import Week from "./Week";


function App() {


  return (

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
  );
}

export default App;
