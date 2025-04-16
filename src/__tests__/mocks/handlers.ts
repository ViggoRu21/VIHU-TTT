import { http, HttpResponse } from 'msw'
import { calculateWinner } from '../../utils/gameUtils'
import { Sign } from '../../utils/constants'

type Game = {
  id: string
  players: [string, string]
  moves: Array<Sign | null>
  current: Sign
  winner: Sign | null | string
}

// In‑memory store
const games = new Map<string, Game>()

export const handlers = [
  // Create a new game
  http.post('/api/new', async ({ request }) => {
    const body = await request.json()
    const { playerName, secondPlayerName } =
      body as { playerName: string; secondPlayerName: string }

    const id = Math.random().toString(36).slice(2, 10)
    const newGame: Game = {
      id,
      players: [playerName, secondPlayerName],
      moves: Array(9).fill(null),
      current: Sign.X,
      winner: null,
    }
    games.set(id, newGame)
    // index.tsx expects { id }
    return HttpResponse.json({ id })
  }),

  // Read game state
  http.get('/api/game/:gameId', ({ params }) => {
    // params.gameId can be string|string[]; force to string
    const gameId = Array.isArray(params.gameId)
      ? params.gameId[0]
      : params.gameId

    const game = games.get(gameId)
    if (!game) {
      return new HttpResponse('Game not found', { status: 404 })
    }
    return HttpResponse.json(game)
  }),

  // Post a move
  http.post('/api/move/:gameId', async ({ params, request }) => {
    const gameId = Array.isArray(params.gameId)
      ? params.gameId[0]
      : params.gameId
    const game = games.get(gameId)
    if (!game) {
      return new HttpResponse('Game not found', { status: 404 })
    }

    const body = await request.json()
    const { index } = body as { index: number }

    if (game.winner || game.moves[index] != null) {
      return new HttpResponse('Invalid move', { status: 400 })
    }

    game.moves[index] = game.current
    game.current = game.current === Sign.X ? Sign.O : Sign.X
    game.winner = calculateWinner(game.moves) as Sign | null

    return HttpResponse.json(game)
  })
]
