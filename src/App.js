import React, { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar";
import { Home, Recipe, RecipeList, CreateRecipe } from "./components/pages";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipe/:id" element={<Recipe />} />
                <Route path="/recipe" element={<RecipeList />} />
                <Route path="/create-recipe" element={<CreateRecipe />} />
            </Routes>
        </Router>
    );
};

export default App;

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
