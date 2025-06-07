"use client"
import styles from "./page.module.css";
import BoardSetup from "../components/BoardSetup";
import Game from "../components/Game";
import { useState } from "react";

export default function Home() {
  const [board, setBoard] = useState<(string | null)[][] | null>(null);
  const [gameKey, setGameKey] = useState(0); // Forçar reset do Game

  function handleGoHome() {
    setBoard(null);
    setGameKey(prev => prev + 1);
  }

  function handleRestart() {
    setGameKey(prev => prev + 1); // Força reset do Game
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {board !== null && (
          <Game
            key={gameKey}
            initialBoard={board}
            onGoHome={handleGoHome}
            onRestart={handleRestart}
          />
        )}
        {board === null && <BoardSetup onBoardReady={setBoard} />}
      </main>
    </div>
  );
}
