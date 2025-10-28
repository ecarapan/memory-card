import styles from "../styles/App.module.css";
import { useEffect, useState } from "react";
import Scoreboard from "./Scoreboard";
import Card from "./Card";

export default function App() {
  const [cardList, setCardList] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    async function getGif() {
      const apiKey = "IXWG76q89SKinwaVzui6drGJOter7U7w";
      const searchTerm = "cat";

      try {
        const response = await fetch(
          "https://api.giphy.com/v1/gifs/search?api_key=" +
            apiKey +
            "&q=" +
            searchTerm +
            "&limit=12&offset=0&rating=g&lang=en&bundle=messaging_non_clips"
        );
        const searchData = await response.json();
        const cards = searchData.data.map((gif) => ({
          id: crypto.randomUUID(),
          url: gif.images.original.url,
          title: gif.title,
          isSelected: false,
        }));

        setCardList(cards);
      } catch (error) {
        console.error(error);
      }
    }

    getGif();
  }, []);

  function handleCardClick(id) {
    const clickedCard = cardList.find((card) => card.id === id);
    if (clickedCard.isSelected) {
      if (score > highScore) {
        setHighScore(score);
      }
      setScore(0);
      setCardList(cardList.map((card) => ({ ...card, isSelected: false })));
      return;
    }

    const updatedCards = cardList.map((card) => {
      if (card.id === id) {
        return { ...card, isSelected: true };
      } else {
        return card;
      }
    });
    setCardList(shuffle(updatedCards));
    setScore(score + 1);
  }

  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  return (
    <div className={styles.app}>
      <header>
        <div>
          <h1>Cat Memory Game</h1>
          <h2>Earn points by clicking on different images every round!</h2>
        </div>
        <Scoreboard score={score} highScore={highScore}></Scoreboard>
      </header>
      <main>
        {cardList.map((card) => (
          <Card
            key={card.id}
            src={card.url}
            alt={card.title}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </main>
    </div>
  );
}
