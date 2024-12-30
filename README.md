## Prerequisites

Ensure you have the following installed:

- **Node.js** (version 14.18+ or 16+ recommended)
- **pnpm** (preferred package manager)

If you don't have `pnpm` installed, install it globally:
```bash
npm install -g pnpm
```

---

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Zeftiroth/civi-portal.git
   cd civi-portal
   ```

2. **Install Dependencies**
   Use `pnpm` to install project dependencies:
   ```bash
   pnpm install
   ```

---

## Running the Application

1. **Start the Development Server**
   Run the following command to start the development server:
   ```bash
   pnpm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

2. **Build the Application**
   To build the project for production:
   ```bash
   pnpm run build
   ```

3. **Preview the Production Build**
   After building, you can preview the app:
   ```bash
   pnpm run preview
   ```
