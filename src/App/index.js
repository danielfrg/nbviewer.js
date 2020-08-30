import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Home from "../Home";
import Notebook from "../Notebook";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(props) => <Home {...props} />}
                    ></Route>
                    <Route exact path="/url/:url+">
                        <Notebook />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
