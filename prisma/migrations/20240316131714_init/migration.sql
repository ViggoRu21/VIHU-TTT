-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "moves" TEXT[],
    "player1_name" TEXT NOT NULL,
    "player2_name" TEXT,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
