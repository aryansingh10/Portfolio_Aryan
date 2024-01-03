// Your frontend JavaScript code here, fetching data from the backend
fetch('/api/skills')
    .then(response => response.json())
    .then(skills => {
        console.log('Skills:', skills);
        // Process and display skills on the frontend
    })
    .catch(error => console.error('Error fetching skills:', error));

fetch('/api/projects')
    .then(response => response.json())
    .then(projects => {
        console.log('Projects:', projects);
        // Process and display projects on the frontend
    })
    .catch(error => console.error('Error fetching projects:', error));
