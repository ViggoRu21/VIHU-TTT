import type { NextApiRequest, NextApiResponse } from "next";
import { getGames } from "../../lib/gameStore";

export default async function list(req: NextApiRequest, res: NextApiResponse) {
  try {
    const games = await getGames();
    return res.status(200).json(games);
  } catch (error) {
    return res.status(500).send("Something went terribly wrong!");
  }
}
