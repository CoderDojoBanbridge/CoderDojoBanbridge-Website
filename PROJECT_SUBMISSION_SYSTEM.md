# CoderDojo Banbridge - Project Submission System

## Overview
A secure, mentor-approved project submission system that allows CoderDojo members to showcase their work while maintaining content safety and quality control.

## Project Goals
- Enable young coders to easily submit their projects for showcase
- Maintain security and content approval for a public kids' website
- Provide transparent status tracking without requiring user accounts
- Leverage existing GitHub workflow for mentor reviews
- Keep costs minimal with serverless architecture

## User Workflow

### For Students (Project Submitters)
1. **Submit Project**
   - Fill out web form with project details
   - Receive unique submission ID (e.g., `PROJ-2024-A7B9C`)
   - Get confirmation email with status tracking link

2. **Track Status**
   - Visit status page with submission ID
   - Receive email notifications on status changes
   - No account creation required

3. **Project Goes Live**
   - Once approved, project appears on main website
   - Celebration email sent to submitter

### For Mentors (Reviewers)
1. **Receive Notification**
   - Email/Discord notification of new submission
   - GitHub PR created automatically

2. **Review Process**
   - Review project details in GitHub PR
   - Check content appropriateness and quality
   - Approve, request changes, or reject

3. **Status Management**
   - PR merge automatically publishes project
   - Status updates sent to submitter automatically

## Technical Architecture

### Frontend Components
- **Upload Form** (`upload.html`)
  - Simple, kid-friendly interface
  - File upload for project images
  - Form validation and progress indicators
  
- **Status Page** (`status.html`)
  - Look up submission by ID
  - Real-time status display
  - Contact information for help

### Backend Services
- **Cloudflare Worker API**
  - Handles form submissions
  - Validates file uploads and content
  - Creates GitHub PRs via GitHub API
  - Manages email notifications
  - Provides status checking endpoint

### Data Storage
- **GitHub Repository**
  - Project data stored in `projects.json`
  - Images stored in `projects/images/`
  - Full version control and backup
  - PR-based review workflow

### Notifications
- **Email Service** (via Cloudflare Workers)
  - Submission confirmations
  - Status updates
  - Mentor notifications

## Data Structure

### Project Submission Form Fields
```json
{
  "submissionId": "PROJ-2024-A7B9C",
  "timestamp": "2024-10-29T10:30:00Z",
  "status": "pending|approved|needs_changes|rejected",
  "project": {
    "title": "My Awesome Game",
    "creatorName": "Alex",
    "ageGroup": "11-14",
    "email": "parent@example.com",
    "description": "A fun platformer game I built with Scratch",
    "language": "Scratch",
    "projectType": "Game",
    "demoUrl": "https://scratch.mit.edu/projects/123456",
    "githubUrl": "https://github.com/user/project",
    "image": "proj_123_screenshot.png",
    "whatLearned": "I learned about collision detection and game loops"
  }
}
```

### Status States
- 🟡 **Pending** - "Your project is being reviewed by our mentors!"
- 🔄 **In Review** - "A mentor is currently reviewing your project"
- 🟠 **Needs Changes** - "Please check your email for feedback from mentors"
- 🟢 **Approved** - "Congratulations! Your project is now live on our website!"
- 🔴 **Rejected** - "Unfortunately, this submission couldn't be approved. Check your email for details."

## Implementation Phases

### Phase 1: Frontend Forms and Status Page
- [ ] Create upload form with validation
- [ ] Build status checking page
- [ ] Implement file upload handling
- [ ] Add form submission feedback

### Phase 2: Static Backend (Testing)
- [ ] Create mock status API responses
- [ ] Test form submission flow
- [ ] Validate email notifications locally
- [ ] Test file upload and validation

### Phase 3: Cloudflare Worker API
- [ ] Set up Cloudflare Worker
- [ ] Implement form processing endpoint
- [ ] Add file validation and storage
- [ ] Create GitHub API integration

### Phase 4: GitHub Integration
- [ ] Automated PR creation
- [ ] Project data file updates
- [ ] Image file management
- [ ] Merge detection for status updates

### Phase 5: Notification System
- [ ] Email service integration
- [ ] Mentor notification system
- [ ] Status update emails
- [ ] Error handling and logging

## Security Considerations

### Input Validation
- File type restrictions (images only)
- File size limits (max 5MB)
- Content filtering for inappropriate language
- Email validation
- URL validation for project links

### Content Safety
- All submissions require mentor approval
- No direct file uploads to main site
- PR-based review allows for discussion
- Easy rollback via Git history

### Spam Prevention
- Rate limiting on submissions
- Basic CAPTCHA or similar verification
- Email verification for status updates
- Monitoring for duplicate submissions

## File Structure
```
/
├── upload.html              # Project submission form
├── status.html              # Status checking page
├── projects/
│   ├── projects.json        # Main project database
│   ├── submissions/         # Pending submissions data
│   └── images/              # Project screenshots/images
├── api/
│   └── cloudflare-worker.js # Serverless API handler
└── docs/
    └── PROJECT_SUBMISSION_SYSTEM.md
```

## Environment Variables (Cloudflare Worker)
```env
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
GITHUB_REPO=Ninjadawg101/CDBW-copy
EMAIL_API_KEY=key_xxxxxxxxxxxx
NOTIFICATION_EMAIL=mentors@coderdojo-banbridge.org
```

## Cost Estimates
- **Cloudflare Workers**: Free tier (100k requests/day)
- **GitHub API**: Free (public repository)
- **Email Service**: ~$5-10/month for transactional emails
- **File Storage**: GitHub (free) + Cloudflare Images (optional)

**Total Monthly Cost: $0-10**

## Success Metrics
- Number of successful project submissions
- Time from submission to approval
- Student engagement and repeat submissions
- Mentor review workload and efficiency
- Website traffic to projects section

## Future Enhancements
- Auto-approval for trusted/repeat submitters
- Project categories and better filtering
- Student profile pages (with parental consent)
- Voting/rating system for projects
- Integration with CoderDojo event system
- Batch operations for mentors
- Analytics dashboard for submission trends

---

*Last updated: October 29, 2024*
*Next review: After Phase 1 completion*