// Fetch projects from the same Vercel deployment
fetch('/api/projects')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  })
  .then(projects => {
    const projectsContainer = document.getElementById('projects-container');

    if (!projectsContainer) {
      console.log("projects-container not found");
      return;
    }

    projectsContainer.innerHTML = '';

    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';

      card.innerHTML = `
        <img src="${project.imageUrl}" alt="${project.title}" style="max-width:100%; border-radius:8px; margin-bottom:10px;">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      `;

      projectsContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error fetching projects:", error);
  });
