import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import JupyterFlexDashboard from "@danielfrg/jupyter-flex";

import notebook2dashboard from "./utils";

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

        const dashboard = notebook2dashboard(notebook);

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

        this.setState({
            dashboard: dashboard,
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
