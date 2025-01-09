import React, {useState} from "react";
import axios from "../../helpers/baseUrl.js";
import Ingredients from "../Ingredients/ingredients";
import ToastSuccess from "../../utils/Toast/ToastSuccess";
import ToastError from "../../utils/Toast/ToastError";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.css";
import ConfirmationModalPopup from "../ComfirmationModalPopup/ConfirmationModalPopup";
import {Link} from "react-router-dom";

const RecipeCard = ({recipe, onDeleted}) => {
    const [showModal, setShowModal] = useState(false);

    const dateFormat = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "2-digit",
            year: "numeric",
        });
    };

    const deleteRecipe = async () => {
        try {
            const response = await axios.delete(
                `/api/recipes/${recipe._id}`
            );
            if (response.status === 200) {
                onDeleted(recipe._id);
                ToastSuccess(`Recipe deleted successfully`);
            } else {
                ToastError("Failed to delete the recipe. Please try again.");
            }
        } catch (error) {
            ToastError("An error occurred while deleting the recipe.");
        }
    };

    const handleDelete = () => {
        setShowModal(true); // Show the confirmation modal
    };

    const confirmDelete = () => {
        setShowModal(false);
        deleteRecipe(); // Call the delete function if confirmed
    };

    const cancelDelete = () => {
        setShowModal(false); // Hide the modal if canceled
    };

    return (
        <div className={styles.container}>
            <ToastContainer/>
            <div className={styles.titleBtnContainer}>
                <h3 className={styles.title}>{recipe.title}</h3>
                <div className={styles.btnContainer}>
                    <button className={styles.editBtn}>
                        <Link to={`/recipes/edit/${recipe._id}`}>Edit</Link>
                    </button>

                    <button className={styles.deleteBtn} onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>

            <p className={styles.description}>Description</p>
            <p>{recipe.description}</p>

            <Ingredients ingredients={recipe.ingredients}/>

            <p className={styles.publishDateTime}>
                Published at - {dateFormat(recipe.createdAt)}
            </p>

            {showModal && (
                <ConfirmationModalPopup
                    message="Are you sure you want to delete this recipe?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
};

export default RecipeCard;
