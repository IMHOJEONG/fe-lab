import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => { await page.goto('/#explore'); });

test('all comparison toggles are independent and keep their input values', async ({ page }) => {
  const demos = page.locator('.tech-demo');
  await expect(demos).toHaveCount(5);
  for (let i = 0; i < 5; i++) {
    await expect(demos.nth(i).getByRole('button', { name: '적용 후', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await demos.nth(i).getByRole('button', { name: '적용 전', exact: true }).click();
    await expect(demos.nth(i).getByRole('button', { name: '적용 전', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await demos.nth(i).getByRole('button', { name: '적용 후', exact: true }).click();
  }
  await page.getByLabel('컨테이너 너비', { exact: true }).fill('55');
  await demos.first().getByRole('button', { name: '적용 전', exact: true }).click();
  await expect(page.getByLabel('컨테이너 너비', { exact: true })).toHaveValue('55');
  await expect(demos.nth(1).getByRole('button', { name: '적용 후', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('container query changes actual card layout at narrow widths', async ({ page }) => {
  const demo = page.locator('.tech-demo').nth(0);
  await page.getByLabel('컨테이너 너비', { exact: true }).fill('55');
  const direction = () => demo.locator('.responsive-card').evaluate(el => getComputedStyle(el).flexDirection);
  await expect.poll(direction).toBe('column');
  await demo.getByRole('button', { name: '적용 전', exact: true }).click();
  await expect.poll(direction).toBe('row');
  await demo.getByRole('button', { name: '적용 후', exact: true }).click();
  await expect.poll(direction).toBe('column');
});

test('subgrid aligns content rows and disabling it removes alignment', async ({ page }) => {
  const demo = page.locator('.tech-demo').nth(1);
  const difference = () => demo.locator('.aligned-card p').evaluateAll(els => Math.abs(els[0].getBoundingClientRect().top - els[1].getBoundingClientRect().top));
  await expect.poll(difference).toBeLessThan(1);
  await demo.getByRole('button', { name: '적용 전', exact: true }).click();
  await expect.poll(difference).toBeGreaterThan(10);
  await demo.getByRole('button', { name: '적용 후', exact: true }).click();
  await expect.poll(difference).toBeLessThan(1);
});

test('scroll snap settles on a slide only when enabled', async ({ page }) => {
  const demo = page.locator('.tech-demo').nth(2);
  const track = demo.locator('.snap-track');
  await demo.getByRole('button', { name: '적용 전', exact: true }).click();
  await track.evaluate(el => { el.scrollLeft = 73; });
  await expect.poll(() => track.evaluate(el => el.scrollLeft)).toBe(73);
  await demo.getByRole('button', { name: '적용 후', exact: true }).click();
  await track.evaluate(el => { el.scrollLeft = 73; });
  await expect.poll(() => track.evaluate(el => {
    const box = el.getBoundingClientRect();
    return Math.min(...Array.from(el.children).map(child => {
      const rect = child.getBoundingClientRect();
      return Math.abs(rect.left + rect.width / 2 - box.left - box.width / 2);
    }), Math.abs(el.scrollLeft));
  })).toBeLessThan(2);
});

test('quantity updates calculated total while before example remains fixed', async ({ page }) => {
  const demo = page.locator('.tech-demo').nth(3);
  await expect(demo.getByRole('button', { name: '수량 줄이기' })).toBeDisabled();
  await demo.getByRole('button', { name: '수량 늘리기' }).click();
  await expect(demo.locator('.calculated-total')).toHaveText('48,000원');
  await demo.getByRole('button', { name: '적용 전', exact: true }).click();
  await expect(demo.locator('.fixed-total')).toBeVisible();
  await demo.getByRole('button', { name: '수량 늘리기' }).click();
  await expect(demo.locator('.fixed-total')).toContainText('24,000원');
  await demo.getByRole('button', { name: '적용 후', exact: true }).click();
  await expect(demo.locator('.calculated-total')).toHaveText('72,000원');
});

test('3D comparison disables transforms and restores selected angle', async ({ page }) => {
  const demo = page.locator('.tech-demo').nth(4);
  await page.getByLabel('회전 각도', { exact: true }).fill('180');
  const transform = () => demo.locator('.css-cube').evaluate(el => getComputedStyle(el).transform);
  await expect.poll(transform).not.toBe('none');
  await demo.getByRole('button', { name: '적용 전', exact: true }).click();
  await expect.poll(transform).toBe('none');
  await expect(page.getByLabel('회전 각도', { exact: true })).toHaveValue('180');
  await demo.getByRole('button', { name: '적용 후', exact: true }).click();
  await expect.poll(transform).not.toBe('none');
});
