const metrics = [
  {
    id: "revenue",
    name: "Revenue",
    category: "sales",
    description: `The total money your sales bring in before any costs are removed. It shows how big your business is, but not how healthy it is.`,
    formula: `Units sold × price per unit`,
    example: `A bakery sells 160 orders in June and brings in $6,900.`
  },
  {
    id: "average-order-value",
    name: "Average order value",
    category: "sales",
    description: `The typical amount a customer spends on one order. Raising it is often easier than finding new customers.`,
    formula: `Total revenue ÷ number of orders`,
    example: `$6,900 ÷ 160 orders = $43.13 per order.`
  },
  {
    id: "conversion-rate",
    name: "Conversion rate",
    category: "sales",
    description: `The share of visitors who actually buy. It shows how well your shop, stall or website turns interest into sales.`,
    formula: `Buyers ÷ visitors × 100`,
    example: `10 buyers out of 200 visitors = 5 percent.`
  },
  {
    id: "retention-rate",
    name: "Customer retention rate",
    category: "customers",
    description: `The share of your customers who buy from you again. Loyal customers usually cost less to serve than new ones.`,
    formula: `Customers who bought again ÷ customers at the start × 100`,
    example: `80 of 100 customers return the next month = 80 percent.`
  },
  {
    id: "acquisition-cost",
    name: "Customer acquisition cost",
    category: "customers",
    description: `How much you spend, on average, to win one new customer. If it is higher than what a customer spends, the business loses money.`,
    formula: `Marketing spend ÷ new customers`,
    example: `$500 on advertising brings 25 new customers, so each costs $20.`
  },
  {
    id: "inventory-turnover",
    name: "Inventory turnover",
    category: "products",
    description: `How many times you sell and replace your stock in a period. A low number can mean money is stuck in products that are not selling.`,
    formula: `Cost of goods sold ÷ average value of stock`,
    example: `$12,000 of goods sold with $3,000 of stock on hand = 4 turns.`
  },
  {
    id: "gross-margin",
    name: "Gross profit margin",
    category: "profit",
    description: `The share of revenue left after paying for the goods or ingredients you sold. It shows whether your prices cover your product costs.`,
    formula: `(Revenue − cost of goods sold) ÷ revenue × 100`,
    example: `($6,900 − $3,100) ÷ $6,900 × 100 = 55 percent.`
  },
  {
    id: "net-margin",
    name: "Net profit margin",
    category: "profit",
    description: `The share of revenue you keep after all costs, including rent, wages and tax. It is the clearest sign of overall financial health.`,
    formula: `Net profit ÷ revenue × 100`,
    example: `$1,300 profit on $6,900 revenue = 18.8 percent.`
  }
];

const metricsList = document.querySelector("#metrics-list");
const filterButtons = document.querySelectorAll(".filter-button");
const statusMessage = document.querySelector("#metrics-status");

let currentFilter = "all";
let favorites = loadFavorites();

function loadFavorites() {
  const saved = localStorage.getItem("favoriteMetrics");
  return saved ? JSON.parse(saved) : [];
}

function saveFavorites() {
  localStorage.setItem("favoriteMetrics", JSON.stringify(favorites));
}

function getVisibleMetrics() {
  if (currentFilter === "all") {
    return metrics;
  }
  if (currentFilter === "favorites") {
    return metrics.filter((metric) => favorites.includes(metric.id));
  }
  return metrics.filter((metric) => metric.category === currentFilter);
}

function createMetricCard(metric) {
  const isFavorite = favorites.includes(metric.id);
  return `
    <article class="metric-card">
      <p class="metric-category">${metric.category}</p>
      <h3>${metric.name}</h3>
      <p>${metric.description}</p>
      <p class="formula"><strong>Formula:</strong> ${metric.formula}</p>
      <p><strong>Example:</strong> ${metric.example}</p>
      <button type="button" class="favorite-button" data-id="${metric.id}" aria-pressed="${isFavorite}">${isFavorite ? `Saved` : `Save`}</button>
    </article>`;
}

function displayMetrics() {
  const visibleMetrics = getVisibleMetrics();

  if (visibleMetrics.length === 0) {
    metricsList.innerHTML = `<p class="empty-message">You have not saved any metrics yet. Use the Save button on a metric card to keep it here.</p>`;
  } else {
    metricsList.innerHTML = visibleMetrics.map(createMetricCard).join(``);
  }

  statusMessage.textContent = `Showing ${visibleMetrics.length} of ${metrics.length} metrics`;
}

function setFilter(button) {
  currentFilter = button.dataset.filter;
  filterButtons.forEach((filterButton) => {
    filterButton.setAttribute("aria-pressed", filterButton === button);
  });
  displayMetrics();
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter((favoriteId) => favoriteId !== id);
  } else {
    favorites.push(id);
  }

  saveFavorites();
  displayMetrics();

  const updatedButton = metricsList.querySelector(`[data-id="${id}"]`);
  if (updatedButton) {
    updatedButton.focus();
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFilter(button));
});

metricsList.addEventListener("click", (event) => {
  const favoriteButton = event.target.closest(".favorite-button");
  if (favoriteButton) {
    toggleFavorite(favoriteButton.dataset.id);
  }
});

displayMetrics();
