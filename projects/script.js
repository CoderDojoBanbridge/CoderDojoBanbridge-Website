// Project data loader and renderer for CoderDojo Banbridge
class ProjectsManager {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.currentFilter = 'all';
        this.init();
    }

    async init() {
        console.log('ProjectsManager initialized');
        await this.loadProjects();
        this.renderProjects();
        this.setupFilters();
        this.setupSearch();
        console.log('ProjectsManager fully initialized with', this.projects.length, 'projects');
    }

    async loadProjects() {
        try {
            console.log('Attempting to load projects from ./projects/projects.json');

            // Add timeout to fetch request
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            const response = await fetch('./projects/projects.json', {
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            console.log('Fetch response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.projects = await response.json();
            console.log('Loaded projects:', this.projects);
            this.filteredProjects = [...this.projects];
        } catch (error) {
            console.error('Error loading projects:', error);
            this.showError(`Failed to load projects: ${error.message}`);
            // Fallback: show static projects if dynamic loading fails
            this.showStaticFallback();
        }
    }

    renderProjects() {
        console.log('Rendering projects, count:', this.filteredProjects.length);
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) {
            console.error('Projects grid not found');
            return;
        }

        // Remove loading div if it exists
        const loadingDiv = projectsGrid.querySelector('.loading');
        if (loadingDiv) {
            loadingDiv.remove();
        }

        if (this.filteredProjects.length === 0) {
            console.log('No projects to display');
            projectsGrid.innerHTML = `
                <div class="no-projects">
                    <h3>No projects found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
            return;
        }

        console.log('Creating project cards for:', this.filteredProjects);
        projectsGrid.innerHTML = this.filteredProjects.map(project => this.createProjectCard(project)).join('');

        // Add animation delay for staggered appearance
        const cards = projectsGrid.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
        });
    }

    createProjectCard(project) {
        const tags = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        const difficultyClass = this.getDifficultyClass(project.difficulty);
        const projectUrl = this.getProjectUrl(project.title);

        return `
            <div class="project-card" data-project-id="${project.id}">
                <a href="/CoderDojoBanbridge-Website/projects/${projectUrl}" class="project-link">
                    <div class="project-image">
                        <div class="project-placeholder">${project.icon}</div>
                        <div class="project-difficulty ${difficultyClass}">${project.difficulty}</div>
                    </div>
                    <div class="project-content">
                        <h3>${project.title}</h3>
                        <p class="project-language">Made with ${project.language}</p>
                        <p class="project-age">Created by ${project.age}</p>
                        <p>${project.description}</p>
                        <div class="project-tags">
                            ${tags}
                        </div>
                    </div>
                </a>
            </div>
        `;
    }

    getDifficultyClass(difficulty) {
        switch (difficulty.toLowerCase()) {
            case 'beginner': return 'difficulty-beginner';
            case 'intermediate': return 'difficulty-intermediate';
            case 'advanced': return 'difficulty-advanced';
            default: return 'difficulty-beginner';
        }
    }

    getProjectUrl(title) {
        // Convert title to URL-friendly format
        return `${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}/`;
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.setFilter(filter);
            });
        });
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchProjects(e.target.value);
            });
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;

        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

        this.applyFilters();
    }

    searchProjects(query) {
        const searchTerm = query.toLowerCase();
        this.filteredProjects = this.projects.filter(project =>
            project.title.toLowerCase().includes(searchTerm) ||
            project.language.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        this.renderProjects();
    }

    applyFilters() {
        if (this.currentFilter === 'all') {
            this.filteredProjects = [...this.projects];
        } else {
            this.filteredProjects = this.projects.filter(project =>
                project.difficulty.toLowerCase() === this.currentFilter ||
                project.language.toLowerCase() === this.currentFilter ||
                project.tags.some(tag => tag.toLowerCase() === this.currentFilter)
            );
        }
        this.renderProjects();
    }

    showError(message) {
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = `
                <div class="error-message">
                    <h3>⚠️ Error</h3>
                    <p>${message}</p>
                </div>
            `;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsManager();
});

// Add CSS for animations and filters
const additionalCSS = `
    .fade-in {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
        transform: translateY(20px);
    }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .no-projects, .error-message {
        text-align: center;
        padding: 3rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .no-projects h3, .error-message h3 {
        color: #27ae60;
        margin-bottom: 1rem;
    }

    .project-difficulty {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
    }

    .difficulty-beginner { background-color: #27ae60; color: white; }
    .difficulty-intermediate { background-color: #f39c12; color: white; }
    .difficulty-advanced { background-color: #e74c3c; color: white; }

    .project-age {
        color: #7f8c8d;
        font-size: 0.9rem;
        font-style: italic;
        margin-bottom: 1rem !important;
        font-weight: 400;
    }

    .filters {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 2rem;
        padding: 1rem;
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .filter-btn {
        padding: 0.5rem 1rem;
        border: 2px solid #27ae60;
        background: white;
        color: #27ae60;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 500;
    }

    .filter-btn:hover, .filter-btn.active {
        background: #27ae60;
        color: white;
    }

    .search-container {
        margin-bottom: 2rem;
        text-align: center;
    }

    .search-input {
        padding: 0.75rem 1rem;
        border: 2px solid #ddd;
        border-radius: 25px;
        font-size: 1rem;
        width: 100%;
        max-width: 400px;
        outline: none;
        transition: border-color 0.3s ease;
    }

    .search-input:focus {
        border-color: #27ae60;
    }

    @media (max-width: 768px) {
        .filters {
            justify-content: center;
        }

        .filter-btn {
            font-size: 0.9rem;
            padding: 0.4rem 0.8rem;
        }
    }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);
