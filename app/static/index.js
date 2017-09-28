const url = new URL(window.location);
const message = url.searchParams.get('message');
fetch(`/echo/v1?message=${message}`)
  .then(response => response.json())
  .then((json) => {
    const header = document.querySelector('h1');
    header.textContent = json.message;
  });
