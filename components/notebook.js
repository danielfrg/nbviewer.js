import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import Home from "@material-ui/icons/Home";
import Download from "@material-ui/icons/CloudDownload";
import { Cells } from "@nteract/presentational-components";

// import { DashboardProvider, DashboardCell } from "@danielfrg/jupyter-flex";
const DashboardProvider = dynamic(
    () =>
        import("@danielfrg/jupyter-flex").then((mod) => mod.DashboardProvider),
    {
        ssr: false,
    }
);
const DashboardCell = dynamic(
    () => import("@danielfrg/jupyter-flex").then((mod) => mod.DashboardCell),
    {
        ssr: false,
    }
);

class Notebook extends React.Component {
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

                console.log("!!!");
                console.log(notebook);
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

        return (
            <div className="notebook">
                <DashboardProvider
                    value={{
                        widgetManager: widgetManager,
                    }}
                >
                    <div style={{ position: "relative" }}>
                        <Link href="/">
                            <Fab
                                size="small"
                                style={{ position: "absolute", left: "-70px" }}
                            >
                                <Home />
                            </Fab>
                        </Link>
                        {url ? (
                            <Link
                                href={`//${url}`}
                                target="blank"
                                rel="noopener"
                                download
                            >
                                <Fab
                                    size="small"
                                    style={{
                                        position: "absolute",
                                        top: 50,
                                        left: "-70px",
                                    }}
                                >
                                    <Download size="small" />
                                </Fab>
                            </Link>
                        ) : null}
                        <Cells>
                            {notebook.cells.map((cell, i) => {
                                return (
                                    <DashboardCell
                                        key={i}
                                        {...cell}
                                    ></DashboardCell>
                                );
                            })}
                        </Cells>
                    </div>
                </DashboardProvider>
            </div>
        );
    }
}

export default Notebook;
