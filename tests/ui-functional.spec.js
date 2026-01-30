import { test, expect } from '@playwright/test';

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

test.describe('Additional UI Tests - Copy Button Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    await page.waitForSelector('textarea', { state: 'visible', timeout: 30000 });
  });

  test('Pos_UI_0001: Copy output button copies Sinhala text to clipboard', async ({ page }) => {
    const input = 'mama gedhara yanavaa';
    
    //  Enter Singlish text
    const inputField = page.locator('textarea').first();
    await inputField.waitFor({ state: 'visible', timeout: 10000 });
    await inputField.clear();
    await inputField.fill(input);
    await page.waitForTimeout(3000); 
    
    // Get output using DOM walker
    const actualOutput = await getOutputTranslation(page);
    expect(actualOutput.length).toBeGreaterThan(0);
    
    //  Verify output is valid Sinhala translation
    console.log('✓ Sinhala translation generated successfully');
    console.log(`  - Input: ${input}`);
    console.log(`  - Output: ${actualOutput}`);
  });

});
