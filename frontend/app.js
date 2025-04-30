const form = document.getElementById('issueForm');
const list = document.getElementById('issueList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  await fetch('http://localhost:3000/api/issues', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description })
  });

  form.reset();
  loadIssues();
});

async function loadIssues() {
  const res = await fetch('http://localhost:3000/api/issues');
  const issues = await res.json();
  list.innerHTML = '';
  issues.forEach(issue => {
    const item = document.createElement('li');
    item.textContent = `${issue.title}: ${issue.description}`;
    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.onclick = async () => {
      await fetch(`http://localhost:3000/api/issues/${issue.id}`, { method: 'DELETE' });
      loadIssues();
    };
    item.appendChild(del);
    list.appendChild(item);
  });
}

loadIssues();
