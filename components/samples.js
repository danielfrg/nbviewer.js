import React from "react";
import Link from "next/link";

import { Grid } from "@material-ui/core";

function Image(props) {
    return (
        <Link href={props.href}>
            <a className="image-card">
                <figure>
                    <img src={props.img} alt={props.text}></img>
                    <figcaption>{props.text}</figcaption>
                </figure>
            </a>
        </Link>
    );
}

export default function Examples() {
    return (
        <div className="samples">
            <h2>Example notebooks</h2>
            <Grid container direction="row">
                <Grid
                    item
                    xs={4}
                    component={Image}
                    href="/notebook#raw.githubusercontent.com/jrjohansson/scientific-python-lectures/master/Lecture-4-Matplotlib.ipynb"
                    img="/img/matplitlib-tutorial.png"
                    text="Matplotlib Tutorial"
                />
                <Grid
                    item
                    xs={4}
                    component={Image}
                    href="/notebook#raw.githubusercontent.com/fastai/fastai/master/nbs/examples/camvid.ipynb"
                    img="/img/fast-ai.png"
                    text="Fast AI camvid"
                />
                <Grid
                    item
                    xs={4}
                    component={Image}
                    href="/notebook#raw.githubusercontent.com/bokeh/bokeh-notebooks/main/tutorial/01%20-%20Basic%20Plotting.ipynb"
                    img="/img/bokeh.png"
                    text="Bokeh Plotting"
                />
            </Grid>

            <h2>
                <a href="https://jupyter-flex.danielfrg.com">
                    Example jupyter-flex dashboards
                </a>
            </h2>
            <Grid container direction="row">
                <Grid
                    item
                    xs={4}
                    component={Image}
                    href="/flex#jupyter-flex.danielfrg.com/examples/notebooks/altair.ipynb"
                    img="https://jupyter-flex.danielfrg.com/assets/img/screenshots/jupyter_flex.tests.test_examples/plots_altair-reference.png"
                    text="Altair plots"
                />
                <Grid
                    item
                    xs={4}
                    component={Image}
                    href="/flex#jupyter-flex.danielfrg.com/examples/notebooks/data-types.ipynb"
                    img="https://jupyter-flex.danielfrg.com/assets/img/screenshots/jupyter_flex.tests.test_examples/apps_data-types-reference.png"
                    text="Data types"
                />
                <Grid
                    item
                    xs={4}
                    component={Image}
                    href="/flex#jupyter-flex.danielfrg.com/examples/notebooks/widgets-gallery.ipynb"
                    img="https://jupyter-flex.danielfrg.com/assets/img/screenshots/jupyter_flex.tests.test_examples/widgets_widgets-gallery-reference.png"
                    text="Jupyter widgets"
                />
            </Grid>

            <h2>
                <a href="https://illusionist.danielfrg.com">
                    Example illusionist
                </a>
            </h2>
            <Grid container direction="row">
                <Grid
                    item
                    xs={4}
                    component={Image}
                    href="/notebook#illusionist.danielfrg.com/examples/notebooks/multiplier.ipynb"
                    img="/img/illusionist-multiplier.png"
                    text="Multiplier notebook"
                />
                <Grid
                    item
                    xs={4}
                    component={Image}
                    href="/notebook#illusionist.danielfrg.com/examples/notebooks/widget-gallery.ipynb"
                    img="/img/illusionist-widget-gallery.png"
                    text="Widget gallery notebook"
                />
                <Grid
                    item
                    xs={4}
                    component={Image}
                    href="/notebook#illusionist.danielfrg.com/examples/notebooks/matplotlib.ipynb"
                    img="/img/illusionist-matplotlib.png"
                    text="Matplotlib notebook"
                />
                {/* <Grid
                    item
                    xs={4}
                    component={Image}
                    href="/flex#jupyter-flex.danielfrg.com/examples/notebooks/illusionist/multiplier.ipynb"
                    img="https://jupyter-flex.danielfrg.com/assets/img/screenshots/illusionist/multiplier.png"
                    text="Multiplier dashboard"
                />
                <Grid
                    item
                    xs={4}
                    component={Image}
                    href="/flex#jupyter-flex.danielfrg.com/examples/notebooks/illusionist/widget-gallery.ipynb"
                    img="https://jupyter-flex.danielfrg.com/assets/img/screenshots/illusionist/widget-gallery.png"
                    text="Widget gallery notebook"
                />
                <Grid
                    item
                    xs={4}
                    component={Image}
                    href="/flex#jupyter-flex.danielfrg.com/examples/notebooks/illusionist/matplotlib.ipynb"
                    img="https://jupyter-flex.danielfrg.com/assets/img/screenshots/illusionist/matplotlib.png"
                    text="Matplotlib notebook"
                /> */}
            </Grid>
        </div>
    );
}
