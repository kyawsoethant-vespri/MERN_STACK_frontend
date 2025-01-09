import {useEffect, useState} from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import Pagination from "../../components/Pagination/Pagination";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "../../../src/helpers/baseUrl.js";

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [links, setLinks] = useState(null); //pagination links

    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search);
    const defaultPage = 1; // if page doesn't exit, default page value is 1
    const navigate = useNavigate();
    let page = searchQuery.get("page") || defaultPage;
    page = parseInt(page);

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await axios(
                `/api/recipes?page=${page}`
            );
            // console.log("Response Data for Home page >>", response);
            if (response.status === 200) {
                const data = await response.data;

                console.log("Home page data >>", data);

                setLinks(data.links);
                setRecipes(data.recipesData);
            }
        };
        fetchRecipes();

        //scroll to top
        window.scroll({top: 0, left: 0, behavior: "smooth"});
    }, [page]);

    //deleted recipes function
    const onDeleted = (id) => {
        if (recipes.length === 1 && page > 1) {
            navigate(`/?page=${page - 1}`);
        } else {
            setRecipes((prev) => prev.filter((pre) => pre._id !== id));
        }
    };

    return (
        <div className="space-y-3">
            {!!recipes.length &&
                recipes.map((recipe) => (
                    <RecipeCard recipe={recipe} key={recipe._id} onDeleted={onDeleted}/>
                ))}
            {!!links && <Pagination links={links} page={page}/>}
        </div>
    );
};

export default Home;
