import React, { useState } from "react";
import "../assets/button.css";


interface BoardSetupProps {
  onBoardReady: (board: (null | string)[][]) => void;
}

const MIN = 6;
const MAX = 12;

const ERROR_COLOR = '#FF5555'


const INPUT_STYLE: React.CSSProperties = {
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "8px 16px",
  gap: "12px",
  width: "52px",
  height: "28px",
  background: "linear-gradient(94.68deg, rgba(255, 255, 255, 0.075) 9.22%, rgba(255, 255, 255, 0.03) 90.35%)",
  boxShadow: "0px 4.61646px 46.1646px rgba(0, 0, 0, 0.25)",
  backdropFilter: "blur(7.5px)",
  borderRadius: "8px",
  flex: "none",
  order: 1,
  flexGrow: 0,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "rgba(255, 255, 255, 0.3)",
};

const LABEL_STYLE = {
  display: 'flex',
  gap: 8,
  paddingRight: 8,
  alignItems: 'center'
}

export default function BoardSetup({ onBoardReady }: BoardSetupProps) {
  const [rows, setRows] = useState("");
  const [cols, setCols] = useState("");
  const [error, setError] = useState("");

  const isRowsInvalid = !!rows && (!Number.isInteger(Number(rows)) || Number(rows) < MIN || Number(rows) > MAX);
  const isColsInvalid = !!cols && (!Number.isInteger(Number(cols)) || Number(cols) < MIN || Number(cols) > MAX);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      isRowsInvalid || isColsInvalid
      || !rows || !cols
    ) {
      setError("Please use values between 6 - 12.");
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
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8, width: '100%' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: 0,
          width: 261,
          height: 36,
          background: "linear-gradient(94.68deg, rgba(250, 250, 250, 0.05) 9.22%, rgba(255, 255, 255, 0.02) 90.35%)",
          boxShadow: "0px 4.61646px 46.1646px rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(7.5px)",
          borderRadius: 8,
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
        >
          <p
          style={{
            padding: 12
          }}
          >
            Scale
          </p>
          <label
          style={LABEL_STYLE}
          >
            X
            <input
              type="number"
              placeholder="6"
              value={rows}
              onChange={e => { setRows(e.target.value); if (error) setError(""); }}
              style={{
                ...INPUT_STYLE,
                ...(isRowsInvalid && {
                  borderColor: ERROR_COLOR
                })
              }}
              className="input"
            />
          </label>
          <label
          style={LABEL_STYLE}
          >
            Y
            <input
              type="number"
              placeholder="6"
              value={cols}
              onChange={e => { setCols(e.target.value); if (error) setError(""); }}
              style={{
                ...INPUT_STYLE,
                ...(isColsInvalid && {
                  borderColor: ERROR_COLOR
                })
              }}
              className="input"
            />
          </label>
          <div
          style={{
            borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
          }}
          >
            <button
            type="submit"
            style={{
              background: 'transparent',
              border: 0,
              cursor: 'pointer',
            }}
            >
              <img src="/icons/check.svg" alt="Criar Tabuleiro" style={{ width: 18, height: 18, display: "block" }} />
            </button>
          </div>
        </div>
        <button
        type="submit"
        className="button"
        >
          Play
        </button>
      </div>
      {error && <div style={{ display: 'flex',
      alignItems: 'center',
      gap: 4
       }}>
        <img src="/icons/warning.svg" alt="Aleta" style={{ width: 12, height: 12, display: "block" }} />
      <div style={{
        fontWeight: 600,
        fontSize: 12,
        color: '#C9C9C9'
      }}>{error}</div>
      </div>}
    </form>
  );
} 