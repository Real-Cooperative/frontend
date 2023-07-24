import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css";
import { RecipeProvider } from "./context/recipeContext";
import { UserProvider } from "./context/userContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <UserProvider>
        <RecipeProvider>
            <App />
        </RecipeProvider>
    </UserProvider>
);
