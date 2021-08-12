import React from "react";
import { withRouter } from "next/router";

import CircularProgress from "@material-ui/core/CircularProgress";

import Notebook from "../components/notebook";

class NotebookPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: "",
            error: null, // Should be like: { title: "", err: "" }
            notebook: null,
            loading: true,
        };
    }

    async componentDidMount() {
        const { router } = this.props;
        console.log("Router:");
        console.log(router);
        const path = router.asPath; // : "/song#asadfasdf"
        const paths = path.split("#");

        const url = paths.length < 1 ? undefined : paths[1];
        this.setState({ url: url });
        console.log("Notebook URL:");
        console.log(url);

        if (url) {
            console.log("Downloading notebook");
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
                        console.log("Downloaded notebook:");
                        console.log(notebook);
                        this.setState({ loading: false, notebook: notebook });
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

    render() {
        const { url, error, loading, notebook } = this.state;

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
                        <p>Downloading notebook</p>
                    </div>
                </div>
            );
        }

        return <Notebook url={url} notebook={notebook}></Notebook>;
    }
}

export default withRouter(NotebookPage);
