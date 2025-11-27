const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
// console.log(localStorage);

transactionFormEl.addEventListener("submit", addTransaction);

function addTransaction(e) {
    e.preventDefault();

    // get form values
    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);

    transactions.push({
        id: Date.now(),
        description,
        amount,
    });
    // console.log(transactions);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();

    transactionFormEl.reset();
}

function updateTransactionList() {
    transactionListEl.innerHTML = "";
    // console.log(transactions);

    const sortedTransactions = [...transactions].reverse();
    // console.log(sortedTransactions);

    sortedTransactions.forEach((transaction) => {
        const transactionEl = createTransactionElement(transaction);
        transactionListEl.appendChild(transactionEl);
    });
}

function createTransactionElement(transaction) {
    const liEl = document.createElement("li");
    
    liEl.classList.add("transaction");
    liEl.classList.add(transaction.amount > 0 ? "income" : "expense");

    liEl.innerHTML = `
        <span>${transaction.description}</span>
        <span>
        ${formatCurrency(transaction.amount)}
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        </span>
    `;

    return liEl;
}

function updateSummary() {
    // 1000, -400, 500, -100 => 1000
    const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    
    const income = transactions
        .filter((transaction) => transaction.amount > 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    
    const expense = transactions
        .filter((transaction) => transaction.amount < 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    
    // update ui => update format
    balanceEl.textContent = formatCurrency(balance);
    incomeAmountEl.textContent = formatCurrency(income);
    expenseAmountEl.textContent = formatCurrency(expense);
}

function formatCurrency(number) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    }).format(number);
}
// other examples: ['en-IN', 'INR' -> India], ['en-US', 'US' -> USA], ['de-DE', 'EUR' -> Europe/Germany ]

function removeTransaction(id) {
    // delete the unwanted transaction
    transactions = transactions.filter((transaction) => transaction.id !== id);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();
}

// start render
updateTransactionList();
updateSummary();