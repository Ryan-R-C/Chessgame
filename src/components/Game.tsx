import React, { useState } from "react";
import { Board, PieceColor, getValidMovesDev, getValidMovesDes, getValidMovesPO } from "../game/boardLogic";
import BoardComponent from "./Board";
import VictoryModal from "./VictoryModal";
import { getPieceType, getPieceColor } from "./gameUtils";
import styles from "./Game.module.css";

interface GameProps {
  initialBoard: Board;
  onGoHome?: () => void;
  onRestart?: () => void;
}

type Coord = [number, number];

/**
 * Main game component. Handles board state, turn logic, and victory detection.
 */
const Game: React.FC<GameProps> = ({ initialBoard, onGoHome, onRestart }) => {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [turn, setTurn] = useState<PieceColor>("white");
  const [selected, setSelected] = useState<Coord | null>(null);
  const [validMoves, setValidMoves] = useState<Coord[]>([]);
  const [winner, setWinner] = useState<PieceColor | null>(null);
  const [message, setMessage] = useState<string>("");

  /**
   * Handles cell click for piece selection and movement.
   */
  function handleCellClick(row: number, col: number) {
    if (winner) return;
    const piece = board[row][col];
    const color = getPieceColor(piece);
    const type = getPieceType(piece);
    if (!selected) {
      // Piece selection
      if (!piece || color !== turn) {
        setMessage("Select one of your own pieces.");
        return;
      }
      let moves: Coord[] = [];
      if (type === "Dev") moves = getValidMovesDev(board, [row, col], turn);
      else if (type === "Des") moves = getValidMovesDes(board, [row, col], turn);
      else if (type === "PO") moves = getValidMovesPO(board, [row, col], turn);
      setSelected([row, col]);
      setValidMoves(moves);
      setMessage(moves.length ? "Select a destination." : "No valid moves.");
    } else {
      // Destination selection
      const isValid = validMoves.some(([r, c]) => r === row && c === col);
      if (!isValid) {
        setMessage("Select a valid destination.");
        return;
      }
      // Move piece
      const newBoard = board.map(rowArr => [...rowArr]);
      const [fromR, fromC] = selected;
      newBoard[row][col] = board[fromR][fromC];
      newBoard[fromR][fromC] = null;
      // Victory check: if opponent's PO is not found, current player wins
      const opponentPO = turn === "white" ? "black_PO" : "white_PO";
      let foundPO = false;
      for (const r of newBoard) {
        if (r.includes(opponentPO)) {
          foundPO = true;
          break;
        }
      }
      if (!foundPO) {
        setBoard(newBoard);
        setWinner(turn);
        return;
      }
      setBoard(newBoard);
      setTurn(turn === "white" ? "black" : "white");
      setSelected(null);
      setValidMoves([]);
      setMessage("");
    }
  }

  /**
   * Resets the game to its initial state.
   */
  function handleRestart() {
    setBoard(initialBoard);
    setTurn("white");
    setSelected(null);
    setValidMoves([]);
    setWinner(null);
    setMessage("");
    if (onRestart) onRestart();
  }

  return (
    <div className={styles.gameContainer}>
      {/* Show turn and message if game is ongoing */}
      {!winner && (
        <div className={styles.turn}>
          Turn: {turn === "white" ? "White" : "Black"}
        </div>
      )}
      {!winner && <p className={styles.message}>{message}</p>}
      {/* Board rendering */}
      {!winner && (
        <BoardComponent
          board={board}
          onCellClick={handleCellClick}
          selected={selected}
          validMoves={validMoves}
        />
      )}
      {/* Cancel selection button */}
      {selected && !winner && (
        <button
          className={`button ${styles.cancelButton}`}
          onClick={() => {
            setSelected(null);
            setValidMoves([]);
            setMessage("");
          }}
        >
          Cancel
        </button>
      )}
      {/* Victory modal */}
      {winner && (
        <VictoryModal
          winner={winner}
          onHome={onGoHome || (() => {})}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Game; 