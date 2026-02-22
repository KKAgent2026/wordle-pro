import { test, expect } from '@playwright/test';

test('Wordle Pro stress test - prevent double submission', async ({ page }) => {
  await page.goto('http://localhost:4173');
  
  const gridRows = page.locator('.game-row');
  
  // Type 'REACT'
  await page.keyboard.type('REACT');
  
  // Rapid fire Enter 3 times
  await page.keyboard.press('Enter');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Enter');
  
  // Wait for submission lock and React state updates (setTimeout is 500ms)
  await page.waitForTimeout(2000);
  
  // Verify only one row was filled
  const cellsWithText = page.locator('.game-row div').filter({ hasText: /[A-Z]/ });
  // We expect 5 letters from the first guess. 
  // If the race condition existed, it might have submitted multiple times or cleared too late.
  await expect(cellsWithText).toHaveCount(5);
});
