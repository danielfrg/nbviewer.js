import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "../Home";
import Notebook from "../Notebook";
import Dashboard from "../Dashboard";

class NBViewerApp extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(props) => <Home {...props} />}
                    ></Route>
                    <Route
                        exact
                        path="/nb/:url+"
                        render={(props) => <Notebook {...props} />}
                    ></Route>
                    <Route
                        exact
                        path="/flex/:url+"
                        render={(props) => <Dashboard {...props} />}
                    ></Route>
                </Switch>
            </Router>
        );
    }
}

export default NBViewerApp;
