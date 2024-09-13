import styles from "./styles.module.css";

const Ingredients = ({ ingredients }) => {
  return (
    <div className="space-x-2">
      <span>Ingredients -</span>
      {!!ingredients.length &&
        ingredients.map((ingredient, index) => (
          <span key={index} className={styles.ingredients}>
            {ingredient}
          </span>
        ))}
    </div>
  );
};

export default Ingredients;
