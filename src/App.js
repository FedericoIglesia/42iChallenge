import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import "./App.css";
import Nav from "./components/Nav";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
