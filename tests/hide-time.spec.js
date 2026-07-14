const { test, expect } = require('@playwright/test');

test('ocultar tempo até o término da montagem', async ({ page }) => {
  // O servidor deve estar rodando em http://localhost:8000
  await page.goto('http://localhost:8000/');

  const hideBox = page.locator('#hide-time');
  await expect(hideBox).toBeVisible();

  // Assegurar que a preferência está marcada por padrão
  const isChecked = await hideBox.isChecked();
  if (!isChecked) await hideBox.check();

  // Iniciar montagem
  await page.click('#start');

  // Imediatamente o tempo deve estar oculto (visibility:hidden)
  const visibilityBefore = await page.evaluate(() => getComputedStyle(document.getElementById('time')).visibility);
  expect(visibilityBefore).toBe('hidden');

  // Aguardar a finalização (max 15s)
  await page.waitForSelector('#finished:not(.hidden)', { timeout: 15000 });

  // Após terminar, o tempo deve estar visível e diferente de 00:00
  const visibilityAfter = await page.evaluate(() => getComputedStyle(document.getElementById('time')).visibility);
  expect(visibilityAfter).toBe('visible');

  const timeText = await page.textContent('#time');
  expect(timeText.trim()).not.toBe('00:00');
});
