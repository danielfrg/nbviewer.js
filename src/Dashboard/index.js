import React from "react";
import { withRouter } from "react-router-dom";

import IllusionistWidgetManager, {
    WIDGET_STATE_MIMETYPE,
    WIDGET_ONCHANGE_MIMETYPE,
} from "@danielfrg/illusionist";
import JupyterFlexDashboard from "@danielfrg/jupyter-flex";
import { DashboardProvider } from "@danielfrg/jupyter-flex";

// import test_nb from "./demo";
import notebook2dashboard from "./convert";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            // loading: false,
            error: null, //Should be like: { title: "", err: "" }
            dashboard: null,
            // dashboard: test_nb,
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
                    // console.error(`Error fetching notebook: ${err}`);
                    // this.setState({ error: err });
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

        const dashboard = notebook2dashboard(notebook);
        this.setState({
            dashboard: dashboard,
            loading: false,
        });
    }

    render() {
        // TODO: We could use this url as the source code link on the dashboard
        // const { url } = this.props.match.params;
        const { loading, dashboard, error } = this.state;

        let contentEl;

        if (error) {
            contentEl = (
                <div className="container-fluid d-flex flex-row loading">
                    <div className="text-center">
                        <p className="error">{error.title}</p>
                        <p className="error">
                            {error.err.message
                                ? error.err.message
                                : "See console log for details."}
                        </p>
                    </div>
                </div>
            );
        } else if (loading) {
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

        // return <div className="jupyter-flex-page">{contentEl}</div>;

        return (
            <DashboardProvider
                value={{
                    widgetManager: this.state.widgetManager,
                }}
            >
                <div className="jupyter-flex-page">{contentEl}</div>
            </DashboardProvider>
        );
    }
}

// export default Dashboard;
export default withRouter(Dashboard);
