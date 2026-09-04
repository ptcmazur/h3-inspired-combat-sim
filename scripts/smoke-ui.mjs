import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
import { chromium } from 'playwright'

const url = process.argv[2] ?? 'http://127.0.0.1:4176/h3-inspired-combat-sim/'
const screenshotDirectory = process.env.SMOKE_SCREENSHOT_DIR
if (screenshotDirectory) await mkdir(screenshotDirectory, { recursive: true })
const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL ?? (process.platform === 'win32' ? 'msedge' : undefined),
  headless: true,
})

try {
  for (const width of [360, 768, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } })
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('response', response => {
      if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`)
    })
    const presetResponse = page.waitForResponse(response => response.url().endsWith('/data/presets.v1.json'))
    assert.equal((await page.goto(url)).status(), 200)
    assert.equal((await presetResponse).status(), 200)
    const overflow = () => page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
    assert.equal(await overflow(), false, `Initial overflow at ${width}px`)
    await page.getByRole('button', { name: /apply preset/i }).click()
    await page.getByRole('button', { name: /run simulation/i }).click()
    await page.getByTestId('sticky-results').waitFor()
    await page.getByLabel(/language/i).selectOption('pl')
    await page.getByText(/Log przedstawia jedną walkę z serii/).waitFor()
    const damageRound = page.locator('.round-log-section').filter({ has: page.locator('.damage-details') }).first()
    if (await damageRound.getAttribute('open') === null) await damageRound.locator('summary').first().click()
    await damageRound.getByText('Jak policzono obrażenia?', { exact: true }).first().click()
    await damageRound.getByText(/zaokrąglenie w dół/).first().waitFor()
    assert.equal(await overflow(), false, `Results overflow at ${width}px`)
    if (width <= 768) assert.equal(await page.getByTestId('sticky-results').evaluate(el => getComputedStyle(el).position), 'static')
    if (screenshotDirectory) await page.screenshot({ path: `${screenshotDirectory}/ui-${width}.png`, fullPage: true })
    await page.getByRole('spinbutton', { name: 'Symulacje', exact: true }).fill('5001')
    assert.equal(await page.getByRole('button', { name: /uruchom/i }).isDisabled(), true)
    await page.getByRole('alert').waitFor()
    assert.equal(await page.getByTestId('sticky-results').count(), 0)
    await page.getByRole('spinbutton', { name: 'Symulacje', exact: true }).fill('100')
    const run = page.getByRole('button', { name: /uruchom/i })
    await run.focus()
    await page.keyboard.press('Enter')
    await page.getByTestId('sticky-results').waitFor()
    assert.deepEqual(errors, [], `Browser errors at ${width}px`)
    console.log(`PASS ${width}px: JSON, preset, simulation, Polish log, damage details, validation, keyboard, no overflow`)
    await page.close()
  }
} finally {
  await browser.close()
}
