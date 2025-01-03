import styles from "./styles.module.css";
import Plus from "../../assets/plus_icon.svg";
import Ingredients from "../../components/Ingredients/ingredients";
import ToastSuccess from "../../utils/Toast/ToastSuccess";
import ToastError from "../../utils/Toast/ToastError";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecipesForm = () => {
    const [newIngredient, setNewIngredient] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    const {id} = useParams();

    const addIngredient = () => {
        setIngredients((prev) => [newIngredient, ...prev]);
        setNewIngredient("");
    };

    //Create and Update
    const createRecipe = (e) => handleRecipeSubmit(e, "create");
    const updateRecipe = (e) => handleRecipeSubmit(e, "update", id);

    const handleRecipeSubmit = async (e, action, recipeId) => {
        try {
            e.preventDefault();
            const recipes = {title, description, ingredients};

            const url =
                action === "create"
                    ? "http://localhost:8000/api/recipes/insert"
                    : `http://localhost:8000/api/recipes/${recipeId}`;

            const method = action === "create" ? axios.post : axios.patch;

            const response = await method(url, recipes);

            if (response.status === 200) {
                const successMessage =
                    action === "create"
                        ? "Created recipe successfully."
                        : "Updated recipe successfully.";

                ToastSuccess(successMessage);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
        } catch (e) {
            setErrors(Object.keys(e.response.data.errors));
            if (errors) {
                ToastError("Something went wrong. Please try again.");
            }
        }
    };

    //Edit fetching
    useEffect(() => {
        const editFetchRecipe = async () => {
            if (id) {
                const response = await axios.get(
                    `http://localhost:8000/api/recipes/${id}`
                );
                if (response.status === 200) {
                    setTitle(response.data.title);
                    setDescription(response.data.description);
                    setIngredients(response.data.ingredients);
                }
            }
        };
        editFetchRecipe();
        //Clear data on clean up
        setTitle("");
        setDescription("");
        setIngredients("");
    }, [id]);

    return (
        <div className={styles.container}>
            <ToastContainer/>

            <h1 className={styles.title}>Recipes {id ? "Edit" : "Create"} Form</h1>

            <form
                action=""
                className="space-y-5"
                onSubmit={id ? updateRecipe : createRecipe}
            >
                <input
                    type="text"
                    placeholder="Recipe Title"
                    className={styles.inputField}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Recipe Description"
                    rows={5}
                    className={styles.inputField}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="Recipe Ingedirents"
                        className={styles.inputField}
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                    />
                    <img
                        src={Plus}
                        alt=""
                        className={styles.icon}
                        onClick={addIngredient}
                    />
                </div>

                <div>
                    <Ingredients ingredients={ingredients}/>
                </div>

                <button type="submit" className={styles.button}>
                    {id ? "Update " : "Create "}Recipe
                </button>
            </form>
        </div>
    );
};

export default RecipesForm;
