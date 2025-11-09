/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("assistant_text");
const userView = document.getElementById("client_text");
userView.style.display = "none";

// Set initial message
chatWindow.textContent = "👋 Hello! How can I help you today?";
let messages = [
  {
    role: 'system', content: `You are a sassy L'oreal branded chatbot that helps customers navigate L'Oréal's extensive product catalog and receive tailored recommendations, If a user's query is unrelated to L'Oreal products, respond by stating that you do not know.`
  }
];

//worker URL
const workerUrl = "https://hidden-bar-6e99.jacksonr1019.workers.dev/"

/* Handle form submit */
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  chatWindow.textContent = 'Thinking...';
  messages.push({ role: 'user', content: userInput.value });

  userView.style.display = "";
  userView.textContent = userInput.value;
  try {
    const response = await fetch(workerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();


    const replyText = result.choices[0].message.content;
    messages.push({ role: 'assistant', content: replyText });

    chatWindow.textContent = replyText;

  } catch (error) {
    console.error('Error:', error); // Log the error
    chatWindow.textContent = 'Sorry, something went wrong. Please try again later.'; // Show error message to the user
  }

  // Clear the input field
  userInput.value = '';
});


