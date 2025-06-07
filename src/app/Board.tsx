import React from "react";

interface BoardProps {
  board: (null | string)[][];
  onCellClick?: (row: number, col: number) => void;
  selected?: [number, number] | null;
  validMoves?: [number, number][];
}

function renderPiece(cell: null | string) {
  switch (cell) {
    case "black_PO": return "PO ⚫";
    case "black_Dev": return "Dev ⚫";
    case "black_Des": return "Des ⚫";
    case "white_PO": return "PO ⚪";
    case "white_Dev": return "Dev ⚪";
    case "white_Des": return "Des ⚪";
    default: return "";
  }
}

function isSelected(selected: [number, number] | null, i: number, j: number) {
  return selected && selected[0] === i && selected[1] === j;
}
function isValidMove(validMoves: [number, number][] | undefined, i: number, j: number) {
  return validMoves && validMoves.some(([r, c]) => r === i && c === j);
}

export default function Board({ board, onCellClick, selected = null, validMoves }: BoardProps) {
  return (
    <table style={{ borderCollapse: "collapse", marginTop: 16 }}>
      <tbody>
        {board.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td
                key={j}
                style={{
                  border: "1px solid #ccc",
                  width: 32,
                  height: 32,
                  textAlign: "center",
                  background: isSelected(selected, i, j)
                    ? "#ffe066"
                    : isValidMove(validMoves, i, j)
                    ? "#b2f2ff"
                    : undefined,
                  cursor: onCellClick ? "pointer" : undefined,
                }}
                onClick={onCellClick ? () => onCellClick(i, j) : undefined}
              >
                {renderPiece(cell)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
} 