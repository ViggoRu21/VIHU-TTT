import type { NextApiRequest, NextApiResponse } from "next";
import { getGameById, updateGame } from "../../../lib/gameStore";

export default async function game(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      if (!req.query.id) {
        return res.status(400).send("Id parameter required.");
      }

      const game = await getGameById(req.query.id.toString());

      if (!game) {
        return res.status(404);
      }

      return res.status(200).json(game);

    case "PUT":
      try {
        const updatedGame = await updateGame(
          req.query.id.toString(),
          req.body.moves
        );

        return res.status(200).json(updatedGame);
      } catch (error) {
        return res.status(500).send("Something went horribly wrong");
      }

    default:
      return res.status(500).send("Method not allowed");
  }
}
