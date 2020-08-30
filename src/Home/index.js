import React from "react";

import Notebook from "../Notebook";
import URLForm from "./URLForm";
import Drop from "./Drop";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notebook: "",
        };
    }

    onDrop = (notebook) => {
        this.setState({ notebook: notebook });
    };

    onSubmit = (url) => {
        let target = url.href.substring(url.protocol.length + 2);
        this.props.history.push(`/url/${target}`);
    };

    render() {
        if (this.state.notebook) {
            return <Notebook notebook={this.state.notebook} />;
        }

        return (
            <main className="container home">
                <h1 className="text-center">nbviewer.js</h1>

                <p className="text-center">Upload a file or paste an URL</p>

                <Drop onDrop={this.onDrop} />
                <URLForm onSubmit={this.onSubmit} />
            </main>
        );
    }
}

export default Home;
