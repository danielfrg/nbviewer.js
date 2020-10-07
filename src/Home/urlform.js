import React, { useState } from "react";

function URLForm(props) {
    const [error, setError] = useState("");
    const [url, setURL] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!url) {
            return;
        }

        try {
            const urlObj = new URL(url);
            props.onSubmit(urlObj);
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <div className="url-form">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        id="main-input"
                        className="form-control"
                        name="url"
                        placeholder="URL"
                        value={url}
                        onChange={(event) => setURL(event.target.value)}
                    ></input>
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-outline">
                            Go
                        </button>
                    </div>
                </div>
            </form>
            <div className="error">{error}</div>
        </div>
    );
}

export default URLForm;
