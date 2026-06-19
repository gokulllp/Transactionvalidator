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

## AWS S3 (optional)

To persist and share the cleaned CSV files, the app can upload `cleaned.csv` to an S3 bucket and return a presigned download URL.

1. Create an S3 bucket in your AWS account.
2. Create an IAM user with `s3:PutObject` and `s3:GetObject` permissions for that bucket.
3. Add the following environment variables to your deployment (Render / environment):

```
AWS_ACCESS_KEY_ID=your_key_id
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=your_region (optional)
S3_BUCKET=your-bucket-name
```

4. After uploading a CSV, the API response will include `s3Url` when S3 is configured.

If you want, I can add automatic cleanup of local `output/cleaned.csv` after successful S3 upload.
