import React, { useState } from "react";

interface BoardSetupProps {
  onBoardReady: (board: (null | string)[][]) => void;
}

const MIN = 6;
const MAX = 12;

export default function BoardSetup({ onBoardReady }: BoardSetupProps) {
  const [rows, setRows] = useState("");
  const [cols, setCols] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !rows || !cols ||
      !Number.isInteger(Number(rows)) ||
      !Number.isInteger(Number(cols)) ||
      Number(rows) < MIN ||
      Number(rows) > MAX ||
      Number(cols) < MIN ||
      Number(cols) > MAX
    ) {
      setError(`Insira inteiros entre ${MIN} e ${MAX} para linhas e colunas.`);
      return;
    }
    setError("");
    const board = Array.from({ length: Number(rows) }, () => Array(Number(cols)).fill(null));
    placePieces(board);
    onBoardReady(board);
  }

  function placePieces(board: (null | string)[][]) {
    const m = board.length;
    const n = board[0].length;
    // Preto
    if (n - 1 >= 0) board[0][n - 1] = "black_PO";
    if (n - 2 >= 0) board[0][n - 2] = "black_Dev";
    if (n - 3 >= 0) board[0][n - 3] = "black_Des";
    // Branco
    if (m - 1 >= 0) {
      if (0 < n) board[m - 1][0] = "white_PO";
      if (1 < n) board[m - 1][1] = "white_Dev";
      if (2 < n) board[m - 1][2] = "white_Des";
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 300 }}>
      <label>
        Linhas (6-12):
        <input
          type="number"
          value={rows}
          min={MIN}
          max={MAX}
          onChange={e => setRows(e.target.value)}
        />
      </label>
      <label>
        Colunas (6-12):
        <input
          type="number"
          value={cols}
          min={MIN}
          max={MAX}
          onChange={e => setCols(e.target.value)}
        />
      </label>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit">Criar Tabuleiro</button>
    </form>
  );
} 