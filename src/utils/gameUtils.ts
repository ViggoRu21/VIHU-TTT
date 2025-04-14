import { Game } from "../lib/gameStore";
import { EMOJI, pepTalks, Sign } from "./constants";

export function calculateWinner(
  squares: Sign[] | string[]
): Sign | null | string {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export function getPlayerNameFromSign(
  sign: Sign | string,
  game: Game
): Sign | string {
  if (sign === Sign.O) {
    return `${EMOJI[sign]} ${game?.player2_name} `;
  } else if (sign === Sign.X) {
    return `${EMOJI[sign]} ${game?.player1_name} `;
  }
  return "";
}

export function getWhosTurnItIs(moves: Sign[] | string[]): Sign | string {
  const numberOfX = moves.filter((move) => move === Sign.X).length;
  const numberOfO = moves.filter((move) => move === Sign.O).length;
  if (numberOfX === 0) {
    return Sign.X;
  }
  if (numberOfX > numberOfO) {
    return Sign.O;
  } else {
    return Sign.X;
  }
}

export function getRandomPepTalk() {
  return pepTalks[Math.floor(Math.random() * pepTalks.length)];
}
