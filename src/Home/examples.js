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
                    img="/img/bokeh.png"
                    text="Bokeh Plotting"
                />
            </div>

            <h2>
                <a href="https://jupyter-flex.danielfrg.com">
                    Jupyter-flex dashboards
                </a>
            </h2>
            <div className="image-grid d-flex flex-wrap">
                <Image
                    to="/flex/jupyter-flex.danielfrg.com/examples/notebooks/altair.ipynb"
                    img="https://jupyter-flex.danielfrg.com/assets/img/screenshots/plots/altair.png"
                    text="Altair plots"
                />
                <Image
                    to="/flex/jupyter-flex.danielfrg.com/examples/notebooks/data-types.ipynb"
                    img="https://jupyter-flex.danielfrg.com/assets/img/screenshots/demos/data-types.png"
                    text="Data types"
                />
                <Image
                    to="/flex/jupyter-flex.danielfrg.com/examples/notebooks/widgets-gallery.ipynb"
                    img="https://jupyter-flex.danielfrg.com/assets/img/screenshots/widgets/widgets-gallery.png"
                    text="Jupyter widgets"
                />
            </div>

            <h2>
                <a href="https://illusionist.danielfrg.com">Illusionist</a>
            </h2>
            <div className="image-grid d-flex flex-wrap">
                <Image
                    to="/nb/illusionist.danielfrg.com/examples/notebooks/multiplier.ipynb"
                    img="/img/illusionist-multiplier.png"
                    text="Multiplier notebook"
                />
                <Image
                    to="/nb/illusionist.danielfrg.com/examples/notebooks/widget-gallery.ipynb"
                    img="/img/illusionist-widget-gallery.png"
                    text="Widget gallery notebook"
                />
                <Image
                    to="/nb/illusionist.danielfrg.com/examples/notebooks/matplotlib.ipynb"
                    img="/img/illusionist-matplotlib.png"
                    text="Matplotlib notebook"
                />
                <Image
                    to="/flex/jupyter-flex.danielfrg.com/examples/notebooks/illusionist/multiplier.ipynb"
                    img="https://jupyter-flex.danielfrg.com/assets/img/screenshots/illusionist/multiplier.png"
                    text="Multiplier dashboard"
                />
                <Image
                    to="/flex/jupyter-flex.danielfrg.com/examples/notebooks/illusionist/widget-gallery.ipynb"
                    img="https://jupyter-flex.danielfrg.com/assets/img/screenshots/illusionist/widget-gallery.png"
                    text="Widget gallery notebook"
                />
                <Image
                    to="/flex/jupyter-flex.danielfrg.com/examples/notebooks/illusionist/matplotlib.ipynb"
                    img="https://jupyter-flex.danielfrg.com/assets/img/screenshots/illusionist/matplotlib.png"
                    text="Matplotlib notebook"
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
