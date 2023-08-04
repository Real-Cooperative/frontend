import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import RecipeList from "./RecipeList";
import Account from "./Account";
import Loading from "../Loading";

const Home = () => {
    const [userContext, setUserContext] = useContext(UserContext);
    return (
        <>
            {userContext !== false ? (
                userContext ? (
                    <RecipeList />
                ) : (
                    <Account />
                )
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Home;
