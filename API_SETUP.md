# SageBase Project

This project contains the frontend implementation of SageBase - a knowledge search platform. In this initial phase, the backend functionality is simulated in the frontend, with OpenAI models being used for testing purposes.

## Live Demo

A running version of this project is available at:
**[https://v0-confluence-questions.vercel.app/](https://v0-confluence-questions.vercel.app/)**

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sage_base
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your API key (for OpenAI integration):
   - Create a file named `.env.local` in the root directory
   - Add your OpenAI API key to the file:
     ```
     OPENAI_API_KEY=your-actual-api-key-here
     ```

## Running the Project

Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Building for Production

```bash
npm run build
npm start
```

## API Key Security Notes

- Never commit your API key to version control
- The `.env.local` file is already in `.gitignore` to prevent accidental commits
- Use environment variables in production deployments
- Rotate your API keys regularly for better security

## Project Structure

This is a Next.js project that implements a knowledge search interface. Key features include:

- Unified search across multiple platforms (Confluence, Jira, Slack, Teams, GitHub, Email)
- AI-powered responses using OpenAI models
- Chat interface for follow-up questions
- Filtering by information source

In the current implementation, backend functionality is simulated in the frontend. Future phases will include a proper backend integration with actual data sources 