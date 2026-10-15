const quizQuestions = [
  {
    question: `Which metric shows the share of revenue you keep after all costs?`,
    options: [`Conversion rate`, `Net profit margin`, `Average order value`, `Inventory turnover`],
    answer: 1,
    explanation: `Net profit margin is profit divided by revenue, so it shows what you keep after every cost.`
  },
  {
    question: `A shop spends $500 on advertising and wins 25 new customers. What is the customer acquisition cost?`,
    options: [`$5`, `$20`, `$125`, `$525`],
    answer: 1,
    explanation: `$500 divided by 25 new customers is $20 per customer.`
  },
  {
    question: `Out of 200 visitors, 10 make a purchase. What is the conversion rate?`,
    options: [`2 percent`, `5 percent`, `10 percent`, `20 percent`],
    answer: 1,
    explanation: `10 divided by 200, multiplied by 100, is 5 percent.`
  },
  {
    question: `A shop earns $3,000 from 60 orders. What is the average order value?`,
    options: [`$30`, `$50`, `$60`, `$180`],
    answer: 1,
    explanation: `$3,000 divided by 60 orders is $50 per order.`
  },
  {
    question: `Which chart is best for showing how sales change over several months?`,
    options: [`Line chart`, `Pie chart`, `Word cloud`, `Organization chart`],
    answer: 0,
    explanation: `A line chart connects points in time order, so rises and falls are easy to see.`
  }
];

const marginForm = document.querySelector("#margin-form");
const marginResult = document.querySelector("#margin-result");
const lastResult = document.querySelector("#last-result");
const quizForm = document.querySelector("#quiz-form");
const quizQuestionsBox = document.querySelector("#quiz-questions");
const quizResult = document.querySelector("#quiz-result");
const bestScore = document.querySelector("#best-score");

/* Profit margin calculator */

function formatMoney(value) {
  const sign = value < 0 ? `-` : ``;
  const amount = Math.abs(value).toLocaleString(`en-US`, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return `${sign}$${amount}`;
}

function calculateMargin(revenue, costs) {
  const profit = revenue - costs;
  const margin = (profit / revenue) * 100;
  return { profit, margin };
}

function getMarginMessage(margin) {
  if (margin < 0) {
    return `Your costs are higher than your revenue, so the business is losing money in this period.`;
  }
  if (margin < 10) {
    return `This is a low margin. Look for ways to raise prices or reduce costs.`;
  }
  if (margin < 20) {
    return `This is a healthy margin for many small businesses.`;
  }
  return `This is a strong margin. Keep tracking it to make sure it stays that way.`;
}

function showLastCalculation() {
  const saved = JSON.parse(localStorage.getItem("lastCalculation"));

  if (saved) {
    lastResult.textContent = `Last saved calculation: revenue ${formatMoney(saved.revenue)}, costs ${formatMoney(saved.costs)}, margin ${saved.margin.toFixed(1)} percent.`;
  } else {
    lastResult.textContent = `No calculation saved yet.`;
  }
}

function handleMarginSubmit(event) {
  event.preventDefault();

  const revenue = Number(document.querySelector("#revenue").value);
  const costs = Number(document.querySelector("#costs").value);

  if (revenue <= 0) {
    marginResult.textContent = `Revenue must be greater than zero to calculate a margin.`;
    return;
  }

  const result = calculateMargin(revenue, costs);

  marginResult.innerHTML = `
    <p>Profit: <strong>${formatMoney(result.profit)}</strong></p>
    <p>Profit margin: <strong>${result.margin.toFixed(1)} percent</strong></p>
    <p>${getMarginMessage(result.margin)}</p>`;

  localStorage.setItem("lastCalculation", JSON.stringify({ revenue, costs, margin: result.margin }));
  showLastCalculation();
}

/* Quiz */

function createQuestion(item, index) {
  const options = item.options
    .map((option, optionIndex) => `
      <div class="option">
        <input type="radio" id="q${index}-o${optionIndex}" name="question-${index}" value="${optionIndex}">
        <label for="q${index}-o${optionIndex}">${option}</label>
      </div>`)
    .join(``);

  return `
    <fieldset>
      <legend>${index + 1}. ${item.question}</legend>
      ${options}
    </fieldset>`;
}

function showBestScore() {
  const saved = localStorage.getItem("bestQuizScore");

  if (saved === null) {
    bestScore.textContent = `No quiz score saved yet.`;
  } else {
    bestScore.textContent = `Your best score on this device: ${saved} out of ${quizQuestions.length}.`;
  }
}

function saveBestScore(score) {
  const best = Number(localStorage.getItem("bestQuizScore")) || 0;

  if (score > best) {
    localStorage.setItem("bestQuizScore", score);
  }

  showBestScore();
}

function handleQuizSubmit(event) {
  event.preventDefault();

  const answers = quizQuestions.map((item, index) => {
    const selected = quizForm.querySelector(`input[name="question-${index}"]:checked`);
    return selected ? Number(selected.value) : null;
  });

  if (answers.includes(null)) {
    quizResult.textContent = `Please answer every question before checking your answers.`;
    return;
  }

  const score = answers.reduce((total, answer, index) => {
    return answer === quizQuestions[index].answer ? total + 1 : total;
  }, 0);

  const feedback = quizQuestions
    .map((item, index) => {
      const verdict = answers[index] === item.answer ? `Correct.` : `Not quite.`;
      return `<li>Question ${index + 1}: ${verdict} ${item.explanation}</li>`;
    })
    .join(``);

  quizResult.innerHTML = `
    <p><strong>You scored ${score} out of ${quizQuestions.length}.</strong></p>
    <ul>${feedback}</ul>`;

  saveBestScore(score);
}

function clearQuizResult() {
  quizResult.textContent = ``;
}

quizQuestionsBox.innerHTML = quizQuestions.map(createQuestion).join(``);

marginForm.addEventListener("submit", handleMarginSubmit);
quizForm.addEventListener("submit", handleQuizSubmit);
quizForm.addEventListener("reset", clearQuizResult);

showLastCalculation();
showBestScore();
