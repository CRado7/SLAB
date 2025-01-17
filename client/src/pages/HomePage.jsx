import RecipeList from "../components/RecipeList";
import HOME from "../assets/SLAB-HOME.svg"
import "../styles/HomePage.css";

function HomePage() {

  return (
    <div className="home-container">
      <img src= {HOME} className="slab"></img>
      <p><span>Welcome to SLAB.</span> We are home to a collection of surfers, early-risers, and on-the-goers who need energy to keep moving. Our mission is to build a commiunity that shares their delicious creations to fuel our adventures without weighing us down.</p>
      <div className="recipe-list-container">
        <RecipeList />
      </div>
    </div>
  );
}

export default HomePage;
