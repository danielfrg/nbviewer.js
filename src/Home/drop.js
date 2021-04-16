import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Modal from "./modal";

function Drop(props) {
    const [showModal, setShowModal] = useState(0);

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

    const toggleModal = () => setShowModal(!showModal);

    const privacyModal = (
        <Modal title="Privacy" onCloseClick={toggleModal}>
            <p>
                Uploaded notebooks don't leave your computer, they are not
                stored anywhere. Everything is hold in the browser.
            </p>
            <p>
                Source for this app is available at{" "}
                <a href="https://github.com/danielfrg/nbviewer.js">
                    github.com/danielfrg/nbviewer.js
                </a>
                .
            </p>
        </Modal>
    );

    return (
        <section className="drop">
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>
                    Drag &apos;n&apos; drop a Jupyter Notebook file here, or
                    click to select a file
                </p>
            </div>
            <p className="text-center subtitle">
                <button onClick={toggleModal}>Privacy</button>
            </p>

            {showModal ? privacyModal : null}
        </section>
    );
}

export default Drop;
