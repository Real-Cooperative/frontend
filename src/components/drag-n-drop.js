import React, { useRef, useState } from "react";

const DragNDrop = () => {
    const [attachmentPreview, setAttachmentPreview] = useState([]);
    const attachmentRef = useRef(null);
    const attachmentPreviewRef = useRef(null);

    function handleDrag(e) {
        e.preventDefault();
        e.target.classList.add("dragging");
    }

    function handleDragLeave(e) {
        e.preventDefault();
        e.target.classList.remove("dragging");
    }

    function handleDrop(e) {
        e.preventDefault();
        let files = e.dataTransfer.files;
        attachmentRef.current.files = files;
        for (let i = 0; i < files.length; i++) {
            getBase64(files[i]).then((b64) => {
                setAttachmentPreview((oldvalues) => [
                    ...oldvalues,
                    attachmentHTML(oldvalues.length, b64),
                ]);
            });
        }
        e.target.classList.remove("dragging");
    }

    function deleteAttachment(key) {
        setAttachmentPreview((oldvalues) =>
            oldvalues.filter((_, i) => _.key != key)
        );
        const dt = new DataTransfer();
        for (let i = 0; i < attachmentRef.current.files.length; i++) {
            if (i !== key) {
                dt.items.add(attachmentRef.current.files[i]);
            }
        }
        attachmentRef.current.files = dt.files;
    }

    function attachmentHTML(key, b64) {
        return (
            <div className="attachment" key={key}>
                <img height={150} src={b64} alt="attachment preview" />
                <button
                    className="delete-button"
                    type="button"
                    onClick={() => deleteAttachment(key)}>
                    X
                </button>
            </div>
        );
    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    return (
        <div className="form-header--col">
            <div
                onDragLeave={handleDragLeave}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className="drag-drop">
                Drag and drop one or more files in this zone
            </div>
            <div ref={attachmentPreviewRef} className="attachment-preview">
                {attachmentPreview}
            </div>
            <input
                ref={attachmentRef}
                id="attachments"
                type="file"
                name="attachments"
                multiple
                hidden
            />
        </div>
    );
};

export default DragNDrop;
