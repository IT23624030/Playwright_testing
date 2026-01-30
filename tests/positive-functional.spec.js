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

test.describe('Positive Functional Tests - Singlish to Sinhala Translation', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    await page.waitForSelector('textarea', { state: 'visible', timeout: 30000 });
  });

  test('Pos_Fun_0001: Simple daily greeting conversion', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('mama vaedaka innee');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0002: Sentence with casual context', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('mama kaempas yanavaa, haebaeyi dheeshana valata sahaBhaagi venne naee');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0003: Future tense with politeness', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('oyaa mata kaemaeththa dhenakan mama balan innavaa');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0004: Question format conversion', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('oyaa mata aadharee naedhdha?');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0005: Imperative sentence', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('mehe balanna');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0006: Ability expression', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('mata eeka karanna puluvan');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0007: Negative declarative sentence', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('oyaa kiyalaa dhunna dheeval theerenne naee');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0008: Exclamatory sentence', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('oyaava dhaekiima sathutak!');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0009: Question with negation', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('mama methana idha gaththata kamak naedhdha?');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0010: Agreement expression', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('hari, ehenam dhaen yamu');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0011: Polite request', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('karuNaakaralaa magee dhihaa balanna');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0012: Direction/location phrase', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('meheta varen');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0013: Emotional state expression', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('mata badaginii');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0014: Imperative with adverb', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('hariyata kiyanna');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0015: Temporal reference (tomorrow)', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('mama heta koLaBA navathinavaa');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0016: Future plan statement', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('heta api zoo ekata yanavaa');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0017: Interjection/onomatopoeia', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('Shook Shook');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0018: Past tense with emphatic form', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('mama iiyee kaeevaa');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0019: Progressive action statement', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('mama keek ekak hadhanavaa');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0020: Future collective action', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('api heta eeka karanavaa');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0021: Negative preference statement', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('api eekata kaemathi naee');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0022: Intention to speak statement', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('mama siQQdhuvak kiyanna yannee');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0023: Preparation statement', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('api yanna hadhannee');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

  test('Pos_Fun_0024: Permission request question', async ({ page }) => {
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill('mata ara tika ganna puLuvandha?');
    await page.waitForTimeout(3000);
    
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
  });

});
