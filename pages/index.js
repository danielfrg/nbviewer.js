import React from "react";
import { useRouter } from "next/router";

import { Grid } from "@material-ui/core";

import URLForm from "../components/urlform";
import Samples from "../components/samples";
import Notebook from "../components/notebook";
import Dashboard from "../components/dashboard";
// import Dashboard from "./flex";

export default function Index(props) {
    const router = useRouter();
    const [notebook, setNotebook] = React.useState();
    const [dashboard, setDashboard] = React.useState();

    const onSubmit = (url, type) => {
        router.push(`/${type}#${url}`);
    };

    const onUpload = (notebook, type) => {
        console.log("Loaded notebook:");
        console.log(type);
        console.log(notebook);
        if (type == "notebook") {
            setNotebook(notebook);
        } else if (type == "flex") {
            setDashboard(notebook);
        }
    };

    let content;

    if (notebook) {
        content = <Notebook notebook={notebook} />;
    }
    if (dashboard) {
        content = <Dashboard notebook={dashboard} />;
    }

    return (
        <>
            {content ? (
                content
            ) : (
                <div className="home-page">
                    <Grid container direction="column">
                        <Grid item>
                            <header>
                                <h1 className="text-center">nbviewer.js</h1>
                            </header>
                        </Grid>

                        <Grid item>
                            <URLForm onUpload={onUpload} onSubmit={onSubmit} />
                        </Grid>
                        <Grid item>
                            {" "}
                            <Samples />
                        </Grid>
                        <Grid item>
                            <footer className="mt-auto text-center">
                                <p>
                                    Built by{" "}
                                    <a href="https://danielfrg.com">
                                        Daniel Rodriguez
                                    </a>{" "}
                                    &bull;{" "}
                                    <a href="https://github.com/danielfrg/nbviewer.js">
                                        Code on Github
                                    </a>
                                    .
                                </p>
                            </footer>
                        </Grid>
                    </Grid>
                </div>
            )}
        </>
    );
}
