import React from "react";
import dynamic from "next/dynamic";

import CircularProgress from "@material-ui/core/CircularProgress";

import notebook2dashboard from "../lib/notebook2dashboard";

// import JupyterFlexDashboard from "@danielfrg/jupyter-flex";
const JupyterFlexDashboard = dynamic(() => import("@danielfrg/jupyter-flex"), {
    ssr: false,
});

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            loading: true,
            notebook: null,
            widgetManager: null,
        };
    }

    async componentDidMount() {
        const { notebook } = this.props;

        const { nbformat } = notebook;
        if (nbformat != 4) {
            throw new Error(
                "Only Notebooks in format version 4 are supported."
            );
        }

        if (notebook.metadata.widgets) {
            import("@danielfrg/illusionist").then(async (mod) => {
                const IllusionistWidgetManager = mod.default;
                const widgetManager = new IllusionistWidgetManager();

                const widgetState =
                    notebook.metadata.widgets[mod.WIDGET_STATE_MIMETYPE];
                if (widgetState) {
                    await widgetManager.set_state(widgetState);
                }

                const widgetOnChangeState =
                    notebook.metadata.widgets[mod.WIDGET_ONCHANGE_MIMETYPE];
                if (widgetOnChangeState) {
                    await widgetManager.setOnChangeState(widgetOnChangeState);
                }

                this.setState({
                    loading: false,
                    widgetManager: widgetManager,
                });
            });
        } else {
            this.setState({
                loading: false,
                widgetManager: null,
            });
        }
    }

    render() {
        const { url, notebook } = this.props;
        const { error, loading, widgetManager } = this.state;

        if (error) {
            return (
                <div className="notebook">
                    <div className="center">
                        <p className="error">{error.title}</p>
                        <p className="error">
                            {error.err && error.err.message
                                ? error.err.message
                                : "See console log for details."}
                        </p>
                    </div>
                </div>
            );
        }

        if (loading) {
            return (
                <div className="notebook">
                    <div className="center">
                        <CircularProgress color="primary" />
                        <p>Loading notebook</p>
                    </div>
                </div>
            );
        }

        const dashboard = notebook2dashboard(notebook);

        if (!dashboard.props.home) {
            dashboard.props.home = "/";
        }

        return (
            <div className="jupyter-flex-page">
                <JupyterFlexDashboard
                    dashboard={dashboard}
                    widgetManager={widgetManager}
                ></JupyterFlexDashboard>
            </div>
        );
    }
}

export default Dashboard;
