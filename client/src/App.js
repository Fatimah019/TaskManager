import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./ReduxSetup/Store";
import Home from "./Components/Home";
import AllList from "./Components/ItemLists/all";
import HomeList from "./Components/ItemLists/home";
import MusicList from "./Components/ItemLists/music";
import StudyList from "./Components/ItemLists/study";
import TravelList from "./Components/ItemLists/travel";
import WorkList from "./Components/ItemLists/work";
// auths
import Signup from "./Components/Signup";
import Login from "./Components/Auth";

// protected route
const ProtectedRoute = ({ component: Component, ...rest }) => {
  //check if the user is an authenticated seller
  const authenticated = localStorage.getItem("token") ? true : false;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authenticated) {
          return <Component {...props} />;
        } else {
          localStorage.clear();
          return <Redirect to="/continue" />;
        }
      }}
    />
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute path="/all" component={AllList} />
            <ProtectedRoute path="/study" component={StudyList} />
            <ProtectedRoute path="/work" component={WorkList} />
            <ProtectedRoute path="/travel" component={TravelList} />
            <ProtectedRoute path="/home" component={HomeList} />
            <ProtectedRoute path="/music" component={MusicList} />
            <Route path="/continue" component={Login} />
            <Route path="/create" component={Signup} />
          </Switch>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
