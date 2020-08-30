import React from "react";

import {
    Cell,
    Input,
    Prompt,
    Source,
    Outputs,
} from "@nteract/presentational-components";
import {
    Output,
    RichMedia,
    Media,
    StreamText,
    KernelOutputError,
} from "@nteract/outputs";
import { Provider } from "@nteract/mathjax";

import Widget from "./Widget";

class NBCell extends React.Component {
    render() {
        const { cell_type } = this.props;
        let { source } = this.props;

        // Some notebooks have arrays in some fields that should be string
        // So we join them as needed
        if (source) {
            source = source.join("");
        }
        if (this.props.outputs) {
            this.props.outputs.map((output) => {
                const { text, data } = output;
                if (text && Array.isArray(text)) {
                    output.text = output.text.join("");
                }
                if (data) {
                    for (const [key, value] of Object.entries(data)) {
                        if (Array.isArray(value)) {
                            data[key] = value.join("");
                        }
                    }
                }
            });
        }

        let content = "";

        if (cell_type == "markdown") {
            content = <Media.Markdown data={source} />;
        } else if (cell_type == "code") {
            content = (
                <Cell>
                    <Input>
                        <Prompt
                            className="prompt"
                            counter={this.props.execution_count}
                        />
                        <Source language="python">
                            {this.props.source.join("")}
                        </Source>
                    </Input>
                    <Outputs>
                        {this.props.outputs.map((output, i) => {
                            const { output_type } = output;

                            if (output_type == "stream") {
                                return (
                                    <Output key={i} output={output}>
                                        <StreamText />
                                    </Output>
                                );
                            } else if (output_type == "error") {
                                return (
                                    <Output key={i} output={output}>
                                        <KernelOutputError />
                                    </Output>
                                );
                            } else {
                                return (
                                    <RichMedia
                                        key={i}
                                        data={{ ...output.data }}
                                    >
                                        <Widget />
                                        <Media.HTML />
                                        <Media.SVG />
                                        <Media.Image mediaType="image/png" />
                                        <Media.Image mediaType="image/jpeg" />
                                        <Media.Image mediaType="image/gif" />
                                        <Media.JavaScript />
                                        <Media.Json />
                                        <Media.LaTeX />
                                        <Media.Markdown />
                                        <Media.Plain />
                                    </RichMedia>
                                );
                            }
                        })}
                    </Outputs>
                </Cell>
            );
        }

        return (
            <Provider src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS_HTML">
                {content}
            </Provider>
        );
    }
}

export default NBCell;
