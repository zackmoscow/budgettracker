const Chart = require("chart.js");
import { useIndexedDb } from "./indexedDb";

const ctx = document.getElementById("balChart");
export const expenseChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Expense cost in $",
        data: [],
        borderColor: [
          "rgba(255, 99, 132, 1)"
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    title: {
      text: "Balance Chart"
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
});

export function updateChart(expenseChart, name, balance) {
  expenseChart.data.labels.push(name);
  expenseChart.data.datasets.forEach(dataset => {
    console.log(dataset);
    dataset.data.push(balance);
  });
  expenseChart.update();
};

export function resetChart(expenseChart) {
  expenseChart.data.labels = [];
  expenseChart.data.datasets.forEach(dataset => {
    dataset.data = [];
  });
  expenseChart.update();
};

useIndexedDb("expense", "expenseStore", "get").then(results => {
  console.log(results);
  results.forEach(expense => {
    updateChart(expenseChart, expense.name, expense.balance);
  });
});

useIndexedDb();
