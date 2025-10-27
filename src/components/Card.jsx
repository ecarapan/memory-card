import styles from "../styles/Card.module.css";

export default function Card({ key, src, alt, onClick }) {
  return (
    <div className={styles.card} key={key} onClick={onClick}>
      <img src={src} alt={alt} />
      <p>{alt}</p>
    </div>
  );
}
