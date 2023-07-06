import React, { useState } from "react";

const RecipeContext = React.createContext([{}, () => {}]);

let initialState = {};

const RecipeProvider = (props) => {
    const [state, setState] = useState(initialState);

    return (
        <RecipeContext.Provider value={[state, setState]}>
            {props.children}
        </RecipeContext.Provider>
    );
};

export { RecipeContext, RecipeProvider };
