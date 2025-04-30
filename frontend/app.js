const form = document.getElementById('issueForm');
const list = document.getElementById('issueList');

/*form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const status = document.getElementById('status').value;
  
    await fetch('http://localhost:3000/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, priority, status })
    });
  
    form.reset();
    loadIssues();
  });
  */

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const bugId = document.getElementById('bugId').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const status = document.getElementById('status').value;
  
    const issueData = { title, description, priority, status };
  
    if (bugId) {
      // Edit mode
      await fetch(`http://localhost:3000/api/issues/${bugId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(issueData)
      });
    } else {
      // Add mode
      await fetch('http://localhost:3000/api/issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(issueData)
      });
    }
  
    form.reset();
    loadIssues();
  });

/*async function loadIssues() {
  const res = await fetch('http://localhost:3000/api/issues');
  const issues = await res.json();
  list.innerHTML = '';
  issues.forEach(issue => {
    const item = document.createElement('li');
    item.textContent = `${issue.title} [${issue.priority}] - ${issue.description} (${issue.status})`;

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.onclick = async () => {
      await fetch(`http://localhost:3000/api/issues/${issue.id}`, { method: 'DELETE' });
      loadIssues();
    };
    item.appendChild(del);
    list.appendChild(item);
  });
}*/

function loadIssues() {
    fetch('http://localhost:3000/api/issues')
      .then(res => res.json())
      .then(data => {
        issueList.innerHTML = '';
        data.forEach(issue => {
          const item = document.createElement('li');
          item.textContent = `${issue.title} (=${issue.priority}=) - ${issue.description} (=${issue.status}=)`;
  
          const editBtn = document.createElement('button');
          editBtn.textContent = 'Edit';
          editBtn.onclick = () => populateFormForEdit(issue);
  
          item.appendChild(editBtn);
          issueList.appendChild(item);
        });
      });
  }
  

loadIssues();

function populateFormForEdit(issue) {
    document.getElementById('bugId').value = issue.id;
    document.getElementById('title').value = issue.title;
    document.getElementById('description').value = issue.description;
    document.getElementById('priority').value = issue.priority;
    document.getElementById('status').value = issue.status;
  }
  
