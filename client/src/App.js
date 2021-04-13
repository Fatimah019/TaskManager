import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import AllList from "./Components/ItemLists/all";
import HomeList from "./Components/ItemLists/home";
import MusicList from "./Components/ItemLists/music";
import StudyList from "./Components/ItemLists/study";
import TravelList from "./Components/ItemLists/travel";
import WorkList from "./Components/ItemLists/work";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/all" component={AllList} />
          <Route path="/study" component={StudyList} />
          <Route path="/work" component={WorkList} />
          <Route path="/travel" component={TravelList} />
          <Route path="/home" component={HomeList} />
          <Route path="/music" component={MusicList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
