import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import { Cells } from "@nteract/presentational-components";
import IllusionistWidgetManager, {
    WIDGET_STATE_MIMETYPE,
    WIDGET_ONCHANGE_MIMETYPE,
} from "@danielfrg/illusionist";
import { DashboardProvider } from "@danielfrg/jupyter-flex";

import NBCell from "./NBCell";

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

            fetch(`http://${url}`).then(
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

        if (notebook.metadata.widgets) {
            const widgetManager = new IllusionistWidgetManager();

            const widgetState =
                notebook.metadata.widgets[WIDGET_STATE_MIMETYPE];
            if (widgetState) {
                await widgetManager.set_state(widgetState);
            }

            const widgetOnChangeState =
                notebook.metadata.widgets[WIDGET_ONCHANGE_MIMETYPE];
            if (widgetOnChangeState) {
                await widgetManager.setOnChangeState(widgetOnChangeState);
            }

            this.setState({
                widgetManager: widgetManager,
            });
        }

        this.setState({
            notebook: notebook,
            loading: false,
        });
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
            <DashboardProvider
                value={{
                    widgetManager: this.state.widgetManager,
                }}
            >
                <main className="notebook container w-100 h-100 p-3 mx-auto">
                    {contentEl}
                </main>
            </DashboardProvider>
        );
    }
}

export default withRouter(Notebook);
