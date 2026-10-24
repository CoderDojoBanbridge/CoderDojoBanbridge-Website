// Project data loader and renderer for CoderDojo Banbridge
class ProjectsManager {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.currentFilter = 'all';
        const workerProjectsUrl = window.CODERDOJO_PROJECTS_DATA_URL || window.CODERDOJO_PROJECTS_API_URL;
        this.dataUrl = workerProjectsUrl ? `${workerProjectsUrl.replace(/\/$/, '')}/projects` : './projects/projects.json';
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
            console.log('Attempting to load projects from', this.dataUrl);

            // Add timeout to fetch request
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000);

            const response = await fetch(this.dataUrl, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            console.log('Fetch response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const allProjects = await response.json();
            this.projects = Array.isArray(allProjects) ? allProjects.filter(project => {
                const status = (project.status || '').toLowerCase();
                return status === 'approved' || status === 'live' || status === 'published' || status === '';
            }) : [];

            console.log('Loaded approved projects:', this.projects);
            this.filteredProjects = [...this.projects];
        } catch (error) {
            console.error('Error loading projects:', error);
            this.showError(`Failed to load projects: ${error.message}`);
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
        const tags = Array.isArray(project.tags) ? project.tags.map(tag => `<span class="tag">${this.escapeHtml(tag)}</span>`).join('') : '';
        const difficulty = project.difficulty || 'Beginner';
        const difficultyClass = this.getDifficultyClass(difficulty);
        const projectHref = this.getProjectHref(project);

        return `
            <div class="project-card" data-project-id="${this.escapeHtml(project.id)}">
                <a href="${this.escapeHtml(projectHref)}" class="project-link">
                    <div class="project-image">
                        <div class="project-placeholder">${this.escapeHtml(project.icon || '🚀')}</div>
                        <div class="project-difficulty ${difficultyClass}">${this.escapeHtml(difficulty)}</div>
                    </div>
                    <div class="project-content">
                        <h3>${this.escapeHtml(project.title)}</h3>
                        <p class="project-language">Made with ${this.escapeHtml(project.language)}</p>
                        <p>${this.escapeHtml(project.description)}</p>
                        <div class="project-tags">
                            ${tags}
                        </div>
                    </div>
                </a>
            </div>
        `;
    }

    escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, character => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[character]);
    }

    getProjectHref(project) {
        const directUrl = project.url || project.href || project.path || project.page;
        if (directUrl) {
            if (directUrl.startsWith('http://') || directUrl.startsWith('https://')) {
                return directUrl;
            }
            if (directUrl.startsWith('./') || directUrl.startsWith('../') || directUrl.startsWith('/')) {
                return directUrl;
            }
            if (directUrl.endsWith('.html')) {
                return directUrl;
            }
        }

        const slug = project.slug || project.folder || this.slugify(project.title || 'project');
        return `projects/${slug}/`;
    }

    slugify(value) {
        return String(value)
            .trim()
            .toLowerCase()
            .replace(/&/g, 'and')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }

    getDifficultyClass(difficulty) {
        switch (difficulty.toLowerCase()) {
            case 'beginner': return 'difficulty-beginner';
            case 'intermediate': return 'difficulty-intermediate';
            case 'advanced': return 'difficulty-advanced';
            default: return 'difficulty-beginner';
        }
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
        this.filteredProjects = this.projects.filter(project => {
            const title = (project.title || '').toLowerCase();
            const language = (project.language || '').toLowerCase();
            const description = (project.description || '').toLowerCase();
            const tags = Array.isArray(project.tags) ? project.tags : [];
            return title.includes(searchTerm) ||
                language.includes(searchTerm) ||
                description.includes(searchTerm) ||
                tags.some(tag => (tag || '').toLowerCase().includes(searchTerm));
        });
        this.renderProjects();
    }

    applyFilters() {
        if (this.currentFilter === 'all') {
            this.filteredProjects = [...this.projects];
        } else {
            this.filteredProjects = this.projects.filter(project => {
                const difficulty = (project.difficulty || '').toLowerCase();
                const language = (project.language || '').toLowerCase();
                const tags = Array.isArray(project.tags) ? project.tags : [];
                return difficulty === this.currentFilter ||
                    language === this.currentFilter ||
                    tags.some(tag => (tag || '').toLowerCase() === this.currentFilter);
            });
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
