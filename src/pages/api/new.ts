import type { NextApiRequest, NextApiResponse } from "next";
import { createGame } from "../../lib/gameStore";

export default async function newGame(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { playerName, secondPlayerName } = req.body;
  try {
    const game = await createGame(playerName, secondPlayerName);

    return res.status(200).json(game);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went very wrong!");
  }
}
