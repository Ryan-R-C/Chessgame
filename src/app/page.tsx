"use client"
import styles from "./page.module.css";
import BoardSetup from "../components/BoardSetup";
import Game from "../components/Game";
import { useState } from "react";

export default function Home() {
  const [board, setBoard] = useState<(string | null)[][] | null>(null);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {board !== null && <Game initialBoard={board} />}
        <BoardSetup onBoardReady={setBoard} />
      </main>
    </div>
  );
}
