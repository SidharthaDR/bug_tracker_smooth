const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dataFile = 'issues.json';

// Read existing issues
function readIssues() {
    return JSON.parse(fs.readFileSync(dataFile));
}

// Write issues
function writeIssues(issues) {
    fs.writeFileSync(dataFile, JSON.stringify(issues, null, 2));
}

// Get all issues
app.get('/api/issues', (req, res) => {
    res.json(readIssues());
});

// Add new issue
app.post('/api/issues', (req, res) => {
    const issues = readIssues();
    const newIssue = { id: Date.now(), ...req.body };
    issues.push(newIssue);
    writeIssues(issues);
    res.status(201).json(newIssue);
});

// Delete issue
app.delete('/api/issues/:id', (req, res) => {
    let issues = readIssues();
    issues = issues.filter(issue => issue.id != req.params.id);
    writeIssues(issues);
    res.status(204).end();
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
