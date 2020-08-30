import * as React from "react";

import { NotebookContext } from "./Context";

function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
        c
    ) {
        var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function onNextFrame(callback) {
    setTimeout(function () {
        window.requestAnimationFrame(callback);
    });
}

class Widget extends React.Component {
    render() {
        const { data } = this.props;
        const { widgetManager } = this.context;

        const uuid = uuidv4();

        let model_id;
        if (widgetManager) {
            model_id = data["model_id"];

            onNextFrame(() => {
                this.context.widgetManager.renderWidget(model_id);
            });
        }

        return (
            <div id={uuid} className="output_subarea output_widget_state">
                <div id={model_id}>
                    <div className="loading-widget text-center">
                        <div
                            role="status"
                            className="spinner-border"
                            style={{
                                width: "1rem",
                                height: "1rem",
                                animationDuration: "1s",
                            }}
                        >
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p
                            className="loading-widget"
                            style={{
                                fontSize: "0.8em",
                            }}
                        >
                            loading widget
                        </p>
                    </div>
                </div>
                <script type="application/vnd.jupyter.widget-view+json">
                    {JSON.stringify(data)}
                </script>
            </div>
        );
    }
}

Widget.defaultProps = {
    mediaType: "application/vnd.jupyter.widget-view+json",
};

Widget.contextType = NotebookContext;

export default Widget;
