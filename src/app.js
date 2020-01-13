import { add } from "./calculations";
import { balanceEl, expenseEl, expensesListEl, priceEl, expenseBtn, depositBtn, resetBtn } from "./elements";
import { useIndexedDb } from "./indexedDb";

let total = 2000;
balanceEl.innerText = total;

function addToList(name, price) {
  expensesListEl.innerHTML += `<li class="list-group-item">Name: ${name}
    <span class="ml-4">Price: ${price}</span></li>`;
}

function submitExpense(e) {
  e.preventDefault();
  const expenseVal = Number(priceEl.value) * (-1);
  total = add(Number(balanceEl.innerText), expenseVal);
  balanceEl.innerText = total;
  addToList(expenseEl.value, expenseVal);
  useIndexedDb("expense", "expenseStore", "put", {
    _id: expenseEl.value,
    name: expenseEl.value,
    value: expenseVal, 
    balance: total
  });
  expenseEl.value = '';
  priceEl.value = '';
}

function submitDeposit(e) {
  e.preventDefault();
  total = add(Number(balanceEl.innerText), Number(priceEl.value));
  balanceEl.innerText = total;
  addToList(expenseEl.value, priceEl.value);
  useIndexedDb("expense", "expenseStore", "put", {
    _id: expenseEl.value,
    name: expenseEl.value,
    value: priceEl.value,
    balance: total
  });
  expenseEl.value = '';
  priceEl.value = '';
}

function reset(e) {
  e.preventDefault();
  total = 2000;
  balanceEl.innerText = total;
  expensesListEl.innerHTML = "";
  useIndexedDb("expense", "expenseStore", "clear");
}

expenseBtn.onclick = submitExpense;
depositBtn.onclick = submitDeposit;
resetBtn.onclick = reset;

useIndexedDb("expense", "expenseStore", "get").then(results => {
  results.forEach(expense => {
    addToList(expense.name, expense.value);
  });
});
