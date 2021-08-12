import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Drop from "./drop";

const useStyles = makeStyles((theme) => ({
    inputs: {
        margin: "15px auto",
        maxWidth: 300,
    },
    formHorizontal: {
        display: "flex",
        flexDirection: "row",
    },
    button: {
        width: "100%",
        margin: "1px 10px",
    },
}));

export default function URLForm({ onUpload, onSubmit }) {
    const classes = useStyles();
    const [url, setURL] = React.useState("");
    const [type, setType] = React.useState("flex");
    const [error, setError] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const handleUrlChange = (event) => {
        setURL(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleUpload = (notebook) => {
        console.log("Loaded notebook:");
        console.log(notebook);
        onUpload(notebook, type);
    };

    const handleSubmit = (event) => {
        if (!url) {
            return;
        }

        try {
            onSubmit(url, type);
        } catch (err) {
            console.error(err);
            this.setError(err.message);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="url-form">
            <p className="text-center">
                Upload a file or paste an URL to render it:
            </p>
            <FormControl fullWidth variant="outlined">
                <TextField
                    id="url"
                    label="URL"
                    variant="outlined"
                    value={url}
                    onChange={handleUrlChange}
                />
            </FormControl>
            <Drop onDrop={handleUpload} onError={setError} />
            <div className={classes.inputs}>
                <FormControl
                    className={classes.formHorizontal}
                    variant="outlined"
                >
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        onChange={handleTypeChange}
                    >
                        <MenuItem value="notebook">Notebook</MenuItem>
                        <MenuItem value="flex">Flex Dashboard</MenuItem>
                    </Select>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleSubmit}
                    >
                        Go
                    </Button>
                </FormControl>
                <p className="text-center privacy">
                    <button onClick={handleClickOpen}>Privacy</button>
                </p>
            </div>

            <div className="error">{error}</div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    NBViewer.js Privacy
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p>
                            Uploaded notebooks don't leave your computer, they
                            are not stored anywhere. Everything is hold in the
                            browser.
                        </p>
                        <p>
                            Source for this app is available at{" "}
                            <a href="https://github.com/danielfrg/nbviewer.js">
                                github.com/danielfrg/nbviewer.js
                            </a>
                            .
                        </p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
