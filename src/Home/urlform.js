import React from "react";

import Drop from "./drop";

class URLForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: "",
            type: "nb",
            error: "",
        };
    }

    onUpload = (notebook) => {
        this.props.onUpload(notebook, this.state.type);
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.state.url) {
            return;
        }

        try {
            const urlObj = new URL(this.state.url);
            this.props.onSubmit(urlObj, this.state.type);
        } catch (err) {
            console.error(err);
            this.setError(err.message);
        }
    };

    setError = (error) => {
        this.setState({ error: error });
    };

    render() {
        const { url, error } = this.state;

        return (
            <div className="url-form">
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <select
                                className="custom-select"
                                defaultValue="notebook"
                                onBlur={(event) =>
                                    this.setState({ type: event.target.value })
                                }
                            >
                                <option value="nb">Notebook</option>
                                <option value="flex">Flex Dashboard</option>
                            </select>
                        </div>
                        <input
                            type="text"
                            id="main-input"
                            className="form-control"
                            name="url"
                            placeholder="URL"
                            value={url}
                            onChange={(event) =>
                                this.setState({ url: event.target.value })
                            }
                        ></input>
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-outline">
                                Go
                            </button>
                        </div>
                    </div>
                </form>
                <Drop onDrop={this.onUpload} onError={this.setError} />
                <div className="error">{error}</div>
            </div>
        );
    }
}

export default URLForm;
