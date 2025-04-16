// pages/api/game/[id].ts
import type { NextApiRequest, NextApiResponse } from "next"
import { getGameById, updateGame } from "../../../lib/gameStore"

export default async function game(req: NextApiRequest, res: NextApiResponse) {
  // 1) Extract & validate the `id` param
  const rawId = req.query.id
  if (!rawId) {
    return res.status(400).send("Id parameter required.")
  }
  // 2) Normalize string|string[] → string
  const id = Array.isArray(rawId) ? rawId[0] : rawId

  switch (req.method) {
    case "GET": {
      const game = await getGameById(id)
      if (!game) {
        return res.status(404).send("Game not found")
      }
      return res.status(200).json(game)
    }

    case "POST": {
      try {
        const updatedGame = await updateGame(id, req.body.moves)
        return res.status(200).json(updatedGame)
      } catch (error) {
        return res.status(500).send("Something went horribly wrong")
      }
    }

    default:
      // 405 = Method Not Allowed
      return res.status(405).send("Method not allowed")
  }
}
