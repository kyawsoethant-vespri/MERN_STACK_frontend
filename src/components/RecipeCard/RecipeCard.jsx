import Ingredients from "../Ingredients/ingredients";
import styles from "./styles.module.css";

const RecipeCard = ({ recipe }) => {
  //Transform DateFormat Function
  const dateFormat = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white p-5 rounded-2xl space-y-3">
      <h3 className={styles.title}>{recipe.title}</h3>

      <p>Description</p>
      <p>{recipe.description}</p>

      <Ingredients ingredients={recipe.ingredients} />

      <p className={styles.publishTimeText}>
        Published at - {dateFormat(recipe.createdAt)}
      </p>
    </div>
  );
};

export default RecipeCard;
