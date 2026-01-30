import { test, expect } from '@playwright/test';

test.setTimeout(120000);

// Helper function to get output translation
async function getOutputTranslation(page) {
  const output = await page.evaluate(() => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    const sinhalaRegex = /[\u0D80-\u0DFF]{3,}/;
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
      const text = node.textContent?.trim() || '';
      if (sinhalaRegex.test(text) && text.length < 300 && !text.includes('Undo') &&
          !text.includes('Redo') && !text.includes('Touchpad') && !text.includes('Swap')) {
        textNodes.push({text, element: node.parentElement});
      }
    }
    
    if (textNodes.length > 0) {
      return textNodes[textNodes.length - 1].text;
    }
    return '';
  });
  
  return output.trim();
}

test.describe('Negative Functional Tests - Singlish to Sinhala Translation', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    await page.waitForSelector('textarea', { state: 'visible', timeout: 30000 });
  });

  // NEGATIVE TEST PATTERN - CRITICAL EXPLANATION:
  // ==============================================================================
  // These tests MUST FAIL to validate the translator's inability to handle invalid inputs
  // Each test uses assertion: expect(actualOutput).toBe(expectedPerfect)
  // When invalid input is provided, translator produces WRONG output (not perfect output)
  // When actualOutput != expectedPerfect, assertion FAILS
  // This FAILURE is the CORRECT and EXPECTED behavior - it proves the translator fails on invalid input

  test('Neg_Fun_0001: Missing space between words', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('mamaoyaatakaemathinaee');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    const expectedPerfect = 'මම ඔයාට කැමති නෑ';
    expect(actualOutput).toBe(expectedPerfect);
  });

  test('Neg_Fun_0002: Invalid currency symbol usage', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('mama ru. $100 k gevvaa');
    await page.waitForTimeout(4000);
    
    const actualOutput = await getOutputTranslation(page);
    const expectedPerfect = 'Invalid currency format';
    expect(actualOutput).toBe(expectedPerfect);
  });

  test('Neg_Fun_0003: Invalid time format (13:00 AM)', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('paQQthiya raathrii 13.00 AM patan gannavaa');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    const expectedPerfect = 'Invalid time format';
    expect(actualOutput).toBe(expectedPerfect);
  });

  test('Neg_Fun_0004: Invalid date format (32/11/2002)', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('mama ipadhunee 32/11/2002.');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    const expectedPerfect = 'Invalid time format.';
    expect(actualOutput).toBe(expectedPerfect);
  });

  test('Neg_Fun_0005: Unit mismatch (temperature in kg)', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('dhaen uShNathvaya 100 kg');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    const expectedPerfect = 'Unit mismatch.';
    expect(actualOutput).toBe(expectedPerfect);
  });

  test('Neg_Fun_0006: Excessive whitespace', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('api adha office       yanavaa');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    const expectedPerfect = 'අපි අද office යනවා';
    expect(actualOutput).toBe(expectedPerfect);
  });

  test('Neg_Fun_0007: Word split across lines', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('api hamuvenne\nsadhuDHAa');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    const expectedPerfect = 'අපි හමුවෙන්නෙ සදුඳා.';
    expect(actualOutput).toBe(expectedPerfect);
  });

  test('Neg_Fun_0008: Mixed case without normalization', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('api HoLiDaY ekata plan karanavaa');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    const expectedPerfect = 'අපි holiday එකට plan කරනවා';
    expect(actualOutput).toBe(expectedPerfect);
  });

  test('Neg_Fun_0009: Emoji in input', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('api party yanavaa 🥳🎉');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    const expectedPerfect = 'අපි party යනවා ';
    expect(actualOutput).toBe(expectedPerfect);
  });

  test('Neg_Fun_0010: Informal slang term', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('mama bus ekata yanavaa machan');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    const expectedPerfect = 'මම bus එකට යනවා machan ';
    expect(actualOutput).toBe(expectedPerfect);
  });

});
