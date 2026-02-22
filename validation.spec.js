import { test, expect } from '@playwright/test';

test('Wordle Pro - reject invalid words', async ({ page }) => {
  await page.goto('http://localhost:4173');
  
  const gridRows = page.locator('.game-row');
  
  // Type 'AAAAA' (invalid word)
  await page.keyboard.type('AAAAA');
  await page.keyboard.press('Enter');
  
  // The first row should NOT be filled with color (should still be 'active' or 'empty' border)
  const firstRowCells = gridRows.first().locator('div');
  await expect(firstRowCells.first()).not.toHaveClass(/bg-(correct|present|absent)/);
  
  // Type 'REACT' (valid word)
  for (let i = 0; i < 5; i++) await page.keyboard.press('Backspace');
  
  await page.keyboard.type('REACT');
  await page.keyboard.press('Enter');
  
  // Now it should be filled
  await expect(firstRowCells.first()).toHaveClass(/bg-(correct|present|absent)/);
});
