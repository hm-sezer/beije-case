import { test, expect } from '@playwright/test';

/**
 * Custom Package Selection - 5 Core Tests
 */

test.describe('Package Selection Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  test('1. Page loads successfully and displays core elements', async ({ page }) => {
    // Başlık
    await expect(page.getByRole('heading', { name: /Kendi Paketini Oluştur/i })).toBeVisible();
    
    // Tablar
    await expect(page.getByRole('tab', { name: /Menstrüel Ürünler/i })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Destekleyici Ürünler/i })).toBeVisible();
    
    // İlk accordion açık (Standart Ped görünür olmalı)
    await expect(page.locator('text=Standart Ped').first()).toBeVisible();
    
    // Cart sidebar başlığı
    await expect(page.getByText('Özel Paketin').first()).toBeVisible();
  });

  test('2. Product can be added and appears in cart', async ({ page }) => {
    // Click + button
    await page.getByTestId('increase-quantity').first().evaluate((el: HTMLElement) => el.click());
    await page.waitForTimeout(2000);
    
    // Sepette "10 x Standart Ped" formatında görünmeli (boşluklu)
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toContain('10 x');
    expect(bodyText).toContain('Standart Ped');
    
    // "Sepete Ekle" butonu aktif ve fiyat gösteriyor
    const addToCartBtn = page.getByRole('button', { name: /Sepete Ekle/i }).first();
    await expect(addToCartBtn).toBeEnabled();
    
    const btnText = await addToCartBtn.textContent();
    expect(btnText).toContain('₺'); // Fiyat var
  });

  test('3. Product quantity can be increased and decreased', async ({ page }) => {
    const increaseBtn = page.getByTestId('increase-quantity').first();
    const decreaseBtn = page.getByTestId('decrease-quantity').first();
    
    // 2 kez artır
    await increaseBtn.evaluate((el: HTMLElement) => el.click());
    await page.waitForTimeout(1000);
    await increaseBtn.evaluate((el: HTMLElement) => el.click());
    await page.waitForTimeout(1000);
    
    // 20 x olmalı (boşluklu)
    let bodyText = await page.locator('body').textContent();
    expect(bodyText).toContain('20 x');
    
    // 1 kez azalt
    await decreaseBtn.evaluate((el: HTMLElement) => el.click());
    await page.waitForTimeout(1000);
    
    // 10 x'e düşmeli (boşluklu)
    bodyText = await page.locator('body').textContent();
    expect(bodyText).toContain('10 x');
  });

  test('4. Tab switching works correctly', async ({ page }) => {
    // Destekleyici Ürünler'e geç
    await page.getByRole('tab', { name: /Destekleyici Ürünler/i }).click();
    await page.waitForTimeout(500);
    
    // Tab aktif mi?
    await expect(page.getByRole('tab', { name: /Destekleyici Ürünler/i }))
      .toHaveAttribute('aria-selected', 'true');
    
    // İçerik değişti mi?
    await expect(page.locator('text=Isı Bandı').first()).toBeVisible();
  });

  test('5. Navigation to cart page works correctly', async ({ page }) => {
    // Ürün ekle
    await page.getByTestId('increase-quantity').first().evaluate((el: HTMLElement) => el.click());
    await page.waitForTimeout(2000);
    
    // "Sepete Ekle" butonuna tıkla
    await page.getByRole('button', { name: /Sepete Ekle/i }).first().click();
    
    // Cart sayfasına gitti mi?
    await expect(page).toHaveURL(/.*\/cart/);
    await expect(page.getByRole('heading', { name: /Sepetim/i })).toBeVisible();
  });
});
