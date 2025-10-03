import { test, expect } from '@playwright/test';

/**
 * Cart Page - 5 Core Tests
 */

test.describe('Cart Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Ana sayfaya git ve ürün ekle
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Ürün ekle
    await page.getByTestId('increase-quantity').first().evaluate((el: HTMLElement) => el.click());
    await page.waitForTimeout(2000);
    
    // Cart'a git
    await page.getByRole('button', { name: /Sepete Ekle/i }).first().click();
    await page.waitForURL('**/cart', { timeout: 5000 });
  });

  test('1. Cart page loads successfully and displays products', async ({ page }) => {
    // Sayfa başlığı
    await expect(page.getByRole('heading', { name: /Sepetim/i })).toBeVisible();
    
    // Ürün kartı
    await expect(page.getByText('beije Ped').first()).toBeVisible();
    
    // Ürün detayı (10 adet Standart Ped formatında)
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toContain('10 adet');
    expect(bodyText).toContain('Standart Ped');
  });

  test('2. Order summary and checkout button work correctly', async ({ page }) => {
    // Özet başlığı
    await expect(page.getByRole('heading', { name: /Özet/i })).toBeVisible();
    
    // Kargo bedava
    await expect(page.getByText(/Kargo bedava/i).first()).toBeVisible();
    
    // Sepeti Onayla butonu aktif
    const checkoutBtn = page.getByRole('button', { name: /Sepeti Onayla/i }).first();
    await expect(checkoutBtn).toBeVisible();
    await expect(checkoutBtn).toBeEnabled();
  });

  test('3. Discount code section is present', async ({ page }) => {
    // Başlık
    await expect(page.getByText(/İndirim Kodu Gir/i).first()).toBeVisible();
    
    // Input
    await expect(page.getByPlaceholder(/Kodun/i).first()).toBeVisible();
    
    // Uygula butonu
    await expect(page.getByRole('button', { name: /Uygula/i }).first()).toBeVisible();
  });

  test('4. Package can be deleted from cart', async ({ page }) => {
    // Delete icon'a tıkla
    await page.locator('[data-testid="DeleteOutlineIcon"]').first().click();
    await page.waitForTimeout(1000);
    
    // Boş sepet mesajı görünüyor mu? - "Sepetiniz Boş" veya "Ürün seçmeye başlamak"
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toMatch(/Sepetiniz Boş|Ürün seçmeye başlamak/i);
    
    // Checkout butonu disabled
    const checkoutBtn = page.getByRole('button', { name: /Sepeti Onayla/i }).first();
    await expect(checkoutBtn).toBeDisabled();
  });

  test('5. Edit dialog can be opened and closed', async ({ page }) => {
    // Edit icon'a tıkla
    await page.locator('[data-testid="EditOutlinedIcon"]').first().click();
    await page.waitForTimeout(1000);
    
    // Dialog açıldı mı?
    await expect(page.getByText(/Paketini Özelleştir/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Sepeti Güncelle/i })).toBeVisible();
    
    // Kapat
    await page.locator('[data-testid="CloseIcon"]').first().click();
    await page.waitForTimeout(1000);
    
    // Dialog kapandı mı?
    await expect(page.getByText(/Paketini Özelleştir/i)).not.toBeVisible();
  });
});
