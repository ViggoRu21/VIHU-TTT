import { Game } from "../lib/gameStore";
import {
  calculateWinner,
  checkDraw,
  getPlayerNameFromSign,
  getRandomPepTalk,
  getWhosTurnItIs,
} from "../utils/gameUtils";
import styles from "../styles/Home.module.css";
import { WinnerAnnouncement, DrawAnnouncement } from "./WinnerAnnouncement";

interface Props {
  game: Game;
}

export function BoardHeader({ game }: Props) {
  const nextTurnSign = getWhosTurnItIs(game.moves);
  const winner = calculateWinner(game.moves);
  const draw = checkDraw(game.moves);
  if (winner) {
    return <WinnerAnnouncement winner={winner} game={game} />;
  }
  if (draw) {
    return <DrawAnnouncement/>;
  }
  return (
    <h1 className={styles.title}>
      {getRandomPepTalk()}
      <div>{getPlayerNameFromSign(nextTurnSign, game)}</div>
    </h1>
  );
}
