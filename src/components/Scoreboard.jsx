import styles from "../styles/Scoreboard.module.css";

export default function Scoreboard({ score, highScore }) {
  return (
    <div className={styles.scoreboard}>
      <p>Score: {score}</p>
      <p>High Score: {highScore}</p>
    </div>
  );
}
