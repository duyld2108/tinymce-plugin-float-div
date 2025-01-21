tinymce.PluginManager.add("custombox", function (editor, url) {
    // Hàm mở cửa sổ chỉnh sửa
    function openCustomBoxDialog(existingData = {}) {
        console.log("existingData", existingData);
        editor.windowManager.open({
            title: existingData.isEdit
                ? "Edit Custom Box"
                : "Insert Custom Box",
            body: {
                type: "tabpanel",
                tabs: [
                    {
                        name: "general",
                        title: "General",
                        items: [
                            {
                                type: "colorinput",
                                name: "backgroundColor",
                                label: "Background Color",
                            },
                            {
                                type: "colorinput",
                                name: "borderColor",
                                label: "Border Color",
                            },
                            {
                                type: "input",
                                name: "borderWidth",
                                label: "Border Width (px)",
                                inputMode: "numeric",
                            },
                            {
                                type: "input",
                                name: "width",
                                label: "Box Width (%, px)",
                                placeholder: "e.g., 100% or 300px",
                            },
                            {
                                type: "listbox",
                                name: "floatPosition",
                                label: "Float Position",
                                items: [
                                    { text: "None", value: "none" },
                                    { text: "Left", value: "left" },
                                    { text: "Right", value: "right" },
                                    { text: "Right", value: "right" },
                                ],
                            },
                        ],
                    },
                    {
                        name: "advanced",
                        title: "Advanced",
                        items: [
                            {
                                type: "grid",
                                columns: 2,
                                items: [
                                    {
                                        type: "input",
                                        name: "paddingTop",
                                        label: "Padding Top (px)",
                                        inputMode: "numeric",
                                    },
                                    {
                                        type: "input",
                                        name: "paddingBottom",
                                        label: "Padding Bottom (px)",
                                        inputMode: "numeric",
                                    },
                                    {
                                        type: "input",
                                        name: "paddingLeft",
                                        label: "Padding Left (px)",
                                        inputMode: "numeric",
                                    },
                                    {
                                        type: "input",
                                        name: "paddingRight",
                                        label: "Padding Right (px)",
                                        inputMode: "numeric",
                                    },
                                ],
                            },
                            {
                                type: "grid",
                                columns: 2,
                                label: "Margin (px)",
                                items: [
                                    {
                                        type: "input",
                                        name: "marginTop",
                                        label: "Margin Top (px)",
                                        inputMode: "numeric",
                                    },
                                    {
                                        type: "input",
                                        name: "marginBottom",
                                        label: "Margin Bottom (px)",
                                        inputMode: "numeric",
                                    },
                                    {
                                        type: "input",
                                        name: "marginLeft",
                                        label: "Margin Left (px)",
                                        inputMode: "numeric",
                                    },
                                    {
                                        type: "input",
                                        name: "marginRight",
                                        label: "Margin Right (px)",
                                        inputMode: "numeric",
                                    },
                                ],
                            },
                            {
                                type: "input",
                                name: "fontSize",
                                label: "Font Size (px)",
                                inputMode: "numeric",
                            },
                        ],
                    },
                ],
            },
            buttons: [
                { type: "cancel", text: "Cancel" },
                {
                    type: "submit",
                    text: existingData.isEdit ? "Update" : "Insert",
                    primary: true,
                },
            ],
            initialData: {
                backgroundColor:
                    existingData.backgroundColor?.toString() || "#7E8C8D",
                borderColor: existingData.borderColor?.toString() || "#2D2D2D",
                borderWidth: existingData.borderWidth?.toString() || "2",
                paddingTop: existingData.paddingTop?.toString() || "10",
                paddingBottom: existingData.paddingBottom?.toString() || "10",
                paddingLeft: existingData.paddingLeft?.toString() || "10",
                paddingRight: existingData.paddingRight?.toString() || "10",
                marginTop: existingData.marginTop?.toString() || "10",
                marginBottom: existingData.marginBottom?.toString() || "10",
                marginLeft: existingData.marginLeft?.toString() || "10",
                marginRight: existingData.marginRight?.toString() || "10",
                width: existingData.width?.toString() || "auto",
                fontSize: existingData.fontSize?.toString() || "14",
            },
            onSubmit: function (api) {
                const data = api.getData();
                console.log(data);
                const content = existingData.element
                    ? existingData.element.innerHTML.replace(
                          '<br data-mce-bogus="1">',
                          ""
                      )
                    : null;

                // Tạo hoặc chỉnh sửa HTML cho khung tùy chỉnh
                const customDiv = `<div style="background-color: ${data.backgroundColor};`+
                        `border: ${data.borderWidth}px solid ${data.borderColor};`+
                        `float: ${data.floatPosition};`+
                        `padding-top: ${data.paddingTop}px;`+
                        `padding-right: ${data.paddingRight}px;`+
                        `padding-bottom: ${data.paddingBottom}px;`+
                        `padding-left: ${data.paddingLeft}px;`+
                        `margin-top: ${data.marginTop}px;`+
                        `margin-right: ${data.marginRight}px;`+
                        `margin-bottom: ${data.marginBottom}px;`+
                        `margin-left:${data.marginLeft}px;`+
                        `width: ${data.width};`+
                        `font-size: ${data.fontSize}px;"`+
                    `class="custom-box">`+
                    `${content || "Your content here ..."}`+
                    `</div>`;
                console.log("customDiv", customDiv);

                if (existingData.isEdit) {
                    console.log("1");
                    editor.dom.setOuterHTML(existingData.element, customDiv);
                } else {
                    console.log("2");
                    editor.insertContent(customDiv);
                }

                api.close();
            },
        });
    }

    function colorToHex(color) {
        if (color.substr(0, 1) === "#") {
            return color;
        }
        var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

        var red = parseInt(digits[2]);
        var green = parseInt(digits[3]);
        var blue = parseInt(digits[4]);

        var rgb = blue | (green << 8) | (red << 16);
        return digits[1] + "#" + rgb.toString(16);
    }

    // Thêm nút vào toolbar
    editor.ui.registry.addButton("custombox", {
        icon: "custom-box",
        tooltip: "Insert or Edit Box",
        onAction: function () {
            const selectedNode = editor.selection.getNode();
            console.log("selectedNode", selectedNode);
            const isCustomBox =
                selectedNode &&
                selectedNode.tagName === "DIV" &&
                selectedNode.className === "custom-box";
            if (isCustomBox) {
                openCustomBoxDialog({
                    isEdit: true,
                    element: selectedNode,
                    backgroundColor: selectedNode.style.backgroundColor
                        ? colorToHex(selectedNode.style.backgroundColor)
                        : "#7E8C8D",
                    borderColor: selectedNode.style.borderColor
                        ? colorToHex(selectedNode.style.borderColor)
                        : "#2D2D2D",
                    borderWidth:
                        parseInt(selectedNode.style.borderWidth, 10) || 2,
                    paddingTop:
                        parseInt(selectedNode.style.paddingTop, 10) || 10,
                    paddingBottom:
                        parseInt(selectedNode.style.paddingBottom, 10) || 10,
                    paddingLeft:
                        parseInt(selectedNode.style.paddingLeft, 10) || 10,
                    paddingRight:
                        parseInt(selectedNode.style.paddingRight, 10) || 10,
                    marginTop: parseInt(selectedNode.style.marginTop, 10) || 10,
                    marginbottom:
                        parseInt(selectedNode.style.marginbottom, 10) || 10,
                    marginLeft:
                        parseInt(selectedNode.style.marginLeft, 10) || 10,
                    marginRight:
                        parseInt(selectedNode.style.marginRight, 10) || 10,
                    width: selectedNode.style.width || "auto",
                    floatPosition: selectedNode.style.float || "none",
                    fontSize: parseInt(selectedNode.style.fontSize, 10) || 14,
                });
            } else {
                openCustomBoxDialog({
                    element: selectedNode,
                });
            }
        },
    });

    return {
        getMetadata: function () {
            return {
                name: "Custom Box Plugin",
                url: "https://github.com/duyld2108/tinymce-plugin-float-div",
            };
        },
    };
});
