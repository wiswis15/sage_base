# SageBase: Your Living Knowledge Base

*A frontend implementation of an AI-powered knowledge search platform*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://v0-confluence-questions.vercel.app/)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)

## Overview

SageBase is a knowledge search platform that helps you find information across your company's various platforms. This repository contains the frontend implementation, with backend functionality currently simulated in the frontend. OpenAI models are being used for testing and demonstration purposes.

## Live Demo

Visit the live demo at:

https://www.loom.com/share/0235fa1825f443dc9ddcc23ce76b924d?sid=1c633878-08ca-43a6-ba72-424aa620e36f

## Features

- Unified search across multiple platforms (Confluence, Jira, Slack, Teams, GitHub, Email)
- AI-powered responses using OpenAI models
- Interactive chat interface for follow-up questions
- Filtering by information source
- Microsoft Teams integration

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenAI API key (for AI functionality)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sage_base
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your-actual-api-key-here
   ```

### Running the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Status

This is an initial phase implementation with:
- Frontend UI components
- Simulated backend functionality
- OpenAI integration for testing

Future phases will include:
- Actual backend integration with data sources
- Real-time data synchronization
- Enhanced security features
- Expanded platform integrations

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **AI**: OpenAI API
- **Deployment**: Vercel

## License

This project is licensed under the MIT License - see the LICENSE file for details.