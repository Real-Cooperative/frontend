import React, { useState, useRef, useEffect } from "react";
import "./JSONGUI.css";

const JsonGUI = (props) => {
    const index = props.index;
    const [label, setLabel] = useState(props.label);
    const [body, setBody] = useState("");
    const nextType = useRef("");
    const nextLabel = useRef("");
    const [children, setChildren] = useState([]);
    const [grandChildren, setGrandChildren] = useState([]);
    const [json, setJson] = useState(props.type === "array" ? [] : {});

    const handleGrandChildren = (children) => {
        setGrandChildren(children);
    };

    const handleDelete = (index) => {
        setChildren(children.filter((_, i) => i !== index));
    };

    const deleteHelper = () => {
        props.deleteFunction(index);
    };

    const generateJson = (b, i) => {
        console.log(b);
        if (props.type === "array") {
            json[i] = b[i];
            setJson([...json]);
        } else {
            json[i] = b[i];
            setJson({ ...json });
        }
    };

    useEffect(() => {
        if (json != undefined && !props.root) {
            let key = props.label || props.index;
            props.jsonDrill(json, key);
        }
    }, [json]);

    useEffect(() => {
        let key = props.label || props.index;
        if (props.type === "array") {
            json[key] = body;
            setJson([...json]);
        } else {
            json[key] = body;
            setJson({ ...json });
        }
    }, [body]);

    const handleClick = () => {
        if (
            props.type === "array" &&
            nextType.current.value === "object" &&
            children.length > 0
        ) {
            json[children.length] = json[0];
            setJson([...json]);
            setChildren([
                ...children,
                <JsonGUI
                    key={children.length}
                    index={children.length}
                    jsonDrill={generateJson}
                    deleteFunction={handleDelete}
                    gcf={handleGrandChildren}
                    type={nextType.current.value}
                    label={nextLabel.current.value || ""}
                    root={false}
                    grandChildren={grandChildren}></JsonGUI>,
            ]);
        } else {
            setChildren([
                ...children,
                <JsonGUI
                    key={children.length}
                    index={children.length}
                    jsonDrill={generateJson}
                    deleteFunction={handleDelete}
                    gcf={handleGrandChildren}
                    type={nextType.current.value}
                    label={nextLabel.current.value || ""}
                    root={false}></JsonGUI>,
            ]);
        }
    };

    useEffect(() => {
        if (!(props.root || props.index > 0)) {
            props.gcf(children);
        }
    }, [children]);

    return (
        <div
            key={`${props.label}-${props.index}`}
            className="json-gui-container">
            {props.root ? (
                <>
                    <label htmlFor="objectName">
                        Name:
                        <input
                            type={props.type}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            name="objectName"
                        />
                    </label>
                    <label htmlFor="objectType">
                        Type:
                        <input
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            type="text"
                            name="objectType"
                        />
                    </label>
                </>
            ) : null}
            {props.type !== "array" &&
            props.type !== "object" &&
            !props.root ? (
                <div>
                    <input
                        type="text"
                        placeholder="label"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        disabled={props.label ? true : false}
                    />
                    :
                    <input
                        type={props.type}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="value"
                    />
                    <button onClick={deleteHelper}>Delete</button>
                </div>
            ) : null}
            {props.type === "array" ? (
                <div>
                    <input
                        value={label}
                        disabled={props.label ? true : false}
                        type="text"
                        placeholder="label"
                        onChange={(e) => setLabel(e.target.value)}></input>
                    <button onClick={deleteHelper}>Delete</button>
                </div>
            ) : null}
            {props.grandChildren}
            {children}
            {props.type === "object" || props.type === "array" ? (
                <div className="json-gui-container--add">
                    <div
                        onClick={handleClick}
                        className="json-gui-container--btn plus"></div>
                    Add a{" "}
                    <select
                        disabled={
                            children.length > 0 && props.type === "array"
                                ? true
                                : false
                        }
                        ref={nextType}>
                        <option value="text">String</option>
                        <option value="number">Number</option>
                        <option value="checkbox">Boolean</option>
                        <option value="array">Array</option>
                        <option value="object">Object</option>
                        <option value="file">File</option>
                    </select>{" "}
                    to {props.label || props.type} labeled{" "}
                    <input type="text" ref={nextLabel} />
                </div>
            ) : null}
        </div>
    );
};

export default JsonGUI;
