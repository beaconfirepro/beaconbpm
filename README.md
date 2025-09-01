# beaconbpm

## Cashflow Processor

Add transactions to `cashflow.json` and run the script to see monthly and total cashflow summaries.

```bash
npm run cashflow
```

## Web Interface

Start the development server and open the app on [http://localhost:3000](http://localhost:3000):

```bash
npm start
```

Upload JSON files for:

- Accounts receivable
- Accounts payable
- Purchase orders (future expenses)
- Forecasted work (future receivables)
- Bank statements
- Credit card statements

Each file should contain an array of transaction objects like:

```json
[
  { "id": "1", "date": "2024-01-01", "amount": 1000, "description": "invoice 1" }
]
```

The app checks for duplicate transactions across uploaded bank and credit card statements and lists any overlaps.
