import React, { useState, useEffect } from 'react';

function readJsonFile(file, setter) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      setter(data);
    } catch (err) {
      alert('Invalid JSON file');
    }
  };
  reader.readAsText(file);
}

function CashflowUploader() {
  const [accountsReceivable, setAccountsReceivable] = useState([]);
  const [accountsPayable, setAccountsPayable] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [forecastedWork, setForecastedWork] = useState([]);
  const [bankStatements, setBankStatements] = useState([]);
  const [cardStatements, setCardStatements] = useState([]);
  const [duplicates, setDuplicates] = useState([]);

  useEffect(() => {
    if (bankStatements.length && cardStatements.length) {
      const bankSet = new Set(
        bankStatements.map(
          (tx) => tx.id || `${tx.date}-${tx.amount}-${tx.description}`
        )
      );
      const dup = cardStatements.filter((tx) => {
        const key = tx.id || `${tx.date}-${tx.amount}-${tx.description}`;
        return bankSet.has(key);
      });
      setDuplicates(dup);
    }
  }, [bankStatements, cardStatements]);

  return (
    <div>
      <h2>Upload Datasets</h2>
      <div>
        <label>
          Accounts Receivable:
          <input type="file" onChange={(e) => readJsonFile(e.target.files[0], setAccountsReceivable)} />
        </label>
      </div>
      <div>
        <label>
          Accounts Payable:
          <input type="file" onChange={(e) => readJsonFile(e.target.files[0], setAccountsPayable)} />
        </label>
      </div>
      <div>
        <label>
          Purchase Orders:
          <input type="file" onChange={(e) => readJsonFile(e.target.files[0], setPurchaseOrders)} />
        </label>
      </div>
      <div>
        <label>
          Forecasted Work:
          <input type="file" onChange={(e) => readJsonFile(e.target.files[0], setForecastedWork)} />
        </label>
      </div>
      <div>
        <label>
          Bank Statements:
          <input type="file" onChange={(e) => readJsonFile(e.target.files[0], setBankStatements)} />
        </label>
      </div>
      <div>
        <label>
          Credit Card Statements:
          <input type="file" onChange={(e) => readJsonFile(e.target.files[0], setCardStatements)} />
        </label>
      </div>
      {duplicates.length > 0 && (
        <div>
          <h3>Duplicate Transactions</h3>
          <pre>{JSON.stringify(duplicates, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CashflowUploader;
