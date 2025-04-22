const API_URL = 'https://mini-reddit-backend.onrender.com';

const form = document.getElementById('postForm');
const postsContainer = document.getElementById('postsContainer');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  const newPost = { title, content, score: 0 };
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  });

  form.reset();
  loadPosts();
});

postsContainer.addEventListener('click', async (e) => {
  if (e.target.dataset.vote) {
    const postEl = e.target.closest('.post');
    const id = postEl.dataset.id;
    const scoreSpan = postEl.querySelector('.score');
    let score = parseInt(scoreSpan.textContent, 10);

    score += e.target.dataset.vote === 'up' ? 1 : -1;
    scoreSpan.textContent = score;

    await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score }),
    });
  }
});

async function loadPosts() {
  const res = await fetch(API_URL);
  const posts = await res.json();
  postsContainer.innerHTML = '';
  posts.reverse().forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.dataset.id = post.id;
    div.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <div class="votes">
        <button data-vote="up">⬆️</button>
        <span class="score">${post.score}</span>
        <button data-vote="down">⬇️</button>
      </div>
    `;
    postsContainer.appendChild(div);
  });
}

loadPosts();
