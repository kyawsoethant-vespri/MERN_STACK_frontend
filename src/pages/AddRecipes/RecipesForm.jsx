import styles from "./styles.module.css";
import Plus from "../../assets/plus_icon.svg";
import Ingredients from "../../components/Ingredients/ingredients";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecipesForm = () => {
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const addIngredient = () => {
    setIngredients((prev) => [newIngredient, ...prev]);
    setNewIngredient("");
  };

  //Toast success message function
  const showToastSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  //Toast error message function
  const showToastError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };

  const createRecipe = async (e) => {
    try {
      e.preventDefault();
      const recipes = { title, description, ingredients };
      console.log("Data", recipes);

      const response = await axios.post(
        "http://localhost:8000/api/recipes/insert",
        recipes
      );
      if (response.status === 200) {
        showToastSuccess("Created recipe successfully.");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (e) {
      setErrors(Object.keys(e.response.data.errors));
      if (errors) {
        showToastError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />

      <h1 className={styles.title}>Recipes Create Form</h1>

      <form action="" className="space-y-5" onSubmit={createRecipe}>
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
          <Ingredients ingredients={ingredients} />
        </div>

        <button type="submit" className={styles.button}>
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipesForm;
