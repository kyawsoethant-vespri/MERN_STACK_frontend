import { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const responseData = await fetch("http://localhost:8000/api/recipes");
      if (responseData.ok) {
        const data = await responseData.json();
        setRecipes(data);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="space-y-3">
      {!!recipes.length &&
        recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe._id} />
        ))}
    </div>
  );
};

export default Home;
