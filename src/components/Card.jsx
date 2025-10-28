import styles from "../styles/Card.module.css";

export default function Card({ src, alt, onClick }) {
  return (
    <button className={styles.card} onClick={onClick}>
      <img src={src} alt={alt} />
      <p>{alt}</p>
    </button>
  );
}
