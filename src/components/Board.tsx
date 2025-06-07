import React from "react";

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
  }

  // Strategy pattern for rendering pieces as images
  const pieceRenderStrategies: { [key: string]: () => React.ReactNode } = {
    "black_PO": () => (
      <img
        src="/pieces/product_owner--black.svg"
        alt="Black PO"
        style={defaultImageProps}
      />
    ),
    "black_Dev": () => (
      <img
        src="/pieces/developer--black.svg"
        alt="Black Dev"
        style={defaultImageProps}
      />
    ),
    "black_Des": () => (
      <img
        src="/pieces/designer--black.svg"
        alt="Black Des"
        style={defaultImageProps}
      />
    ),
    "white_PO": () => (
      <img
        src="/pieces/product_owner--white.svg"
        alt="White PO"
        style={defaultImageProps}
      />
    ),
    "white_Dev": () => (
      <img
        src="/pieces/developer--white.svg"
        alt="White Dev"
        style={defaultImageProps}
      />
    ),
    "white_Des": () => (
      <img
        src="/pieces/designer--white.svg"
        alt="White Des"
        style={defaultImageProps}
      />
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

export default function Board({ board, onCellClick, selected = null, validMoves }: BoardProps) {
  const numRows = board.length;
  const numCols = board[0]?.length || 0;
  const colLabels = Array.from({ length: numCols }, (_, i) => String.fromCharCode(97 + i));
  const rowLabels = Array.from({ length: numRows }, (_, i) => numRows - i);

  const evenBoardBackground = 'linear-gradient(153.43deg, rgba(250, 250, 250, 0.3) 0%, rgba(255, 255, 255, 0.15) 83.33%)'
  const oddBoardBackground = 'linear-gradient(153.43deg, rgba(250, 250, 250, 0.15) 0%, rgba(255, 255, 255, 0.05) 83.33%)'


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
    <table
      style={{ 
        borderCollapse: "collapse",
        padding: 8,
        display: 'block',
        background: 'rgba(255, 255, 255, 0.01)',
        border: "2.5px solid transparent",
        borderRadius: 12,
        backgroundImage: `
          linear-gradient(#000, #000),
          linear-gradient(155.59deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.15))
        `,
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        boxShadow: "0px 4px 44px #000000",
        backdropFilter: "blur(8px)",

      }}
      >
      <tbody
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        display: 'block',
      }}>
        {board.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => {
              // Identificação de número da linha (primeira coluna)
              const showRowLabel = j === 0;
              // Identificação de letra da coluna (última linha)
              const showColLabel = i === numRows - 1;
              return (
                <td
                  key={j}
                  style={{
                    width: 66,
                    height: 66,
                    textAlign: "center",
                    background: isSelected(selected, i, j) ? getCellBg(i, j, evenSelectedBoardBackground, oddSelectedBoardBackground)
                              : getCellBg(i, j),
                    cursor: onCellClick ? "pointer" : undefined,
                    position: "relative",
                    padding: 0,
                    transition: 'background 2s'
                  }}
                  onClick={onCellClick ? () => onCellClick(i, j) : undefined}
                >
                  {
                    /*background: rgba(255, 139, 31, 0.3); opacity: 0.5;*/

                    isValidMove(validMoves, i, j) && (
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          background: "#FF9F47",
                          opacity: 0.5,
                          borderRadius: 12,
                          margin: '0 auto',
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",

                        }}
                      />
                    )
                  }
                  {/* Número da linha no topo esquerdo da primeira coluna */}
                  {showRowLabel && (
                    <span
                      style={{
                        position: "absolute",
                        top: 2,
                        left: 4,
                        fontWeight: "bold",
                        color: "#FAFAFA",
                        fontSize: 12,
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    >
                      {rowLabels[i]}
                    </span>
                  )}
                  {/* Letra da coluna no canto inferior esquerdo da última linha */}
                  {showColLabel && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: 2,
                        right: 4,
                        fontWeight: "bold",
                        color: "#FAFAFA",
                        fontSize: 12,
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    >
                      {colLabels[j].toUpperCase()}
                    </span>
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