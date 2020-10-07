import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import { Cells } from "@nteract/presentational-components";
import IllusionistWidgetManager, {
    WIDGET_STATE_MIMETYPE,
    WIDGET_ONCHANGE_MIMETYPE,
} from "@danielfrg/illusionist";
import { DashboardProvider, DashboardCell } from "@danielfrg/jupyter-flex";

class Notebook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error: null, // Should be like: { title: "", err: "" }
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
                console.error(`Error parsing notebook: ${err}`);
                console.error(err);
                this.setState({
                    error: {
                        title: "Error parsing notebook",
                        err: err,
                    },
                });
            }
        } else if (url) {
            this.setState({
                loading: true,
            });

            fetch(`//${url}`).then(
                async (response) => {
                    if (!response.ok) {
                        this.setState({
                            error: {
                                title: "Error fetching notebook",
                                err: {
                                    message: `Status code: ${response.status}`,
                                },
                            },
                        });
                        return;
                    }

                    try {
                        const notebook = await response.json();
                        await this.initNotebook(notebook);
                    } catch (err) {
                        console.error(`Error parsing notebook: ${err}`);
                        console.error(err);
                        this.setState({
                            error: {
                                title: "Error parsing notebook",
                                err: err,
                            },
                        });
                    }
                },
                (err) => {
                    console.error(`Error fetching notebook: ${err}`);
                    this.setState({ error: err });
                    this.setState({
                        error: { title: "Error fetching notebook", err: err },
                    });
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
        const { loading, notebook, error, widgetManager } = this.state;

        let contentEl;

        if (error) {
            contentEl = (
                <div className="loading text-center">
                    <p className="error">{error.title}</p>
                    <p className="error">
                        {error.err.message
                            ? error.err.message
                            : "See console log for details."}
                    </p>
                </div>
            );
        } else if (loading) {
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
                            return (
                                <DashboardCell
                                    key={i}
                                    {...cell}
                                ></DashboardCell>
                            );
                        })}
                    </Cells>
                </Fragment>
            );
        }

        return (
            <DashboardProvider
                value={{
                    widgetManager: widgetManager,
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
