const params = new URLSearchParams(window.location.search);
const thanksMessage = document.querySelector("#thanks-message");
const requestSummary = document.querySelector("#request-summary");

function getSummaryItems() {
  const topics = params.getAll("topics");

  const items = [
    { label: `Business type`, value: params.get("businesstype") },
    { label: `Team size`, value: params.get("teamsize") },
    { label: `Topics requested`, value: topics.join(`, `) },
    { label: `Message`, value: params.get("message") }
  ];

  return items.filter((item) => item.value);
}

function showSummary() {
  const items = getSummaryItems();

  if (items.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = `No details were provided.`;
    requestSummary.appendChild(emptyItem);
    return;
  }

  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.label}: ${item.value}`;
    requestSummary.appendChild(listItem);
  });
}

function showThanks() {
  const name = params.get("fullname");

  if (name) {
    thanksMessage.textContent = `Thank you, ${name}. Your request has been received.`;
  }

  showSummary();
}

showThanks();
