import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Drop(props) {
    const [error, setError] = useState("");

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => {
                setError("File reading aborted.");
            };
            reader.onerror = () => {
                setError("File reading failed.");
            };
            reader.onload = () => {
                try {
                    const notebook = JSON.parse(reader.result);
                    props.onDrop(notebook);
                } catch (err) {
                    setError(err.message);
                }
            };

            reader.readAsText(file);
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <section>
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>
                    Drag &apos;n&apos; drop a Jupyter Notebook file here, or
                    click to select a file
                </p>
            </div>
            <div className="error">{error}</div>
        </section>
    );
}

export default Drop;
