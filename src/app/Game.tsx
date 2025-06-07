import React, { useState } from "react";
import { Board, PieceColor, getValidMovesDev, getValidMovesDes, getValidMovesPO } from "./boardLogic";
import BoardComponent from "./Board";

interface GameProps {
  initialBoard: Board;
}

type Coord = [number, number];

function getPieceType(piece: string | null) {
  if (!piece) return null;
  return piece.split("_")[1];
}
function getPieceColor(piece: string | null) {
  if (!piece) return null;
  return piece.split("_")[0];
}

export default function Game({ initialBoard }: GameProps) {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [turn, setTurn] = useState<PieceColor>("white");
  const [selected, setSelected] = useState<Coord | null>(null);
  const [validMoves, setValidMoves] = useState<Coord[]>([]);
  const [winner, setWinner] = useState<PieceColor | null>(null);
  const [message, setMessage] = useState<string>("");

  function handleCellClick(row: number, col: number) {
    if (winner) return;
    const piece = board[row][col];
    const color = getPieceColor(piece);
    const type = getPieceType(piece);
    if (!selected) {
      // Seleção de peça
      if (!piece || color !== turn) {
        setMessage("Selecione uma peça sua.");
        return;
      }
      let moves: Coord[] = [];
      if (type === "Dev") moves = getValidMovesDev(board, [row, col], turn);
      else if (type === "Des") moves = getValidMovesDes(board, [row, col], turn);
      else if (type === "PO") moves = getValidMovesPO(board, [row, col], turn);
      setSelected([row, col]);
      setValidMoves(moves);
      setMessage(moves.length ? "Selecione um destino." : "Sem movimentos válidos.");
    } else {
      // Seleção de destino
      const isValid = validMoves.some(([r, c]) => r === row && c === col);
      if (!isValid) {
        setMessage("Selecione um destino válido.");
        return;
      }
      // Mover peça
      const newBoard = board.map(rowArr => [...rowArr]);
      const [fromR, fromC] = selected;
      newBoard[row][col] = board[fromR][fromC];
      newBoard[fromR][fromC] = null;
      // Verificar vitória
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
        setMessage(`Vitória de ${turn === "white" ? "Branco" : "Preto"}!`);
        return;
      }
      setBoard(newBoard);
      setTurn(turn === "white" ? "black" : "white");
      setSelected(null);
      setValidMoves([]);
      setMessage("");
    }
  }

  return (
    <div>
      <h2>Turno: {turn === "white" ? "Branco" : "Preto"}</h2>
      {winner && <h3>{message}</h3>}
      {!winner && <p>{message}</p>}
      <BoardComponent
        board={board}
        onCellClick={handleCellClick}
        selected={selected}
        validMoves={validMoves}
      />
      {selected && !winner && (
        <button onClick={() => { setSelected(null); setValidMoves([]); setMessage(""); }}>
          Cancelar seleção
        </button>
      )}
    </div>
  );
} 