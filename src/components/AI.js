export function getAIMove(squares) {
    const availableMoves = squares.map((square, index) => square === null ? index : null).filter(index => index !== null);
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    return randomMove;
  }
  