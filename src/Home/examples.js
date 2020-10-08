import React from "react";

import { Link } from "react-router-dom";

function Examples() {
    return (
        <div className="examples container">
            <h2>Notebooks</h2>
            <div className="image-grid d-flex flex-wrap">
                <Image
                    to="/nb/raw.githubusercontent.com/jrjohansson/scientific-python-lectures/master/Lecture-4-Matplotlib.ipynb"
                    img="/img/matplitlib-tutorial.png"
                    text="Matplotlib Tutorial"
                />
                <Image
                    to="/nb/raw.githubusercontent.com/fastai/fastai/master/nbs/examples/camvid.ipynb"
                    img="/img/fast-ai.png"
                    text="Fast AI camvid"
                />
                <Image
                    to="/nb/raw.githubusercontent.com/bokeh/bokeh-notebooks/main/tutorial/01%20-%20Basic%20Plotting.ipynb"
                    img="/img/Bokeh.png"
                    text="Bokeh Plotting"
                />
            </div>
            <h2>Jupyter-flex dashboards</h2>
            <div className="image-grid d-flex flex-wrap">
                <Image
                    to="/flex/jupyter-flex.extrapolations.dev/examples/notebooks/altair.ipynb"
                    img="https://jupyter-flex.extrapolations.dev/assets/img/screenshots/plots/altair.png"
                    text="Altair plots"
                />
                <Image
                    to="/flex/jupyter-flex.extrapolations.dev/examples/notebooks/data-types.ipynb"
                    img="https://jupyter-flex.extrapolations.dev/assets/img/screenshots/demos/data-types.png"
                    text="NBA Scoring"
                />
                <Image
                    to="/flex/jupyter-flex.extrapolations.dev/examples/notebooks/widgets-gallery.ipynb"
                    img="https://jupyter-flex.extrapolations.dev/assets/img/screenshots/widgets/widgets-gallery.png"
                    text="Jupyter widgets"
                />
            </div>
        </div>
    );
}

function Image(props) {
    return (
        <Link to={props.to} className="image-card">
            <figure>
                <img src={props.img} alt={props.text}></img>
                <figcaption>{props.text}</figcaption>
            </figure>
        </Link>
    );
}

export default Examples;
