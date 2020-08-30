import React from "react";

export const NotebookContext = React.createContext({
    widgetManager: null,
});

export const Provider = NotebookContext.Provider;
export const Consumer = NotebookContext.Consumer;
