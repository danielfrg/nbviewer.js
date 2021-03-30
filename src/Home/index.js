import React, { Fragment } from "react";

import Modal from "./modal";
import Examples from "./examples";
import URLForm from "./urlform";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            notebook: null,
            type: null,
        };
    }

    toggleModal = () => this.setState({ showModal: !this.state.showModal });

    onSubmit = (url, type) => {
        let target = url.href.substring(url.protocol.length + 2);
        this.props.history.push(`/${type}/${target}`);
    };

    onUpload = (notebook, type) => {
        this.props.history.push({
            pathname: `/${type}`,
            state: { notebook: notebook },
        });
    };

    render() {
        const sourceModal = (
            <Modal title="About nbviewer.js" onCloseClick={this.toggleModal}>
                <p>
                    This application is a client-only Javascript implementation
                    of a Jupyter Notebook viewer. In the same spirit as{" "}
                    <a href="https://nbviewer.jupyter.org/">
                        nbviewer.jupyter.org
                    </a>{" "}
                    but without the dependency on a external server to do the
                    conversion of the notebook.
                </p>
                <p>
                    Additionally it supports{" "}
                    <a href="https://illusionist.danielfrg.com/">illusionist</a>
                    , this allows you to deploy client-only Notebooks with
                    widgets, and{" "}
                    <a href="https://jupyter-flex.danielfrg.com/">
                        jupyter-flex
                    </a>{" "}
                    dashboards.
                </p>
                <p>
                    It&apos;s built using{" "}
                    <a href="https://reactjs.org/">React</a> and{" "}
                    <a href="https://github.com/nteract/nteract">
                        nteract components
                    </a>
                    .
                </p>
            </Modal>
        );

        return (
            <Fragment>
                <div className="home-page">
                    <div className="content container d-flex w-100 h-100 p-3 mx-auto flex-column">
                        <main>
                            <h1 className="text-center">nbviewer.js</h1>

                            <p className="text-center subtitle">
                                Upload a file or paste an URL to render it:
                            </p>

                            <URLForm
                                onSubmit={this.onSubmit}
                                onUpload={this.onUpload}
                            />
                            <Examples />
                        </main>
                        <footer className="mt-auto text-center">
                            <p>
                                <button onClick={this.toggleModal}>
                                    About
                                </button>{" "}
                                &bull; Built by{" "}
                                <a href="https://danielfrg.com">
                                    Daniel Rodriguez
                                </a>{" "}
                                &bull;{" "}
                                <a href="https://github.com/danielfrg/nbviewer.js">
                                    Code on Github
                                </a>
                            </p>
                        </footer>
                    </div>
                </div>

                {this.state.showModal ? sourceModal : null}
            </Fragment>
        );
    }
}

export default Home;
