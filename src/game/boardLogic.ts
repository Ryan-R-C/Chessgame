// Tipos auxiliares
export type PieceColor = "black" | "white";
export type PieceType = "Dev" | "Des" | "PO";
export type Piece = null | string; // Ex: 'black_Dev', 'white_PO', etc
export type Board = Piece[][];
export type Position = [number, number];

function getPieceInfo(piece: Piece): { color: PieceColor; type: PieceType } | null {
  if (!piece) return null;
  const [color, type] = piece.split("_");
  if ((color === "black" || color === "white") && ["Dev", "Des", "PO"].includes(type)) {
    return { color: color as PieceColor, type: type as PieceType };
  }
  return null;
}

function isInside(board: Board, row: number, col: number) {
  return row >= 0 && row < board.length && col >= 0 && col < board[0].length;
}

export function getValidMovesDev(board: Board, pos: Position, color: PieceColor): Position[] {
  const directions = [
    [0, 1], [0, -1], [1, 0], [-1, 0], // horizontais e verticais
    [1, 1], [1, -1], [-1, 1], [-1, -1], // diagonais
  ];
  const res: Position[] = [];
  for (const [dr, dc] of directions) {
    for (let dist = 1; dist <= 3; dist++) {
      let r = pos[0] + dr * dist;
      let c = pos[1] + dc * dist;
      if (!isInside(board, r, c)) break;
      let blocked = false;
      for (let step = 1; step < dist; step++) {
        const midR = pos[0] + dr * step;
        const midC = pos[1] + dc * step;
        const midPiece = getPieceInfo(board[midR][midC]);
        if (midPiece && midPiece.color === color) {
          blocked = true;
          break;
        }
      }
      if (blocked) break;
      const destPiece = getPieceInfo(board[r][c]);
      if (!destPiece) {
        res.push([r, c]);
      } else if (destPiece.color !== color) {
        res.push([r, c]);
        break;
      } else {
        break;
      }
    }
  }
  return res;
}

export function getValidMovesDes(board: Board, pos: Position, color: PieceColor): Position[] {
  const res: Position[] = [];
  const lMoves = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2],
  ];
  for (const [dr, dc] of lMoves) {
    const r = pos[0] + dr;
    const c = pos[1] + dc;
    if (!isInside(board, r, c)) continue;
    const destPiece = getPieceInfo(board[r][c]);
    if (!destPiece || destPiece.color !== color) {
      res.push([r, c]);
    }
  }
  return res;
}

export function getValidMovesPO(board: Board, pos: Position, color: PieceColor): Position[] {
  const res: Position[] = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const r = pos[0] + dr;
      const c = pos[1] + dc;
      if (!isInside(board, r, c)) continue;
      const destPiece = getPieceInfo(board[r][c]);
      if (!destPiece || destPiece.color !== color) {
        res.push([r, c]);
      }
    }
  }
  return res;
} 