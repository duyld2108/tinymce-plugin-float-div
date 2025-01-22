let opener;
tinymce.PluginManager.add("multiimage", function (editor, url) {
    editor.ui.registry.addButton("multiimage", {
        icon: "multi-image",
        tooltip: "Insert Multi-Images",
        onAction: function () {
            opener = editor.windowManager.openUrl({
                title: "Select Images",
                url: "/laravel-filemanager?type=image&multiple=true&callback=insertMultiImages",
            });
        },
    });
});

function insertMultiImages(items) {
    let content = "";
    items.forEach(function (item) {
        content += `<p><img src="${item.url}" alt="${item.name}"></p>`;
    });
    tinymce.activeEditor.insertContent(content);
    opener.close();
}
