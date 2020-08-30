import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import { Cells } from "@nteract/presentational-components";

import NBCell from "./NBCell";
import IllusionistWidgetManager from "./WidgetManager";
import { Provider } from "./Context";

class Notebook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            notebook: null,
            widgetManager: null,
        };
    }

    async componentDidMount() {
        const { notebook } = this.props;
        const { url } = this.props.match.params;

        if (notebook) {
            try {
                await this.initNotebook(notebook);
            } catch (err) {
                console.error(err);
                this.setState({ error: err });
            }
        } else if (url) {
            this.setState({
                loading: true,
            });

            fetch(`https://${url}`).then(
                async (response) => {
                    try {
                        const notebook = await response.json();
                        await this.initNotebook(notebook);
                    } catch (err) {
                        console.error(err);
                        this.setState({ error: err });
                    }
                },
                (err) => {
                    console.error(`Error fetching notebook: ${err}`);
                    this.setState({ error: err });
                }
            );
        }
    }

    async initNotebook(notebook) {
        const { nbformat } = notebook;
        if (nbformat != 4) {
            throw new Error(
                "Only Notebooks in format version 4 are supported."
            );
        }

        this.createWidgetStateElements(notebook);
        const widgetManager = new IllusionistWidgetManager();
        await widgetManager.loadState();

        this.setState({
            notebook: notebook,
            widgetManager: widgetManager,
            loading: false,
        });
    }

    createWidgetStateElements(notebook) {
        /**
         * We create some elements in the DOM that the WidgetManager needs to
         * function corrrectly.
         *
         * TODO: Should we just set this directly on the WidgetManager? Probably
         */
        if (notebook.metadata && notebook.metadata.widgets) {
            for (const [key, value] of Object.entries(
                notebook.metadata.widgets
            )) {
                let scriptEl = document.createElement("script");
                scriptEl.type = key;
                scriptEl.innerHTML = JSON.stringify(value);
                document.body.appendChild(scriptEl);
            }
        }
    }

    render() {
        const { url } = this.props.match.params;
        const { notebook } = this.state;

        let contentEl;

        if (this.state.error) {
            contentEl = (
                <div className="loading text-center">
                    <p className="error">Error Loading Notebook</p>
                    <p className="error">{this.state.error.message}</p>
                </div>
            );
        } else if (this.state.loading) {
            contentEl = (
                <div className="loading d-flex flex-row justify-content-center">
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p>Downloading notebook</p>
                    </div>
                </div>
            );
        } else if (notebook) {
            contentEl = (
                <Fragment>
                    <div className="action-buttons float-right">
                        <a href="/">
                            <span className="material-icons">home</span>
                        </a>
                        {url ? (
                            <a
                                href={`//${url}`}
                                title="Download Notebook"
                                download
                            >
                                <span className="material-icons">
                                    cloud_download
                                </span>
                            </a>
                        ) : (
                            ""
                        )}
                    </div>
                    <Cells className="cells">
                        {notebook.cells.map((cell, i) => {
                            return <NBCell key={i} {...cell}></NBCell>;
                        })}
                    </Cells>
                </Fragment>
            );
        }

        return (
            <Provider
                value={{
                    widgetManager: this.state.widgetManager,
                }}
            >
                <main className="notebook container w-100 h-100 p-3 mx-auto">
                    {contentEl}
                </main>
                ;
            </Provider>
        );
    }
}

export default withRouter(Notebook);
