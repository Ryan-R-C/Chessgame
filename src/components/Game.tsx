import React, { useState } from "react";
import { Board, PieceColor, getValidMovesDev, getValidMovesDes, getValidMovesPO } from "../game/boardLogic";
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

function VictoryModal({ winner, onHome, onRestart }: { winner: PieceColor, onHome: () => void, onRestart: () => void }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#181818',
        borderRadius: 16,
        minWidth: 320,
        boxShadow: '0 8px 32px #000a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1.5px solid rgba(255, 255, 255, 0.3)'
      }}>
        
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '32px 40px 40px',
            gap: '20px',
            width: 534,
            height: 'fit-content',
            background: 'linear-gradient(94.68deg, rgba(250, 250, 250, 0.125) 9.22%, rgba(255, 255, 255, 0.05) 90.35%)',
            backdropFilter: 'blur(16px)',
            borderRadius: '16px 16px 0px 0px',
            borderBottom: '1.5px solid rgba(255, 255, 255, 0.3)'
          }}
        >

          <img
            src="/icons/star.svg"
            alt="Congratulations"
            style={{
              width: 68,
              height: 68,
              display: 'block'
            }}
          />

          <h2 style={{
            color: winner === 'white' ? '#fff' : '#222', 
            padding: 8, 
            borderRadius: 8
            }}>
            {winner === 'white' ? 'WHITE PIECES WON!' : 'BLACK PIECES WON!'}
          </h2>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 40,
            gap: 12,
            height: 108,
            background: 'linear-gradient(94.68deg, rgba(250, 250, 250, 0.025) 9.22%, rgba(255, 255, 255, 0.01) 90.35%)',
            backdropFilter: 'blur(16px)',
            borderRadius: '0px 0px 16px 16px',
            flex: 'none',
            order: 1,
            alignSelf: 'stretch',
            flexGrow: 0,
          }}
        >
          <div style={{ display: 'flex', gap: 16 }}>
            <button style={{width: 'fit-content'}} className="button--alternative" onClick={onHome}>Go Back To Home</button>
            <button style={{width: 'fit-content'}} className="button" onClick={onRestart}>Start a New Match</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Game({ initialBoard, onGoHome, onRestart }: GameProps & { onGoHome?: () => void, onRestart?: () => void }) {
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
        return;
      }
      setBoard(newBoard);
      setTurn(turn === "white" ? "black" : "white");
      setSelected(null);
      setValidMoves([]);
      setMessage("");
    }
  }

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
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}
    >
      {
      !winner && (<div>
        <h2>Turn: {turn === "white" ? "White" : "Black"}</h2>
      </div>)}
      {!winner && <p>{message}</p>}
      {!winner && (
        <BoardComponent
          board={board}
          onCellClick={handleCellClick}
          selected={selected}
          validMoves={validMoves}
        />
      )}
      {selected && !winner && (
        <button className="button" onClick={() => { setSelected(null); setValidMoves([]); setMessage(""); }}>
          Cancel
        </button>
      )}
      {winner && (
        <VictoryModal
          winner={winner}
          onHome={onGoHome || (() => {})}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
} 