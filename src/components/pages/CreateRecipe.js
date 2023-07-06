import React, {useState, useRef, useContext, useEffect, useCallback} from "react";
import "./CreateRecipe.css"
import { RecipeContext } from "../../context/recipeContext";
import Step from "../step";

const CreateRecipe = () => {
    const [recipeContext, setRecipeContext] =  useContext(RecipeContext)
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [stepKey, setStepKey] = useState(0);
    const [hashmap, setHashmap] = useState({});
    const [ingredientKey, setIngredientKey] = useState(0);
    const [attachmentPreview, setAttachmentPreview] = useState([]);
    const [recipeURL, setRecipeURL] = useState("");
    const attachmentRef = useRef(null);
    const attachmentPreviewRef = useRef(null);


    const getContext = useCallback(() => {
        setRecipeContext({...recipeContext, "steps": [], "ingredients": []})
    }, [recipeContext, steps, ingredients])

    useEffect(()=>{
        getContext()
    },[])

    const deleteIngredient = (key) => {   
        setIngredients(oldvalues => oldvalues.filter((_,i)=> _.key != key));
    }

    const ingredientHTML = (key) => {
        setHashmap({...hashmap, "ingredient": ["name","quantity","unit","type"]}) //make a hashmap of the keys for array of objects
        setIngredientKey(ingredientKey+1);
        return (
            <div className="object-array" key={key}>
                <div className="form-group">
                    <input required id={"ingredient-"+key} type="text" name={"ingredient-"+key} placeholder="eg. black eyed peas, onions, hammock"/>
                    <label htmlFor={"ingredient-"+key}>Name</label>
                </div>
                <div className="form-group">
                    <input required id={"quantity-"+key} min={0} type="number" name={"ingredient-"+key} placeholder="0"/>
                    <label htmlFor={"quantity-"+key}>Quantity</label>
                </div>
                <div className="form-group">
                    <input required id={"unit-"+key} type="text" name={"ingredient-"+key} placeholder="eg. lb, kg, pinch"/>
                    <label htmlFor={"unit-"+key}>Unit</label>
                </div>
                <div className="form-group">
                    <input id={"type-"+key} type="text" name={"ingredient-"+key} placeholder="eg. vegetable, dairy, meat"/>
                    <label htmlFor={"type-"+key}>Type</label>
                </div>
                <button type="button" onClick={()=>deleteIngredient(key)}>Delete</button>
            </div>
        )
    }


    const deleteStep = (key) => {
        setSteps(oldvalues => oldvalues.filter((_,i)=> i != key));
        setRecipeContext(oldValues => { return {...oldValues, "steps": oldValues.steps.filter((_,i)=> i != key)}})
    }



    const deleteAttachment = (key) => {
        setAttachmentPreview(oldvalues => oldvalues.filter((_,i)=> _.key != key));
        const dt = new DataTransfer();
        for (let i = 0; i < attachmentRef.current.files.length; i++) {
            if (i !== key) {
                dt.items.add(attachmentRef.current.files[i]);
            }
        }
        attachmentRef.current.files = dt.files;
    }

    const attachmentHTML = (key, b64) => {
        return (
            <div className="attachment" key={key}>
                <img height={150} src={b64} alt="attachment preview" />
                <button type="button" onClick={()=>deleteAttachment(key)}>Delete</button>
            </div>
        );
    }

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const uploadFiles = async (form) => {
        let attachment = {};
        let formData = new FormData();
        formData.append("attachment", form);
        await fetch(`${process.env.REACT_APP_MIDDLEWARE_URL}/upload`, {
            cache: "no-store",
            method: "POST",
            body: formData
        }).then((res)=>res.text()).then(data => attachment = {name: form.name, url: data});


        return attachment;
    }

    const handleDrag = (e) => {
        e.preventDefault();
        e.target.classList.add("dragging");
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.target.classList.remove("dragging");
    }

    const handleDrop = (e) => {
        e.preventDefault();
        let files = e.dataTransfer.files;
        attachmentRef.current.files = files;
        for (let i = 0; i < files.length; i++){
            getBase64(files[i]).then(b64 => {
                setAttachmentPreview(oldvalues => [...oldvalues, attachmentHTML(oldvalues.length, b64)]);
            });
        }
        e.target.classList.remove("dragging");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let form = e.target;
        let formData = new FormData(form);
        
        let data = {};
        for (let [key, value] of formData.entries()) {
            let array = formData.getAll(key);
            let objectKey = key.includes("-") ? key.split("-")[0] : null;
            let objectIndex = key.includes("-") ? key.split("-")[1] : null;
            if (array.length > 1 && objectKey == null) {
                if (typeof value == "object"){
                    data[key] = data[key] ? data[key] : [];
                    data[key] = [...data[key], await uploadFiles(value)];
                } else {
                    data[key] = array;
                }
            } else if (array.length > 1 && objectKey != null) {
                
                data[objectKey] = data[objectKey] ? data[objectKey] : [];
                let object = {};
                for (let i = 0; i < array.length; i++){
                    object[hashmap[objectKey][i]] = array[i];
                }
                data[objectKey][objectIndex] = object;
            } else if (typeof value == "object"){
                data[key] = data[key] ? data[key] : [];
                data[key] = [...data[key], await uploadFiles(value)];
            } else {
                data[key] = value;
            }
        }
        data["type"] = "recipe";
        
        submitRecipe(data);
    }

    const submitRecipe = async (form) => {

        let url = `${process.env.REACT_APP_MIDDLEWARE_URL}/post`;
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(form)
        });
        let data = await response.json();
        console.log(data);
        let newRecipeURL = `${process.env.REACT_APP_HOST_URL}/${data.id.replace(":","/")}`
        setRecipeURL(newRecipeURL);
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-header">
                    <div className="form-header--col">
                        <label htmlFor="name">Name</label>
                        <input required id="name" type="text" name="name" />
                        <label htmlFor="description">Description</label>
                        <textarea rows={4} id="description" type="text" name="description" />
                    </div>
                    <div className="form-header--col">
                        <div onDragLeave={handleDragLeave} onDragOver={handleDrag} onDrop={handleDrop} className="drag-drop">
                            Drag and drop one or more files in this zone
                        </div>
                        <div ref={attachmentPreviewRef} className="attachment-preview">{attachmentPreview}</div>
                        <input ref={attachmentRef} id="attachments" type="file" name="attachments" multiple hidden/>
                    </div>
                </div>
                <label>Ingredients</label>
                {ingredients}
                <button type="button" onClick={()=>setIngredients([...ingredients, ingredientHTML(ingredientKey)])}>Add Ingredient</button>
                <label>Steps</label>
                {steps}
                <button type="button" onClick={()=>setSteps([...steps, <Step deleteStep={deleteStep} setStepKey={setStepKey} index={stepKey} key={stepKey} />])}>Add Step</button>
                <button type="submit">Submit</button>
            </form>
            <a href={recipeURL}><p>view your recipe</p></a>
        </div>
    )
}

