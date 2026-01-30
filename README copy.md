# Singlish to Sinhala Translation System - Automated Testing
This project contains automated test cases for the Singlish to Sinhala translation system available at https://www.swifttranslator.com/

## Project Overview
This test automation project uses Playwright to verify the accuracy and functionality of the Singlish to Sinhala translation system. The tests cover:

**24 Positive Functional Test Cases**: Scenarios where the system correctly converts Singlish to Sinhala
**10 Negative Functional Test Cases**: Scenarios where the system fails or behaves incorrectly
**1 Positive UI Test Case**: Real-time output update behavior

## Prerequisites
Before running the tests, ensure you have the following installed:
  **Node.js** (version 16 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`

## Installation Steps
### Step 1: open the project folder
### Step 2: Install Playwright browsers (Chromium, Firefox, WebKit)
 -npx playwright install
### Step 3:code the test cases
### Step 4:Running the Tests
```bash
# Run all test files
npx playwright test
# This will show the browser window during test execution
npx playwright test --headed
# Run only positive functional tests
npx playwright test tests/positive-functional.spec.js
# Run only negative functional tests
npx playwright test tests/negative-functional.spec.js
# Run only UI tests
npx playwright test tests/ui-tests.spec.js
# Opens Playwright's interactive test runner
npx playwright test --ui
# Run a specific test by name
npx playwright test -g "Pos_Fun_0001"
# Run tests on a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```
### Step 4: Viewing Test Results(HTML Report)
```bash
npx playwright show-report
```
This opens an interactive HTML report showing:
- Test execution results (Pass/Fail)
- Screenshots of failures
- Video recordings of failed tests
- Execution timeline
- Detailed error messages

## Test Categories

### Positive Functional Tests (24 cases)
These tests verify correct Singlish to Sinhala conversion covering:

1. **Sentence Structures**
   - Simple sentences
   - Compound sentences
   - Complex sentences
   - Interrogative (questions)
   - Imperative (commands)

2. **Daily Language Usage**
   - Common greetings
   - Requests and responses
   - Polite vs informal phrasing

3. **Grammatical Forms**
   - Tense variations (past, present, future)
   - Negation patterns
   - Pronoun variations

4. **Input Length Variations**
   - Short inputs (≤30 characters)
   - Medium inputs (31-299 characters)

### Negative Functional Tests (10 cases)
These tests identify system limitations and failures:

1. **Input Format Issues**
   - Missing spaces between words
   - Excessive whitespace
   - Line breaks in text

2. **Validation Failures**
   - Invalid date formats
   - Invalid time formats
   - Unit mismatches
   - Invalid currency formats

3. **Character Handling Issues**
   - Mixed case handling
   - Emoji preservation
   - Slang term conversion

### UI Tests (1 cases)
1. **Positive**: Real-time output update behavior

## Test Case ID Conventions
- **Pos_Fun_XXXX**: Positive Functional Test Cases
- **Neg_Fun_XXXX**: Negative Functional Test Cases
- **Pos_UI_XXXX**: Positive UI Test Cases
- **Neg_UI_XXXX**: Negative UI Test Cases

## Author
Created for IT3040 - ITPM Assignment 1
BSc (Hons) in Information Technology - Year 3
IT23624030-W.M.R.S.K.Wijesinghe
Last Updated: January 2026