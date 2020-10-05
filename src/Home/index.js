import React, { Fragment } from "react";

import Notebook from "../Notebook";
import URLForm from "./URLForm";
import Drop from "./Drop";
import Modal from "./Modal";
import { Link } from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notebook: null,
            showModal: false,
        };
    }

    onDrop = (notebook) => {
        this.setState({ notebook: notebook });
    };

    onSubmit = (url) => {
        let target = url.href.substring(url.protocol.length + 2);
        this.props.history.push(`/url/${target}`);
    };

    toggleModal = () => this.setState({ showModal: !this.state.showModal });

    render() {
        if (this.state.notebook) {
            return <Notebook notebook={this.state.notebook} />;
        }

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
                    <a href="https://illusionist.extrapolations.dev/">
                        illusionist
                    </a>
                    , this allows you to deploy client-only Notebooks with
                    widgets, and{" "}
                    <a href="https://jupyter-flex.extrapolations.dev/">
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
                <div className="home">
                    <div className="content container d-flex w-100 h-100 p-3 mx-auto flex-column">
                        <main>
                            <h1 className="text-center">nbviewer.js</h1>

                            <p className="text-center">
                                Upload a file or paste an URL
                            </p>

                            <URLForm onSubmit={this.onSubmit} />
                            <Drop onDrop={this.onDrop} />

                            <p>
                                Examples:{" "}
                                <Link to="/nb/raw.githubusercontent.com/jrjohansson/scientific-python-lectures/master/Lecture-4-Matplotlib.ipynb">
                                    Matplotlib Tutorial
                                </Link>
                                ,{" "}
                                <Link to="/nb/raw.githubusercontent.com/danielfrg/nbviewer.js/master/examples/data-types.ipynb">
                                    Data types
                                </Link>
                                .
                            </p>

                            <p>
                                Illusionist examples:{" "}
                                <Link to="/nb/raw.githubusercontent.com/danielfrg/illusionist/master/examples/multiplier.ipynb">
                                    multiplier
                                </Link>
                                ,{" "}
                                <Link to="/nb/raw.githubusercontent.com/danielfrg/illusionist/master/examples/linked.ipynb">
                                    linked-widgets
                                </Link>
                                ,{" "}
                                <Link to="/nb/raw.githubusercontent.com/danielfrg/illusionist/master/examples/widget-gallery.ipynb">
                                    widget-gallery
                                </Link>
                                ,{" "}
                                <Link to="/nb/raw.githubusercontent.com/danielfrg/illusionist/master/examples/matplotlib.ipynb">
                                    matplotlib
                                </Link>
                                .
                            </p>

                            <p>
                                Jupyter-flex dashboard examples:{" "}
                                <Link to="/flex/raw.githubusercontent.com/jrjohansson/scientific-python-lectures/master/Lecture-4-Matplotlib.ipynb">
                                    Demo
                                </Link>
                                .
                            </p>
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
