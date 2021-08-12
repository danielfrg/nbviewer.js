import React from "react";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";

import CircularProgress from "@material-ui/core/CircularProgress";

// import IllusionistWidgetManager, {
//     WIDGET_STATE_MIMETYPE,
//     WIDGET_ONCHANGE_MIMETYPE,
// } from "@danielfrg/illusionist";
const IllusionistWidgetManager = dynamic(
    () =>
        import("@danielfrg/illusionist").then(
            (mod) => mod.IllusionistWidgetManager
        ),
    {
        ssr: false,
    }
);
const WIDGET_STATE_MIMETYPE = dynamic(
    () =>
        import("@danielfrg/illusionist").then(
            (mod) => mod.WIDGET_STATE_MIMETYPE
        ),
    {
        ssr: false,
    }
);
const WIDGET_ONCHANGE_MIMETYPE = dynamic(
    () =>
        import("@danielfrg/illusionist").then(
            (mod) => mod.WIDGET_ONCHANGE_MIMETYPE
        ),
    {
        ssr: false,
    }
);

// import JupyterFlexDashboard from "@danielfrg/jupyter-flex";
const JupyterFlexDashboard = dynamic(
    () =>
        import("@danielfrg/jupyter-flex").then(
            (mod) => mod.JupyterFlexDashboard
        ),
    {
        ssr: false,
    }
);

import notebook2dashboard from "./convert";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: "",
            loading: null,
            error: null, // Should be like: { title: "", err: "" }
            dashboard: null,
            widgetManager: null,
        };
    }

    async componentDidMount() {
        const { router, notebook } = this.props;
        console.log("Router:");
        console.log(router);
        const path = router.asPath; // : "/song#asadfasdf"
        const paths = path.split("#");

        const url = paths.length < 1 ? undefined : paths[1];
        this.setState({ url: url });
        console.log("Dashboard URL:");
        console.log(url);

        if (notebook) {
            // Notebook passed as props
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
                        await this.initNotebook(notebook, url);
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

    async initNotebook(notebook, url) {
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

        if (!dashboard.props.title) {
            var filename = url.substring(url.lastIndexOf("/") + 1);
            dashboard.props.title = filename;
        }
        if (!dashboard.props.home) {
            dashboard.props.home = "/";
        }

        this.setState({
            dashboard: dashboard,
            // loading: false,
        });
    }

    render() {
        const { url, loading, dashboard, error, widgetManager } = this.state;

        let contentEl;

        if (error) {
            contentEl = (
                <div className="center">
                    <p className="error">{error.title}</p>
                    <p className="error">
                        {error.err && error.err.message
                            ? error.err.message
                            : "See console log for details."}
                    </p>
                </div>
            );
        } else if (loading) {
            contentEl = (
                <div className="center">
                    <CircularProgress color="primary" />
                    <p>Downloading notebook</p>
                </div>
            );
        } else if (dashboard) {
            contentEl = (
                <JupyterFlexDashboard
                    dashboard={dashboard}
                    widgetManager={widgetManager}
                ></JupyterFlexDashboard>
            );
        }

        return <div className="jupyter-flex-page">{contentEl}</div>;
    }
}

export default withRouter(Dashboard);
