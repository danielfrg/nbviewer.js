import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import JupyterFlexDashboard from "@danielfrg/jupyter-flex";

// import { Provider } from "./Context";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            dashboard: null,
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
        console.log(notebook);
        const { nbformat } = notebook;
        if (nbformat != 4) {
            throw new Error(
                "Only Notebooks in format version 4 are supported."
            );
        }

        // if (notebook.metadata.widgets) {
        //     const widgetManager = new IllusionistWidgetManager();

        //     const widgetState =
        //         notebook.metadata.widgets[WIDGET_STATE_MIMETYPE];
        //     if (widgetState) {
        //         await widgetManager.set_state(widgetState);
        //     }

        //     const widgetOnChangeState =
        //         notebook.metadata.widgets[WIDGET_ONCHANGE_MIMETYPE];
        //     if (widgetOnChangeState) {
        //         await widgetManager.setOnChangeState(widgetOnChangeState);
        //     }

        //     this.setState({
        //         widgetManager: widgetManager,
        //     });
        // }

        const test_dashboard = {
            meta: [],
            pages: [
                {
                    sections: [
                        {
                            cards: [
                                {
                                    body: [
                                        {
                                            cell_type: "code",
                                            execution_count: 2,
                                            metadata: {
                                                execution: {
                                                    "iopub.execute_input":
                                                        "2020-10-04T19:55:10.331006Z",
                                                    "iopub.status.busy":
                                                        "2020-10-04T19:55:10.327393Z",
                                                    "iopub.status.idle":
                                                        "2020-10-04T19:55:10.332668Z",
                                                    "shell.execute_reply":
                                                        "2020-10-04T19:55:10.331880Z",
                                                },
                                                tags: ["body"],
                                                trusted: true,
                                            },
                                            outputs: [],
                                        },
                                    ],
                                    footer: [],
                                    header: "Subplot 1-1",
                                    help: [],
                                    tags: [],
                                },
                                {
                                    body: [
                                        {
                                            cell_type: "code",
                                            execution_count: 3,
                                            metadata: {
                                                execution: {
                                                    "iopub.execute_input":
                                                        "2020-10-04T19:55:10.343556Z",
                                                    "iopub.status.busy":
                                                        "2020-10-04T19:55:10.341711Z",
                                                    "iopub.status.idle":
                                                        "2020-10-04T19:55:10.345057Z",
                                                    "shell.execute_reply":
                                                        "2020-10-04T19:55:10.344362Z",
                                                },
                                                tags: ["body"],
                                                trusted: true,
                                            },
                                            outputs: [],
                                        },
                                    ],
                                    footer: [],
                                    header: "Subplot 1-2",
                                    help: [],
                                    tags: [],
                                },
                            ],
                            tags: [],
                            title: "Column 1",
                        },
                        {
                            cards: [
                                {
                                    body: [
                                        {
                                            cell_type: "code",
                                            execution_count: 4,
                                            metadata: {
                                                execution: {
                                                    "iopub.execute_input":
                                                        "2020-10-04T19:55:10.354572Z",
                                                    "iopub.status.busy":
                                                        "2020-10-04T19:55:10.352840Z",
                                                    "iopub.status.idle":
                                                        "2020-10-04T19:55:10.355977Z",
                                                    "shell.execute_reply":
                                                        "2020-10-04T19:55:10.355321Z",
                                                },
                                                tags: ["body"],
                                                trusted: true,
                                            },
                                            outputs: [],
                                        },
                                    ],
                                    footer: [],
                                    header: "Subplot 2-1",
                                    help: [],
                                    tags: [],
                                },
                                {
                                    body: [
                                        {
                                            cell_type: "code",
                                            execution_count: 5,
                                            metadata: {
                                                execution: {
                                                    "iopub.execute_input":
                                                        "2020-10-04T19:55:10.364754Z",
                                                    "iopub.status.busy":
                                                        "2020-10-04T19:55:10.362783Z",
                                                    "iopub.status.idle":
                                                        "2020-10-04T19:55:10.366234Z",
                                                    "shell.execute_reply":
                                                        "2020-10-04T19:55:10.365587Z",
                                                },
                                                tags: ["body"],
                                                trusted: true,
                                            },
                                            outputs: [],
                                        },
                                    ],
                                    footer: [],
                                    header: "Subplot 2-2",
                                    help: [],
                                    tags: [],
                                },
                            ],
                            tags: [],
                            title: "Column 2",
                        },
                    ],
                    tags: [],
                    title: "",
                },
            ],
            props: {
                author: "built using jupyter-flex",
                include_source: false,
                kernel_name: "Python 3",
                source_link:
                    "https://github.com/danielfrg/jupyter-flex/blob/master/examples/layouts/grid-2x2.ipynb",
                title: "grid-2x2",
            },
        };

        this.setState({
            dashboard: test_dashboard,
            loading: false,
        });
    }

    render() {
        // TODO: We could use this url as the source code link on the dashboard
        // const { url } = this.props.match.params;
        const { dashboard } = this.state;

        let contentEl;

        if (this.state.error) {
            contentEl = (
                <div className="container-fluid d-flex flex-row loading">
                    <div className="text-center">
                        <p className="error">Error Loading Notebook</p>
                        <p className="error">{this.state.error.message}</p>
                    </div>
                </div>
            );
        } else if (this.state.loading) {
            contentEl = (
                <div className="container-fluid d-flex flex-row loading">
                    <div className="text-center">
                        <p>... downloading and building dashboard ...</p>
                    </div>
                </div>
            );
        } else if (dashboard) {
            contentEl = (
                <JupyterFlexDashboard
                    dashboard={dashboard}
                ></JupyterFlexDashboard>
            );
        }

        return (
            // <Provider
            //     value={{
            //         widgetManager: this.state.widgetManager,
            //     }}
            // >
            <div className="jupyter-flex-page">{contentEl}</div>
            // </Provider>
        );
    }
}

export default withRouter(Dashboard);
