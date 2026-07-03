# Demo-Att

A simple student attendance management system built with HTML, CSS, and vanilla JavaScript. Fully containerized with Docker and automated CI/CD pipeline.

## Features

- ✅ Add student records with name, roll number, and attendance status
- ✅ Persist student data in browser local storage
- ✅ Search student list by name or roll number
- ✅ View attendance status and dashboard summary
- ✅ Dockerized application
- ✅ Full CI/CD pipeline with automated testing and deployment

## Live Demo

🚀 **Access the live application:** https://ashwinverma-dot.github.io/Demo-Att/

## How to run locally

### Option 1: Direct browser
```bash
# Open index.html directly in your browser
start index.html
```

### Option 2: Local server
```bash
python -m http.server 8000
# Then open http://localhost:8000
```

### Option 3: Docker
```bash
# Build the image
docker build -t demo-att:latest .

# Run the container
docker run -p 8000:80 demo-att:latest

# Open http://localhost:8000
```

## CI/CD Pipeline

This project includes a comprehensive CI/CD pipeline that:

1. **Unit Tests** (`.github/workflows/cicd-complete.yml`)
   - ✅ Validates all HTML links
   - ✅ Checks CSS syntax
   - ✅ Verifies required files exist
   - ✅ Validates form inputs and IDs

2. **Docker Build**
   - ✅ Builds optimized Docker image
   - ✅ Pushes to GitHub Container Registry
   - ✅ Tags images with git branches and commit SHA

3. **Deployment**
   - ✅ Deploys to GitHub Pages on every push to `main`
   - ✅ Automatic URL: `https://<username>.github.io/Demo-Att`

### View CI/CD Runs

Go to: https://github.com/ashwinverma-dot/Demo-Att/actions

### Additional Workflows

- **CI** (`.github/workflows/ci.yml`) - Basic validation
- **Link Checker** (`.github/workflows/link-checker.yml`) - Weekly link validation
- **Deploy** (`.github/workflows/deploy.yml`) - GitHub Pages deployment

## Project Structure

```
Demo_project/
├── index.html              # Main HTML file
├── styles.css              # Styling
├── test-links.js           # Unit tests for link validation
├── Dockerfile              # Docker image definition
├── nginx.conf              # Nginx configuration
├── .dockerignore            # Docker build exclusions
├── README.md               # This file
└── .github/
    └── workflows/
        ├── ci.yml          # Basic CI pipeline
        ├── cicd-complete.yml # Full CI/CD pipeline
        ├── deploy.yml      # GitHub Pages deploy
        └── link-checker.yml # Link validation
```

## Running Tests Locally

```bash
# Install dependencies
npm install cheerio

# Run link validation tests
node test-links.js
```

## Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js (for testing)
- **Container:** Docker with Nginx
- **CI/CD:** GitHub Actions
- **Deployment:** GitHub Pages + Docker

## License

MIT License - feel free to use this project for educational purposes.
