# Customer Validation

A Node.js backend for validating customer CSV data by phone and order date.

## Project structure

- `TransactionValidator/backend/server.js` - Express backend server
- `TransactionValidator/backend/routes/upload.js` - CSV upload and validation endpoint
- `TransactionValidator/backend/validators/` - phone and date validation logic
- `TransactionValidator/test.html` - simple local upload test page
- `output/cleaned.csv` - generated output for valid rows

## Run locally

1. Open PowerShell in the repository root:

```powershell
cd "e:\customer validation"
```

2. Install dependencies:

```powershell
npm install
```

3. Start the app:

```powershell
npm start
```

4. Open the backend in your browser:

```text
http://localhost:5000/
```

5. Open `TransactionValidator/test.html` in a browser and upload a CSV file.

## API

- `POST /api/upload`
- Request body: multipart form-data with `file`
- Response JSON includes:
  - `totalRows`
  - `validRows`
  - `output` (filename)

## Deployment

### Recommended: Render

1. Create an account at https://render.com
2. Connect your GitHub repository `gokulllp/Transactionvalidator`
3. Create a new **Web Service**
4. Use these settings:
   - Build command: `npm install`
   - Start command: `npm start`
   - Root directory: repository root
5. Deploy

### What changed for deployment

- `TransactionValidator/backend/server.js` now listens on `process.env.PORT || 5000`
- `package.json` includes a root `start` command for deployment

## Notes

- The frontend test page uses `http://localhost:5000/api/upload`.
- If you deploy the backend, update the front-end upload URL to the deployed service URL.
