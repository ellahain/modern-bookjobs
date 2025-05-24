# Job Postings Website

A responsive website that allows you to manually update it with different publishers' job postings. Built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- **Easy Manual Updates**: Add, edit, and delete job postings from different publishers
- **Publisher Management**: Create and manage publisher profiles
- **Search Functionality**: Filter job postings by title, company, publisher, or location
- **Responsive Design**: Works on all devices
- **Local Storage**: All data persists between browser sessions

## Deployment to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Create a GitHub repository**
   - Create a new repository on GitHub
   - Push this code to your new repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/job-postings-website.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com/) and sign in (create an account if needed)
   - Click "Add New" > "Project"
   - Select your GitHub repository
   - Vercel will automatically detect the React project
   - Click "Deploy"

### Option 2: Deploy from Local Files

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy the project**
   ```bash
   vercel
   ```
   - Follow the prompts to complete deployment

## Development

### Prerequisites
- Node.js (v16 or higher)
- pnpm (v7 or higher)

### Setup
1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start development server:
   ```bash
   pnpm run dev
   ```

3. Build for production:
   ```bash
   pnpm run build
   ```

## Manual Update Instructions

### Adding a New Job Posting
1. Click the "Add Job Posting" button
2. Fill in the job details
3. Click "Add Job Posting" to save

### Editing an Existing Job Posting
1. Find the job posting you want to edit
2. Click the "Edit" button on the job card
3. Update the information as needed
4. Click "Update Job Posting" to save changes

### Managing Publishers
1. Navigate to the "Publishers" tab
2. Use the "Add Publisher" button to create new publishers
3. Edit or delete publishers as needed

## License
This project is licensed under the MIT License.
