const API_URL =
"https://inclura-ai-backend.onrender.com";

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });

console.log("Inclura frontend active.");
