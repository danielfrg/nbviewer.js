import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Drop(props) {
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => {
                props.onError("File reading aborted.");
            };
            reader.onerror = () => {
                props.onError("File reading failed.");
            };
            reader.onload = () => {
                try {
                    const notebook = JSON.parse(reader.result);
                    props.onDrop(notebook);
                } catch (err) {
                    props.onError(err.message);
                }
            };

            reader.readAsText(file);
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <section className="drop">
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>
                    Drag &apos;n&apos; drop a Jupyter Notebook file here, or
                    click to select a file
                </p>
            </div>
        </section>
    );
}

export default Drop;
