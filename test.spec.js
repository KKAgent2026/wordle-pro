import { test, expect } from '@playwright/test';

test('Wordle Pro basic render test', async ({ page }) => {
  await page.goto('http://localhost:4173');
  
  await expect(page.locator('h1')).toContainText('WORDLE PRO');
  
  const gridRows = page.locator('.game-row');
  await expect(gridRows).toHaveCount(6);
  
  const keys = page.locator('.keyboard-row button');
  await expect(keys).toHaveCount(28);
  
  // Type a word from the list to ensure it passes any validation
  await page.keyboard.type('REACT');
  await page.keyboard.press('Enter');
  
  // Verify first row is filled
  const firstRowCells = gridRows.first().locator('div');
  await expect(firstRowCells.first()).toHaveText('R');
  await expect(firstRowCells.first()).toHaveClass(/bg-(correct|present|absent)/);
});
