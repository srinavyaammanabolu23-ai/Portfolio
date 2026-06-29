// Fetch projects from your LIVE Vercel backend
fetch('/api/projects')
  .then(response => response.json())
  .then(projects => {
    // Find the section in your HTML where projects should go
    const projectsContainer = document.getElementById('projects-container');
    
    if (!projectsContainer) {
      console.log("Waiting for #projects-container in HTML...");
      return;
    }

    // Clear any existing placeholder text
    projectsContainer.innerHTML = '';

    // Loop through the database projects and display them
    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card'; // Make sure this matches your CSS
      
      card.innerHTML = `
        <img src="${project.imageUrl}" alt="${project.title}" style="max-width: 100%; border-radius: 8px; margin-bottom: 10px;">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      `;
      
      projectsContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching projects:', error));
