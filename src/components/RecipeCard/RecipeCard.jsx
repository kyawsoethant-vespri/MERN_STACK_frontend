import Styles from "./styles.module.css";

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
      <h3 className={Styles.title}>{recipe.title}</h3>

      <p>Description</p>
      <p>{recipe.description}</p>

      <div className="space-x-2">
        <span>Ingredients -</span>
        {recipe.ingredients.length &&
          recipe.ingredients.map((ingredient, index) => (
            <span key={index} className={Styles.ingredients}>
              {ingredient}
            </span>
          ))}
      </div>

      <p className={Styles.publishTimeText}>
        Published at - {dateFormat(recipe.createdAt)}
      </p>
    </div>
  );
};

export default RecipeCard;