export default CreateRecipe;

// {
//     "name": "Black Eyed Peas",
//     "type": "recipe",
//     "ingredients": [
//         {
//             "name": "Black Eyed Peas",
//             "quantity": 1,
//             "unit": "bunch",
//             "type": "plant"
//         },
//         {
//             "name": "Hammock",
//             "quantity": 1,
//             "unit": "kg",
//             "type": "meat"
//         },
//         {
//             "name": "Chicken Stock",
//             "quantity": 1,
//             "unit": "cup",
//             "type": "recipe"
//         },
//         {
//             "name": "Salt",
//             "quantity": 1,
//             "unit": "tsp",
//             "type": "other"
//         },
//         {
//             "name": "Pepper",
//             "quantity": 1,
//             "unit": "tsp",
//             "type": "plant"
//         },
//         {
//             "name": "Garlic",
//             "quantity": 1,
//             "unit": "clove",
//             "type": "plant"
//         },
//         {
//             "name": "Onion",
//             "quantity": 2,
//             "unit": "whole",
//             "type": "plant"
//         }
//     ],
//     "steps": [
//         {
//             "description": "Boil Hammock"
//         },
//         {
//             "description": "Add Onions"
//         },
//         {
//             "description": "Add Black Eyed Peas"
//         }
//     ],
//     "attachments": [
//         {
//             "name": "Black Eyed Peas.png",
//             "data": "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII"
//         }
//     ]
// }