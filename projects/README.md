# CoderDojo Banbridge Projects System

This directory contains the dynamic projects system for the CoderDojo Banbridge website. Projects are stored in JSON format and dynamically rendered using JavaScript.

## How to Add New Projects

### 1. Edit the JSON File

Add new projects to `projects.json`. Each project should follow this format:

```json
{
  "id": 9,
  "title": "Your Project Name",
  "language": "Programming Language",
  "description": "Brief description of what the project does",
  "icon": "🎯",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "age": "Age of creator",
  "difficulty": "Beginner/Intermediate/Advanced"
}
```

### 2. Create Individual Project Page

1. Create a new folder: `mkdir projects/your-project-name`
2. Create `index.html` in that folder
3. Use the template from existing project pages
4. Update the navigation links to point to `../../` (two levels up)
5. Customize content, screenshots, code examples, and learning sections

### 3. Project Page Template

Each project page should include:
- Navigation bar with links back to main site
- Hero section with project title and description
- Project details sidebar (creator, language, difficulty, tags)
- Main content with description, screenshots, code examples
- Learning outcomes section
- Step-by-step tutorial for recreating the project
- Back to projects link

## How to Add New Projects

### 1. Edit the JSON File

Add new projects to `projects.json`. Each project should follow this format:

```json
{
  "id": 9,
  "title": "Your Project Name",
  "language": "Programming Language",
  "description": "Brief description of what the project does",
  "icon": "🎯",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "age": "Age of creator",
  "difficulty": "Beginner/Intermediate/Advanced"
}
```

### 2. Project Fields Explained

- **id**: Unique number for each project (auto-increment)
- **title**: Name of the project
- **language**: Programming language or tool used (e.g., "Scratch", "Python", "HTML/CSS")
- **description**: Short description of the project
- **icon**: Emoji or symbol to represent the project visually
- **tags**: Array of keywords for filtering (e.g., ["Game", "Web", "AI"])
- **age**: Age of the young person who created it
- **difficulty**: Skill level - "Beginner", "Intermediate", or "Advanced"

### 3. Available Filters

The system automatically creates filters based on:
- Difficulty levels (Beginner, Intermediate, Advanced)
- Programming languages (Scratch, Python, JavaScript, HTML/CSS, Arduino)
- Tags from the projects

### 4. Adding New Filter Categories

To add a new filter category, update the HTML in `projects.html` and add the corresponding logic in `script.js`:

1. Add button in HTML:
```html
<button class="filter-btn" data-filter="newcategory">New Category</button>
```

2. Add filter logic in JavaScript (in the `applyFilters()` method):
```javascript
project.tags.some(tag => tag.toLowerCase() === this.currentFilter) ||
project.newField.toLowerCase() === this.currentFilter
```

## File Structure

```
projects/
├── projects.json                    # Project data
├── script.js                        # Dynamic loading logic
├── README.md                        # This documentation
├── space-adventure-game/
│   └── index.html                   # Individual project page
├── personal-portfolio-website/
│   └── index.html                   # Individual project page
├── line-following-robot/
│   └── index.html                   # Individual project page
├── weather-app/
│   └── index.html                   # Individual project page
├── digital-art-generator/
│   └── index.html                   # Individual project page
├── math-quiz-game/
│   └── index.html                   # Individual project page
├── chat-bot-assistant/
│   └── index.html                   # Individual project page
└── music-visualizer/
    └── index.html                   # Individual project page
```

## Features

- **Dynamic Loading**: Projects are loaded from JSON on page load
- **Search**: Real-time search through project titles, descriptions, languages, and tags
- **Filtering**: Filter by difficulty, language, or custom tags
- **Responsive**: Works on all device sizes
- **Animations**: Smooth fade-in animations for project cards
- **Error Handling**: Shows helpful messages if projects fail to load

## Customization

### Changing the Grid Layout

Edit the CSS in `styles.css`:
```css
.projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Adjust card width */
    gap: 1.5rem; /* Adjust spacing between cards */
}
```

### Adding New Project Fields

1. Add to JSON structure
2. Update the `createProjectCard()` method in `script.js`
3. Add corresponding CSS styling if needed

### Styling Project Cards

Project cards can be customized by editing the `.project-card` styles in `styles.css`. The system supports:
- Custom difficulty badges with color coding
- Age display
- Tag system
- Hover effects
- Responsive design

## Troubleshooting

### Projects Not Loading
- Check that `projects.json` is valid JSON
- Ensure the file path in the fetch call is correct
- Check browser console for error messages

### Filters Not Working
- Verify filter button `data-filter` attributes match the expected values
- Check that the filter logic in `applyFilters()` covers all cases

### Search Not Working
- Ensure the search input has the correct class name
- Check that all searchable fields are included in the search logic

## Best Practices

1. **Consistent Data**: Use consistent formatting for ages, languages, and tags
2. **Descriptive Tags**: Use tags that will be useful for filtering
3. **Clear Descriptions**: Keep project descriptions concise but informative
4. **Appropriate Icons**: Choose emojis that clearly represent the project type
5. **Age Accuracy**: Use realistic ages for the young coders' achievements

## Example Project Entry

```json
{
  "id": 10,
  "title": "AI Chat Assistant",
  "language": "Python",
  "description": "An intelligent chatbot that can answer questions and help with coding problems, built using natural language processing.",
  "icon": "🤖",
  "tags": ["AI", "Chat", "Machine Learning", "Assistant"],
  "age": "16 years old",
  "difficulty": "Advanced"
}
