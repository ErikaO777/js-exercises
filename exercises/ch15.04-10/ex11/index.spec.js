import { test, expect } from '@playwright/test';

const html = `<!DOCTYPE html>
<html lang="ja">
  <head>
    <title>Simple ToDo</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
  </head>
  <body>
    <main>
      <form id="new-todo-form">
        <input type="text" id="new-todo" placeholder="What needs to be done?" />
        <button>Add</button>
      </form>
      <ul id="todo-list"></ul>
    </main>
    <footer>
      <li><a href="#/">All</a></li>
      <li><a href="#/active">Active</a></li>
      <li><a href="#/completed">Completed</a></li>
    </footer>

    <template id="todo-template">
      <li>
        <div class="view">
          <input class="toggle" type="checkbox" />
          <label class="content"></label>
          <button class="destroy">❌</button>
        </div>
      </li>
    </template>
  </body>
</html>`;

test('basic todo page elements and hash links', async ({ page }) => {
    // ページに HTML をセット（ローカルサーバ不要）
    await page.setContent(html);

    // フォームと入力欄の存在確認
    await expect(page.locator('#new-todo-form')).toHaveCount(1);
    await expect(page.locator('#new-todo')).toHaveAttribute('placeholder', 'What needs to be done?');

    // テンプレート要素の存在確認
    await expect(page.locator('template#todo-template')).toHaveCount(1);
    await expect(page.locator('template#todo-template li .view .toggle')).toHaveCount(1);

    // Active リンクをクリックしてハッシュが変わることを確認
    await page.click('footer a[href="#/active"]');
    const hash = await page.evaluate(() => location.hash);
    expect(hash).toBe('#/active');
});