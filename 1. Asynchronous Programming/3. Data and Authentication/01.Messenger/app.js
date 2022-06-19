const submitBtn = document.getElementById("submit");
const refreshBtn = document.getElementById("refresh");

const urlMessages = "http://localhost:3030/jsonstore/messenger";

submitBtn.addEventListener("click", submitMessage);
refreshBtn.addEventListener("click", getMessages);

async function submitMessage(e) {
  e.preventDefault();

  const authorName = document.querySelector('input[name="author"]');
  const msgText = document.querySelector('input[name="content"]');

  if (authorName == "" || msgText == "") {
    return alert("Empty input!");
  }

  const body = JSON.stringify({
    author: authorName.value,
    content: msgText.value,
  });

  authorName.value = "";
  msgText.value = "";

  try {
    const response = await fetch(urlMessages, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body,
    });
  } catch (err) {
    console.error(err.message);
  }
}

async function getMessages(e) {
  e.preventDefault();

  const messagesArea = document.getElementById("messages");
  messagesArea.innerHTML = "";
  let messageStorage = [];

  const response = await fetch(urlMessages);
  const data = await response.json();

  Object.values(data).forEach((d) => {
    messageStorage.push(`${d.author}: ${d.content}\n`);
  });

  messageStorage.forEach((m) => (messagesArea.textContent += m));
}
