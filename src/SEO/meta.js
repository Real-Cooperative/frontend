function setMetaTitle(title) {
    document.title = title;
    document.querySelector("title").innerHTML = title;
}

function setMetaDescription(description) {
    document
        .querySelector('meta[name="description"]')
        .setAttribute("content", description);
}

function setMetaImage(image) {
    document
        .querySelector('meta[property="og:image"]')
        .setAttribute("content", image);
}

export { setMetaTitle, setMetaDescription, setMetaImage };
