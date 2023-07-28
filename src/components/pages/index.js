import { lazy } from "react";
const CreateRecipe = lazy(() => import("./CreateRecipe"));
const Recipe = lazy(() => import("./Recipe"));
const RecipeList = lazy(() => import("./RecipeList"));
const Home = lazy(() => import("./Home"));

export { CreateRecipe, Recipe, RecipeList, Home };
