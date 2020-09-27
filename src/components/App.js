import React, { useEffect, useState } from "react";
import Recipes from "./Recipes";

const App = () => {
  const APP_ID = "13014924";
  const APP_KEY = "bbd57a8012c2e7825b3d58290ad352a8";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipe();
  }, [query]);

  const getRecipe = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    //console.log(data.hits);
  };

  const updateSearch = (event) => {
    setSearch(event.target.value);
    //console.log(search);
  };

  const getSearch = (event) => {
    event.preventDefault();
    setQuery(search);
  };

  return (
    <div className="ui container" style={{ marginTop: "10px" }}>
      <div>
        <div className="ui segment">
          <form onSubmit={getSearch} className="ui form">
            <div className="field">
              <label>Search</label>
              <input value={search} onChange={updateSearch} type="text" />
            </div>
          </form>
        </div>
      </div>

      <div>
        {recipes.map((recipe) => (
          <Recipes
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
