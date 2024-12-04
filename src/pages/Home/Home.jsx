import {useEffect, useState} from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Pagination from "../../components/Pagination/Pagination";
import {useLocation} from "react-router-dom";

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [links, setLinks] = useState(null); //pagination links

    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search);
    const defaultPage = 1; // if page doesn't exit, default page value is 1
    let page = searchQuery.get("page") || defaultPage;
    page = parseInt(page);

    useEffect(() => {
        const fetchRecipes = async () => {
            const responseData = await fetch(
                `http://localhost:8000/api/recipes?page=${page}`
            );
            if (responseData.ok) {
                const data = await responseData.json();

                console.log(data);

                setLinks(data.links);
                setRecipes(data.recipesData);
            }
        };
        fetchRecipes();

        //scroll to top
        window.scroll({top: 0, left: 0, behavior: "smooth"});
    }, [page]);

    return (
        <div className="space-y-3">
            {!!recipes.length &&
                recipes.map((recipe) => (
                    <RecipeCard recipe={recipe} key={recipe._id}/>
                ))}
            {!!links && <Pagination links={links} page={page}/>}
        </div>
    );
};

export default Home;
