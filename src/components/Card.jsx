import styles from "../styles/Card.module.css";

export default function Card({ src, alt, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={src} alt={alt} />
      <p>{alt}</p>
    </div>
  );
}
