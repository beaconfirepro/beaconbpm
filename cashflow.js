const fs = require('fs');

function processCashflow(transactions) {
  const summary = {};
  let total = 0;
  for (const tx of transactions) {
    const date = new Date(tx.date);
    if (isNaN(date)) {
      console.error(`Invalid date: ${tx.date}`);
      continue;
    }
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    summary[month] = (summary[month] || 0) + tx.amount;
    total += tx.amount;
  }
  return { summary, total };
}

function main() {
  const filePath = process.argv[2] || './cashflow.json';
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const { summary, total } = processCashflow(data);
  console.log('Monthly cashflow:');
  for (const month of Object.keys(summary).sort()) {
    console.log(`${month}: ${summary[month].toFixed(2)}`);
  }
  console.log(`Total cashflow: ${total.toFixed(2)}`);
}

if (require.main === module) {
  main();
}

module.exports = processCashflow;
