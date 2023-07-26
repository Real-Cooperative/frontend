import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import RecipeList from "./RecipeList";
import Account from "./Account";

const Home = () => {
    const [userContext, setUserContext] = useContext(UserContext);
    return <>{userContext ? <RecipeList /> : <Account />}</>;
};

export default Home;
