import React from "react";
import styles from "./VictoryModal.module.css";

/**
 * Props for the VictoryModal component.
 * winner: The color of the winning player.
 * onHome: Callback for navigating home.
 * onRestart: Callback for restarting the game.
 */
export interface VictoryModalProps {
  winner: "white" | "black";
  onHome: () => void;
  onRestart: () => void;
}

/**
 * Modal displayed when a player wins the game.
 * Shows winner, and options to go home or restart.
 */
const VictoryModal: React.FC<VictoryModalProps> = ({ winner, onHome, onRestart }) => (
  <div
    className={styles.modalOverlay}
    role="dialog"
    aria-modal="true"
    aria-labelledby="victory-modal-title"
  >
    <div className={styles.modalContainer}>
      <div className={styles.header}>
        <img
          src="/icons/star.svg"
          alt="Congratulations"
          className={styles.starIcon}
        />
        <h2
          id="victory-modal-title"
          className={styles.title}
          style={{ color: winner === "white" ? "#fff" : "#222" }}
        >
          {winner === "white" ? "WHITE PIECES WON!" : "BLACK PIECES WON!"}
        </h2>
      </div>
      <div className={styles.body}>
        <div className={styles.buttonRow}>
          <button
            className="button--alternative no-break"
            onClick={onHome}
            aria-label="Go Back To Home"
          >
            Go Back To Home
          </button>
          <button
            className="button no-break"
            onClick={onRestart}
            aria-label="Start a New Match"
          >
            Start a New Match
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default VictoryModal; 