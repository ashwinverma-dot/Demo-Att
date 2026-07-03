/**
 * Unit tests for link validation in the attendance management system
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

class LinkChecker {
  constructor(htmlFilePath) {
    this.htmlFile = fs.readFileSync(htmlFilePath, 'utf8');
    this.$ = cheerio.load(this.htmlFile);
    this.results = {
      passed: 0,
      failed: 0,
      tests: [],
    };
  }

  /**
   * Test: Verify index.html exists
   */
  testIndexHtmlExists() {
    const test = 'Index HTML file exists';
    try {
      if (fs.existsSync('index.html')) {
        this.results.tests.push({ test, status: 'PASS', message: 'index.html found' });
        this.results.passed++;
      } else {
        this.results.tests.push({ test, status: 'FAIL', message: 'index.html not found' });
        this.results.failed++;
      }
    } catch (error) {
      this.results.tests.push({ test, status: 'FAIL', message: error.message });
      this.results.failed++;
    }
  }

  /**
   * Test: Verify stylesheet link exists and is valid
   */
  testStylesheetLinks() {
    const test = 'Stylesheet links are valid';
    try {
      const links = this.$('link[rel="stylesheet"]');
      if (links.length === 0) {
        this.results.tests.push({ test, status: 'FAIL', message: 'No stylesheet found' });
        this.results.failed++;
        return;
      }

      let allValid = true;
      links.each((i, elem) => {
        const href = this.$(elem).attr('href');
        if (!fs.existsSync(href)) {
          allValid = false;
          console.log(`  ✗ Stylesheet not found: ${href}`);
        } else {
          console.log(`  ✓ Stylesheet found: ${href}`);
        }
      });

      if (allValid) {
        this.results.tests.push({ test, status: 'PASS', message: `${links.length} stylesheet(s) found and valid` });
        this.results.passed++;
      } else {
        this.results.tests.push({ test, status: 'FAIL', message: 'Some stylesheets not found' });
        this.results.failed++;
      }
    } catch (error) {
      this.results.tests.push({ test, status: 'FAIL', message: error.message });
      this.results.failed++;
    }
  }

  /**
   * Test: Verify all anchor links point to valid locations
   */
  testAnchorLinks() {
    const test = 'Anchor links are valid';
    try {
      const links = this.$('a[href]');
      if (links.length === 0) {
        this.results.tests.push({ test, status: 'PASS', message: 'No anchor links found' });
        this.results.passed++;
        return;
      }

      let validCount = 0;
      let invalidCount = 0;

      links.each((i, elem) => {
        const href = this.$(elem).attr('href');
        
        // Skip email and javascript links
        if (href.startsWith('mailto:') || href.startsWith('javascript:')) {
          validCount++;
          return;
        }

        // Check local file links
        if (!href.startsWith('http') && !href.startsWith('//') && !href.startsWith('#')) {
          if (fs.existsSync(href)) {
            validCount++;
            console.log(`  ✓ Local link valid: ${href}`);
          } else {
            invalidCount++;
            console.log(`  ✗ Local link broken: ${href}`);
          }
        } else if (href.startsWith('#')) {
          // Hash links - verify element exists
          const id = href.substring(1);
          if (this.$(`#${id}`).length > 0) {
            validCount++;
          } else {
            invalidCount++;
            console.log(`  ✗ Hash link broken: ${href}`);
          }
        } else {
          validCount++;
        }
      });

      if (invalidCount === 0) {
        this.results.tests.push({ test, status: 'PASS', message: `${links.length} anchor link(s) validated` });
        this.results.passed++;
      } else {
        this.results.tests.push({ test, status: 'FAIL', message: `${invalidCount} broken link(s) found` });
        this.results.failed++;
      }
    } catch (error) {
      this.results.tests.push({ test, status: 'FAIL', message: error.message });
      this.results.failed++;
    }
  }

  /**
   * Test: Verify all form inputs have proper attributes
   */
  testFormInputs() {
    const test = 'Form inputs are properly configured';
    try {
      const inputs = this.$('input[id], button[id]');
      if (inputs.length === 0) {
        this.results.tests.push({ test, status: 'PASS', message: 'No form inputs found' });
        this.results.passed++;
        return;
      }

      let validCount = 0;
      inputs.each((i, elem) => {
        const id = this.$(elem).attr('id');
        if (id) {
          validCount++;
        }
      });

      if (validCount === inputs.length) {
        this.results.tests.push({ test, status: 'PASS', message: `${inputs.length} form element(s) have valid IDs` });
        this.results.passed++;
      } else {
        this.results.tests.push({ test, status: 'FAIL', message: 'Some form elements missing IDs' });
        this.results.failed++;
      }
    } catch (error) {
      this.results.tests.push({ test, status: 'FAIL', message: error.message });
      this.results.failed++;
    }
  }

  /**
   * Test: Verify CSS file exists
   */
  testCssFileExists() {
    const test = 'CSS file exists and is valid';
    try {
      if (fs.existsSync('styles.css')) {
        const css = fs.readFileSync('styles.css', 'utf8');
        if (css.length > 0) {
          this.results.tests.push({ test, status: 'PASS', message: 'styles.css is valid' });
          this.results.passed++;
        } else {
          this.results.tests.push({ test, status: 'FAIL', message: 'styles.css is empty' });
          this.results.failed++;
        }
      } else {
        this.results.tests.push({ test, status: 'FAIL', message: 'styles.css not found' });
        this.results.failed++;
      }
    } catch (error) {
      this.results.tests.push({ test, status: 'FAIL', message: error.message });
      this.results.failed++;
    }
  }

  /**
   * Run all tests
   */
  runAllTests() {
    console.log('\n🧪 Running Unit Tests for Link Validation\n');
    console.log('━'.repeat(60));

    this.testIndexHtmlExists();
    this.testCssFileExists();
    this.testStylesheetLinks();
    this.testAnchorLinks();
    this.testFormInputs();

    console.log('━'.repeat(60));
    console.log('\n📊 Test Results:\n');
    this.results.tests.forEach((result) => {
      const icon = result.status === 'PASS' ? '✓' : '✗';
      console.log(`${icon} ${result.test}: ${result.message}`);
    });

    console.log(`\n📈 Summary: ${this.results.passed} passed, ${this.results.failed} failed\n`);

    if (this.results.failed > 0) {
      process.exit(1);
    }
  }
}

// Run tests
try {
  const checker = new LinkChecker('index.html');
  checker.runAllTests();
} catch (error) {
  console.error('❌ Test runner error:', error.message);
  process.exit(1);
}
