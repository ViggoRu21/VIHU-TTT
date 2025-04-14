import { Sign } from "../utils/constants";
import { prisma } from "./prisma";

export interface Game {
  id: string;
  player1_name: string;
  player2_name?: string | null;
  moves: Sign[] | string[];
  createdAt?: Date;
}

const EMPTY_MOVES = Array(9).fill("");

export async function createGame(
  playerName: string,
  secondPlayerName: string
): Promise<Game> {
  await prisma.$connect();

  const game = await prisma.game.create({
    data: {
      player1_name: playerName,
      player2_name: secondPlayerName,
      moves: EMPTY_MOVES,
    },
  });
  return game;
}

export async function getGameById(gameId: string): Promise<Game | null> {
  await prisma.$connect();
  return await prisma.game.findUnique({ where: { id: gameId } });
}

export async function updateGame(
  gameId: string,
  moves: string[]
): Promise<Game> {
  await prisma.$connect();
  return await prisma.game.update({
    where: {
      id: gameId,
    },
    data: {
      moves: moves,
    },
  });
}

export async function getGames(): Promise<Game[]> {
  await prisma.$connect();
  return await prisma.game.findMany();
}
