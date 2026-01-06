import { test, expect } from '@playwright/test';

test('inline-circle has expected inline styles', async ({ page }) => {
  await page.setContent(`<!doctype html>
    <html>
      <body>
        <script>
          if (!customElements.get('inline-circle')) {
            customElements.define('inline-circle', class InlineCircle extends HTMLElement {
              connectedCallback() {
                this.style.borderRadius = "48% 52% 45% 55% / 55% 45% 52% 48%";
                this.style.transform = "rotate(-8deg) translateY(6%)";
                this.style.background = "radial-gradient(circle at 40% 60%, #ff9a9e, #fad0c4)";
                this.style.border = "none";
                this.style.width = "0.9em";
                this.style.height = "0.9em";
              }
            });
          }
        </script>

        <inline-circle></inline-circle>
      </body>
    </html>`);

  const props = await page.$eval('inline-circle', el => ({
    borderRadius: el.style.borderRadius,
    transform: el.style.transform,
    background: el.style.background,
    border: el.style.border,
    width: el.style.width,
    height: el.style.height,
  }));

  expect(props.borderRadius).toBe('48% 52% 45% 55% / 55% 45% 52% 48%');
  expect(props.transform).toBe('rotate(-8deg) translateY(6%)');
  expect(props.background).toBe('radial-gradient(circle at 40% 60%, #ff9a9e, #fad0c4)');
  expect(props.border).toBe('none');
  expect(props.width).toBe('0.9em');
  expect(props.height).toBe('0.9em');
});