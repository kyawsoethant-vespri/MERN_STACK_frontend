import { useEffect, useState } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Pagination from "../../components/Pagination/Pagination";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search);
  const page = searchQuery.get("page");

  useEffect(() => {
    const fetchRecipes = async () => {
      const responseData = await fetch(
        "http://localhost:8000/api/recipes?page=" + page
      );
      if (responseData.ok) {
        const data = await responseData.json();
        setRecipes(data);
      }
    };
    fetchRecipes();
  }, [page]);

  return (
    <div className="space-y-3">
      {!!recipes.length &&
        recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe._id} />
        ))}
      <Pagination />
    </div>
  );
};

export default Home;
