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
                    to="/flex/5f7d05f75b943500c94357e7--jupyter-flex.netlify.app/examples/notebooks/altair.ipynb"
                    img="https://jupyter-flex.netlify.app//assets/img/screenshots/plots/altair.png"
                    text="Altair plots"
                />
                <Image
                    to="/flex/5f7d05f75b943500c94357e7--jupyter-flex.netlify.app/examples/notebooks/ipywidgets-gallery.ipynb"
                    img="https://jupyter-flex.netlify.app//assets/img/screenshots/widgets/ipywidgets-gallery.png"
                    text="Jupyter widgets"
                />
                <Image
                    to="/flex/5f7d05f75b943500c94357e7--jupyter-flex.netlify.app/examples/notebooks/nba-scoring.ipynb"
                    img="https://jupyter-flex.netlify.app//assets/img/screenshots/nba-scoring.png"
                    text="NBA Scoring"
                />
            </div>
        </div>
    );
}

function Image(props) {
    return (
        <Link to={props.to} className="image-card">
            <figure className="image-card">
                <img src={props.img} alt={props.text}></img>
                <figcaption>{props.text}</figcaption>
            </figure>
        </Link>
    );
}

export default Examples;
