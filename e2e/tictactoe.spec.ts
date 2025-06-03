import { test, expect } from "@playwright/test";

const BASE_URL = 'http://localhost:3000';

test.describe('Tic Tac Toe App Navigation and Functionality', () => {
  test('Landing page has correct title', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await expect(page).toHaveTitle(/Tic Tac Toe/i);
    await expect(page.locator('h1')).toHaveText(/Tic Tac Toe #️⃣/i);
  });


  test('Navigate from Landing to All Games page', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.click('text=See all Games');
    await expect(page).toHaveURL(`${BASE_URL}/game/list`);
    await expect(page.locator('h1')).toHaveText(/🎱 All games/i);
  });


//  test('Navigate to a specific Game page from All Games', async ({ page }) => {
//    await page.goto(`${BASE_URL}/games`);
//
//    // Assume each game entry has a data-testid="game-link-<id>"
//    await page.click('[data-testid="game-link-1"]');
//
//    await expect(page).toHaveURL(`${BASE_URL}/games/1`);
//
//    // Check that the game board is visible
//    await expect(page.locator('[data-testid="game-board"]')).toBeVisible();
//  });


  test('Entering a player name and starting a new game', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
 
    await page.fill('input[placeholder="❌ Your Name"]', 'Meowser');
 
    await page.click('text=Start Game');

    await expect(page.locator('[data-testid="headerdiv"]')).toHaveText(/Meowser/i);
  });


  test('Game play: clicking cells alternates turns', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.fill('input[placeholder="❌ Your Name"]', 'Meowser');
    await page.fill('input[placeholder="⭕ Opponent Name"]', 'Bowser');
    await page.click('text=Start Game');

    // Initialize cells 1 and 2
    const cell0 = page.locator('[data-testid="0"]');
    const cell1 = page.locator('[data-testid="1"]');

    await expect(page.locator('[data-testid="headerdiv"]')).toHaveText(/Meowser/i);

    // First click should place ❌
    await cell0.click();
    await expect(cell0).toHaveText('❌');

    await expect(page.locator('[data-testid="headerdiv"]')).toHaveText(/Bowser/i);

    // Next Click Should Place ⭕
    await cell1.click();
    await expect(cell1).toHaveText('⭕');
  });


  test('Game play: displays winning message when a player wins', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.fill('input[placeholder="❌ Your Name"]', 'Meowser');
    await page.fill('input[placeholder="⭕ Opponent Name"]', 'Bowser');
    await page.click('text=Start Game');

    // Winning Pattern for Meowser (X): top row
    const cell0 = page.locator('[data-testid="0"]');
    const cell1 = page.locator('[data-testid="1"]');
    const cell2 = page.locator('[data-testid="2"]');
    const cell3 = page.locator('[data-testid="3"]');
    const cell4 = page.locator('[data-testid="4"]');

    await cell0.click(); // X
    await cell3.click(); // O
    await cell1.click(); // X
    await cell4.click(); // O
    await cell2.click(); // X (winning move)

    await expect(page.locator('[data-testid="headerdiv"]')).toHaveText(/Meowser/i);
  });


  test('Game play: displays draw message when the board is full with no winner', async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.fill('input[placeholder="❌ Your Name"]', 'Meowser');
    await page.fill('input[placeholder="⭕ Opponent Name"]', 'Bowser');
    await page.click('text=Start Game');

    // A Set of Moves that Force a Draw
    const moves = ['0', '1', '2', '4', '3', '5', '7', '6', '8'];
    for (let i = 0; i < moves.length; i++) {
      await page.locator(`[data-testid="${moves[i]}"]`).click();
      await page.waitForTimeout(1000);
    }

    await page.waitForTimeout(1000);

    await expect(page.locator('[data-testid="headerdiv"]')).toHaveText(/draw/i);
  });

});
