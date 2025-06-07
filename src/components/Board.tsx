import React from "react";
import styles from "./Board.module.css";

interface BoardProps {
  board: (null | string)[][];
  onCellClick?: (row: number, col: number) => void;
  selected?: [number, number] | null;
  validMoves?: [number, number][];
}

const defaultImageProps = {
  width: '36px',
  height: '36px',
  display: "block",
  margin: '0 auto'
};

// Strategy pattern for rendering pieces as images
const pieceRenderStrategies: { [key: string]: () => React.ReactNode } = {
  "black_PO": () => (
    <img src="/pieces/product_owner--black.svg" alt="Black PO" style={defaultImageProps} />
  ),
  "black_Dev": () => (
    <img src="/pieces/developer--black.svg" alt="Black Dev" style={defaultImageProps} />
  ),
  "black_Des": () => (
    <img src="/pieces/designer--black.svg" alt="Black Des" style={defaultImageProps} />
  ),
  "white_PO": () => (
    <img src="/pieces/product_owner--white.svg" alt="White PO" style={defaultImageProps} />
  ),
  "white_Dev": () => (
    <img src="/pieces/developer--white.svg" alt="White Dev" style={defaultImageProps} />
  ),
  "white_Des": () => (
    <img src="/pieces/designer--white.svg" alt="White Des" style={defaultImageProps} />
  ),
};

function renderPiece(cell: null | string) {
  if (!cell) return null;
  const renderStrategy = pieceRenderStrategies[cell];
  return renderStrategy ? renderStrategy() : null;
}

function isSelected(selected: [number, number] | null, i: number, j: number) {
  return selected && selected[0] === i && selected[1] === j;
}
function isValidMove(validMoves: [number, number][] | undefined, i: number, j: number) {
  return validMoves && validMoves.some(([r, c]) => r === i && c === j);
}

/**
 * Board component renders the game board, pieces, and highlights.
 */
export default function Board({ board, onCellClick, selected = null, validMoves }: BoardProps) {
  const numRows = board.length;
  const numCols = board[0]?.length || 0;
  const colLabels = Array.from({ length: numCols }, (_, i) => String.fromCharCode(97 + i));
  const rowLabels = Array.from({ length: numRows }, (_, i) => numRows - i);

  // Board backgrounds
  const evenBoardBackground = 'linear-gradient(153.43deg, rgba(250, 250, 250, 0.3) 0%, rgba(255, 255, 255, 0.15) 83.33%)';
  const oddBoardBackground = 'linear-gradient(153.43deg, rgba(250, 250, 250, 0.15) 0%, rgba(255, 255, 255, 0.05) 83.33%)';
  const evenSelectedBoardBackground = 'rgba(255, 139, 31, 0.3)';
  const oddSelectedBoardBackground = 'rgba(255, 139, 31, 0.15)';

  function getCellBg(
    i: number,
    j: number,
    evenBackground: string = evenBoardBackground,
    oddBackground: string = oddBoardBackground
  ) {
    return (i + j) % 2 === 0 ? evenBackground : oddBackground;
  }

  return (
    <table className={styles.boardContainer}>
      <tbody className={styles.tbody}>
        {board.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => {
              const showRowLabel = j === 0;
              const showColLabel = i === numRows - 1;
              const isCellSelected = isSelected(selected, i, j);
              const cellBg = isCellSelected
                ? getCellBg(i, j, evenSelectedBoardBackground, oddSelectedBoardBackground)
                : getCellBg(i, j);
              return (
                <td
                  key={j}
                  className={[
                    styles.cell,
                    onCellClick ? styles.cellPointer : '',
                  ].join(' ')}
                  style={{ background: cellBg }}
                  onClick={onCellClick ? () => onCellClick(i, j) : undefined}
                >
                  {/* Valid move indicator */}
                  {isValidMove(validMoves, i, j) && (
                    <div className={styles.validMoveIndicator} />
                  )}
                  {/* Row label */}
                  {showRowLabel && (
                    <span className={styles.rowLabel}>{rowLabels[i]}</span>
                  )}
                  {/* Column label */}
                  {showColLabel && (
                    <span className={styles.colLabel}>{colLabels[j].toUpperCase()}</span>
                  )}
                  {renderPiece(cell)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
} 