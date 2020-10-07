var _ = require("lodash");

function notebook2dashboard(notebook) {
    // console.log(notebook);
    let dashboard = { meta: [], pages: [] };
    let current_page = {};
    let current_section = {};
    let current_card = {};

    const empty_page = { title: "", sections: [], tags: [] };
    const empty_section = { title: "", cards: [], tags: [] };
    const empty_card = {
        title: "",
        tags: [],
        body: [],
        footer: [],
        help: [],
        source: [],
    };

    notebook.cells.forEach((cell) => {
        let cell_type = cell.cell_type;
        let cell_source = cell.source;
        let cell_tags = cell.metadata.tags || [];

        if (cell_tags && cell_tags.includes("parameters")) {
            dashboard["props"] = getProps(cell, notebook.metadata);
        }

        if (cell_type == "markdown") {
            const is_body = cell_tags.includes("body");
            const is_help = cell_tags.includes("help");
            const is_footer = cell_tags.includes("footer");

            // Tagged cells have priority over layout headers
            if (is_body || is_help || is_footer) {
                // Check if current_* objects are created
                // Used when the notebook starts with tagged cell
                if (_.isEmpty(current_page)) {
                    current_page = _.cloneDeep(empty_page);
                }
                if (_.isEmpty(current_section)) {
                    current_section = _.cloneDeep(empty_section);
                }
                if (_.isEmpty(current_card)) {
                    current_card = _.cloneDeep(empty_card);
                }
            }

            if (is_body) {
                current_card.body.push(cell);
                return;
            } else if (is_help) {
                current_card.help.push(cell);
                return;
            } else if (is_footer) {
                current_card.footer.push(cell);
                return;
            }

            let h1_title = startsWithAndRemovePrefix(cell_source[0], "#");
            let h2_title = startsWithAndRemovePrefix(cell_source[0], "##");
            let h3_title = startsWithAndRemovePrefix(cell_source[0], "###");
            if (h3_title) {
                // Define a new card

                // Check for when the notebook starts with h3 -> create first page and section
                if (_.isEmpty(current_page)) {
                    current_page = _.cloneDeep(empty_page);
                }
                if (_.isEmpty(current_section)) {
                    current_section = _.cloneDeep(empty_section);
                }

                // Add current card to current section
                if (!_.isEmpty(current_card)) {
                    current_section.cards.push(current_card);
                }

                // Create new card with values from this cell
                current_card = _.defaults(
                    { title: h3_title, tags: cell_tags },
                    _.cloneDeep(empty_card)
                );
            } else if (h2_title) {
                // Define a new section

                // Check for when the notebook starts with h2 -> create first page
                if (_.isEmpty(current_page)) {
                    current_page = _.cloneDeep(empty_page);
                }

                // Add current card to current section
                if (!_.isEmpty(current_card)) {
                    current_section.cards.push(current_card);
                }

                // Add current section to current page
                if (!_.isEmpty(current_section)) {
                    current_page.sections.push(current_section);
                }

                // Create new section: Define new current_* objects
                current_section = _.defaults(
                    { title: h2_title, tags: cell_tags },
                    _.cloneDeep(empty_section)
                );
                current_card = {};
            } else if (h1_title) {
                // Define a new page

                // Add current card to current section
                if (!_.isEmpty(current_card)) {
                    current_section.cards.push(current_card);
                }

                // Add current section to current page
                if (!_.isEmpty(current_section)) {
                    current_page.sections.push(current_section);
                }

                // Add current page to dashboard
                if (!_.isEmpty(current_page)) {
                    dashboard.pages.push(current_page);
                }

                // Create new Page: Define all new current_* objects
                current_page = _.defaults(
                    { title: h1_title, tags: cell_tags },
                    _.cloneDeep(empty_page)
                );
                current_section = {};
                current_card = {};
            }
        } else if (cell_type == "code") {
            const is_body = cell_tags.includes("body");
            const is_help = cell_tags.includes("help");
            const is_footer = cell_tags.includes("footer");
            const is_meta = cell_tags.includes("meta");
            const is_source = cell_tags.includes("source");

            if (is_body || is_help || is_footer || is_meta || is_source) {
                // Check if current_* objects are created
                // Used when the notebook starts with tagged cell
                if (_.isEmpty(current_page)) {
                    current_page = _.cloneDeep(empty_page);
                }
                if (_.isEmpty(current_section)) {
                    current_section = _.cloneDeep(empty_section);
                }
                if (_.isEmpty(current_card)) {
                    current_card = _.cloneDeep(empty_card);
                }
            }

            if (is_body) {
                current_card.body.push(cell);
            } else if (is_footer) {
                current_card.footer.push(cell);
            } else if (is_meta) {
                dashboard.meta.push(cell);
            } else if (is_help) {
                current_card.help.push(cell);
            } else if (is_source) {
                // TODO Check this actually works
                cell.outputs = null;
                current_card.body.push(cell);
            }
        }
    });

    // End of the notebook: Add final components to the parents
    if (!_.isEmpty(current_card) && !_.isEmpty(current_section)) {
        current_section.cards.push(current_card);
    }
    if (!_.isEmpty(current_section) && !_.isEmpty(current_page)) {
        current_page.sections.push(current_section);
    }
    if (!_.isEmpty(current_page)) {
        dashboard.pages.push(current_page);
    }

    // console.log(dashboard);
    return dashboard;
}

function getProps(cell, metadata) {
    let props = {
        title: metadata.title,
        include_source: true,
    };

    const lines = cell.source;
    lines.forEach((line) => {
        line = line.trim();
        if (line) {
            const prefix = "flex_";
            if (line.startsWith(prefix)) {
                const parts = line.split("=");
                if (parts.length >= 2) {
                    const key = parts[0]
                        .substring(prefix.length, parts[0].length)
                        .trim();
                    let value = parts.slice(1, parts.length).join("=");
                    props[key] = trim(value.trim(), '"');
                }
            }
        }
    });

    return props;
}

function startsWithAndRemovePrefix(string, prefix) {
    if (string.startsWith(prefix)) {
        return string.substring(prefix.length, string.length).trim();
    }
    return null;
}

function trim(s, c) {
    // A more general trim function
    if (c === "]") c = "\\]";
    if (c === "\\") c = "\\\\";
    return s.replace(new RegExp("^[" + c + "]+|[" + c + "]+$", "g"), "");
}

export default notebook2dashboard;
