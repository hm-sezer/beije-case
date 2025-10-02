# AI Usage Log

## October 2, 2025 - Project Setup

### Initial Structure

**What I did manually:**
```bash
mkdir -p frontend backend shared docs
```

Created monorepo folder structure with:
- `frontend/` - for Next.js app
- `backend/` - for NestJS API  
- `shared/` - for shared types
- `docs/` - for documentation

### Configuration Files

**What I asked AI to do:**

1. **package.json** - Create root package.json with:
   - npm workspaces configuration for monorepo (frontend, backend, shared)
   - Scripts using `concurrently` to run both servers simultaneously
   - Workspace-level commands (dev, build, test, lint)
   - Node.js 18+ requirement

2. **.gitignore** - Create comprehensive gitignore with:
   - node_modules and all package manager files
   - Build outputs (.next, dist, build)
   - Environment files (.env variants)
   - Log files (npm, yarn, pnpm)
   - Database files (*.sqlite, *.db)
   - Editor configs (.vscode, .idea, .DS_Store)
   - Coverage and cache directories

**Result:** Got clean configuration files for monorepo setup with concurrent dev server execution.

### README Creation

**What I asked AI to do:**

Create a `README.md` file with the following structure:
- Project title and description
- Monorepo structure explanation (frontend, backend, shared, docs folders)
- Quick start guide with prerequisites (Node.js 18+, npm, Git)
- Installation steps (clone, install, dev commands)
- Features section listing:
  - Frontend: Custom package selection, responsive design, state management
  - Backend: Email verification, REST API, database integration
- Development scripts (dev, build, test, lint)
- API documentation with 3 endpoints:
  - POST /user/register
  - GET /user/verify-email/:username/:token
  - GET /user/check-verification/:username
- Testing strategy mention (unit, integration, E2E)
- AI assistance disclosure section
- Deployment, contributing, and license sections

**Result:** Got a comprehensive README that explains the full project scope and setup.

---

## Frontend Development - October 2, 2025

### Next.js and Dependencies Setup

**What I did manually:**

1. **Next.js Initialization**:
   ```bash
   cd frontend
   npx create-next-app@latest .
   ```
   - Setup Next.js 15 with TypeScript
   - Configured App Router
   - Enabled ESLint

2. **shadcn Setup** (using latest CLI):
   ```bash
   npx shadcn@latest init
   ```
   - Selected neutral color theme
   - Configured for Next.js App Router
   - CSS variables enabled

3. **shadcn Components**:
   ```bash
   npx shadcn@latest add button card accordion badge separator
   ```

4. **State Management and Utils**:
   ```bash
   npm install @reduxjs/toolkit react-redux axios
   ```

**Why:** Needed component library and state management infrastructure before building the custom package selection page replica.

**Result:** Clean Next.js 15 setup with shadcn components and Redux ready for development.

---

### Product Types and Data Model

**What I asked AI to do:**

Create TypeScript type definitions based on the beije.co/custom-packet page structure I analyzed:

**Page Structure I Defined:**
- 2 main tabs: "Menstrüel Ürünler" and "Destekleyici Ürünler"

**Menstrüel Ürünler Tab:**
- beije Ped: Standart Ped, Süper Ped, Süper+ Ped
- beije Günlük Ped: Günlük Ped, Süper Günlük Ped, Tanga Günlük Ped
- beije Tampon: Mini Tampon, Standart Tampon, Süper Tampon

**Destekleyici Ürünler Tab:**
- Isı Bandı: 2'li Paket Isı Bandı, 4'lü Paket Isı Bandı
- beije Cycle Essentials: beije Cycle Essentials
- beije Cranberry Essentials: beije Cranberry Essentials

**Additional Rules:**
- Each category and product has its own icon/SVG
- Menstrual products increment by 10 units
- Support products increment by 1 unit
- Categories have descriptions
- Two purchase types: Subscription (auto-renews every 2 months) and One-time (single purchase)
- Cart groups products by sub-category, with purchase type selection per sub-category

**Types Created:**
- `ProductCategory` enum for tab filtering (menstrual/support)
- `Product` interface with category hierarchy, icons, dual pricing (subscription/one-time), and quantity rules
- `PurchaseType` type for subscription vs one-time selection
- `SubCategoryInfo` for category descriptions and icons
- `CartProduct` for individual product quantities
- `CartItem` for sub-category-based cart grouping with nested products
- `PackageState` for Redux store structure

**Why:** Needed a clear type system reflecting beije's cart behavior where products are grouped by sub-category with independent purchase type selection.

**Result:** Type-safe foundation matching beije's cart structure with sub-category grouping and flexible purchase options.

---

### Redux Store Implementation

**What I asked AI to do:**

Implement Redux Toolkit store for cart management based on the cart behavior I analyzed from beije.co:

**Cart Requirements I Defined:**
- Products must be grouped by sub-category (e.g., "beije Ped", "Isı Bandı")
- Each sub-category group has its own purchase type (subscription or one-time)
- Multiple products can exist within one sub-category group
- Adding a product to an existing sub-category should increment quantity
- Removing the last product from a sub-category should remove the entire group
- Price calculation must respect purchase type (subscription price vs one-time price)
- Cart should support separate views for subscription and one-time items

**Redux Structure I Requested:**

1. **Store Setup** (`store/store.ts`):
   - Configure Redux Toolkit store
   - Export TypeScript types for RootState and AppDispatch

2. **Custom Hooks** (`store/hooks.ts`):
   - Type-safe useAppDispatch and useAppSelector hooks
   - Using React-Redux's withTypes API for better TypeScript support

3. **Package Slice** (`store/slices/packageSlice.ts`) with actions:
   - `addProduct`: Add or increment product quantity within sub-category groups
   - `removeProduct`: Decrement quantity and auto-remove empty groups
   - `updateProductQuantity`: Direct quantity update for input fields
   - `setPurchaseType`: Change subscription/one-time selection per sub-category
   - `clearSubCategory`: Remove entire sub-category group
   - `clearCart`: Empty the cart

4. **Selectors for data access**:
   - `selectCartItems`: All cart items
   - `selectSubscriptionItems`: Filter subscription-only groups
   - `selectOneTimeItems`: Filter one-time purchase groups  
   - `selectTotalPrice`: Calculate total with purchase-type-based pricing
   - `selectSubCategoryTotal`: Calculate price per sub-category

5. **Provider Setup** (`components/providers.tsx`):
   - Create client component wrapper for Redux Provider
   - Integrate into app layout for global state access

**Why:** Needed complete state management matching beije's cart logic with sub-category grouping and dual pricing structure.

**Result:** Fully functional Redux store with sub-category-based cart management, purchase type flexibility, and accurate price calculations.

---

### Next Steps
- Setup NestJS backend
- Implement custom package selection page
- Add tests

