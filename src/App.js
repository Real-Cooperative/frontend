import React, { Suspense, lazy } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar";
import { Home, Recipe, RecipeList, CreateRecipe } from "./components/pages";
const Account = lazy(() => import("./components/pages/Account"));
const UserDetails = lazy(() => import("./components/pages/UserDetails"));
const Ingredient = lazy(() => import("./components/pages/IngredientPage"));
const ResetPassword = lazy(() => import("./components/pages/ResetPassword"));
import Loading from "./components/Loading";
import EditDetails from "./components/EditDetails";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Home />{" "}
                        </Suspense>
                    }
                />
                <Route
                    path="/recipe/:id"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Recipe />
                        </Suspense>
                    }
                />
                <Route
                    path="/recipe"
                    element={
                        <Suspense fallback={<Loading />}>
                            <RecipeList />
                        </Suspense>
                    }
                />
                <Route
                    path="/create-recipe"
                    element={
                        <Suspense fallback={<Loading />}>
                            <CreateRecipe />
                        </Suspense>
                    }
                />
                <Route
                    path="/account"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Account />
                        </Suspense>
                    }
                />
                <Route
                    path="/account/edit"
                    element={
                        <Suspense fallback={<Loading />}>
                            <EditDetails />
                        </Suspense>
                    }
                />
                <Route
                    path="/forgot"
                    element={
                        <Suspense fallback={<Loading />}>
                            <ResetPassword />
                        </Suspense>
                    }
                />
                <Route
                    path="/user/:user"
                    element={
                        <Suspense fallback={<Loading />}>
                            <UserDetails />
                        </Suspense>
                    }
                />
                <Route
                    path="/:type/:name"
                    element={
                        <Suspense fallback={<Loading />}>
                            <Ingredient />
                        </Suspense>
                    }
                />
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
