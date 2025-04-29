import { useEffect, useState } from "react";
import "./App.css";

const adjectives = [
  "Fiery", "Frozen", "Electric", "Tangy", "Sweet", "Zesty", "Lava", "Velvet", "Spicy", "Icy"
];
const fruits = [
  "Mango", "Strawberry", "Blueberry", "Lemon", "Coconut", "Pineapple", "Orange", "Kiwi", "Grape"
];
const suffixes = [
  "Splash", "Twist", "Storm", "Boost", "Crush", "Breeze", "Zing", "Fizz", "Drop"
];
const emojis = ["🍓", "🍍", "🥭", "🍊", "🫐", "🍋", "🍒", "🥝", "🍇", "🍹"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDrinkName() {
  const emoji = getRandom(emojis);
  const name = `${emoji} ${getRandom(fruits)} ${getRandom(adjectives)} ${getRandom(suffixes)}`;
  return name;
}

function App() {
  const [drink, setDrink] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const saved = params.get("drink");
    if (saved) {
      setDrink(decodeURIComponent(saved));
    } else {
      createNewDrink();
    }
  }, []);

  const createNewDrink = () => {
    const newDrink = generateDrinkName();
    setDrink(newDrink);
    const encoded = encodeURIComponent(newDrink);
    window.history.replaceState(null, "", `?drink=${encoded}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(drink);
    alert("Drink copied to clipboard! 🍹");
  };

  return (
    <div className="App">
      <h1>🍹 Mock Drink Generator</h1>
      <div className="drink-box">{drink}</div>
      <div className="buttons">
        <button onClick={createNewDrink}>Generate New</button>
        <button onClick={copyToClipboard}>Copy Drink</button>
      </div>
    </div>
  );
}

export default App;