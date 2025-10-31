# CoderDojo Banbridge Website

A modern, responsive website for CoderDojo Banbridge - a free coding club for young people aged 7-17. Built with HTML, CSS, and JavaScript featuring a dynamic projects showcase system.

## Features

- **Responsive Design**: Works perfectly on all devices
- **Dynamic Projects System**: Easily add new projects through JSON configuration
- **Search & Filter**: Find projects by language, difficulty, or tags
- **Professional Styling**: Clean, modern design matching CoderDojo branding
- **Interactive Elements**: Smooth animations and hover effects

## File Structure

```
CoderDojoBanbridge-Website/
├── index.html              # Home page
├── projects.html           # Projects showcase page
├── styles.css              # All styling
├── projects/               # Dynamic projects system
│   ├── projects.json       # Project data
│   ├── script.js           # Dynamic loading logic
│   └── README.md           # Projects documentation
├── .gitignore
├── LICENSE
└── README.md              # This file
```

## Getting Started

1. **Local Development**: Simply open `index.html` in a web browser
2. **Web Server**: For full functionality, serve from a local web server:
   ```bash
   # Using Python (Python 3)
   python -m http.server 8000
   
   # Using Node.js (with live-server)
   npx live-server
   ```
3. **Project Upload System**: Coming soon - we're building functionality for members to upload their own projects!

## Dynamic Projects System

The website features a sophisticated dynamic projects showcase that loads project data from JSON files and provides real-time search and filtering capabilities.

### Adding New Projects

1. Edit `projects/projects.json`
2. Add project following the specified format
3. Create individual project page in `projects/project-name/index.html`
4. Projects automatically appear with filtering and search
5. See `projects/README.md` for detailed documentation

### Project Format

```json
{
  "id": 1,
  "title": "Project Name",
  "language": "Programming Language",
  "description": "Project description",
  "icon": "🎮",
  "tags": ["Game", "Interactive"],
  "age": "10 years old",
  "difficulty": "Beginner"
}
```

### Features

- **Dynamic Loading**: Projects loaded from JSON on page load
- **Real-time Search**: Search through titles, descriptions, languages, and tags
- **Advanced Filtering**: Filter by difficulty, language, or custom tags
- **Responsive Design**: Works perfectly on all devices
- **Fallback System**: Shows static projects if JavaScript fails
- **Error Handling**: Graceful error messages and recovery

## Customization

### Colors and Branding
- Primary color: `#27ae60` (green)
- Secondary color: `#2c3e50` (dark blue)
- Accent colors: Various shades for difficulty levels

### Adding Pages
1. Create new HTML file
2. Include navigation structure
3. Add to nav menu in all pages
4. Style with existing CSS classes

### Modifying Layout
- Edit `styles.css` for styling changes
- Grid system is responsive and mobile-friendly
- Projects grid adjusts automatically

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive enhancement for older browsers

## Contributing

1. **Adding Projects**: Use the JSON format in `projects/projects.json`
2. **Styling**: Modify `styles.css` for visual changes
3. **Functionality**: Extend `projects/script.js` for new features

## Deployment

The website is static and can be deployed to any web hosting service:
- GitHub Pages
- Netlify
- Vercel
- Traditional web hosting

## License

See LICENSE file for details.

## Support

For questions about the CoderDojo Banbridge club, visit our website or contact us through the provided channels.
