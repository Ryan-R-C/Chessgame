/**
 * Utility functions for game piece parsing and typing.
 */

import { PieceColor } from "../game/boardLogic";

export type PieceType = "Dev" | "Des" | "PO";

/**
 * Returns the type of the piece (Dev, Des, PO) or null if not present.
 */
export function getPieceType(piece: string | null): PieceType | null {
  if (!piece) return null;
  const parts = piece.split("_");
  if (parts.length !== 2) return null;
  const type = parts[1];
  if (type === "Dev" || type === "Des" || type === "PO") return type;
  return null;
}

/**
 * Returns the color of the piece (white or black) or null if not present.
 */
export function getPieceColor(piece: string | null): PieceColor | null {
  if (!piece) return null;
  const parts = piece.split("_");
  if (parts.length !== 2) return null;
  const color = parts[0];
  if (color === "white" || color === "black") return color;
  return null;
} 