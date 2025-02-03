# AI Assisted Code Editor

## Project Overview

AI Assisted Code Editor is a lightweight, intelligent, and collaborative code editing tool designed to provide a seamless development experience. It integrates AI-driven features to enhance code quality, productivity, and collaboration. With real-time multi-user editing, smart code assistance, and a modern user interface, this code editor enables developers to work together efficiently while ensuring high-quality, well-structured code.

---

## Table of Contents

1. [Core Features](#core-features)
2. [Technology Stack](#technology-stack)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Documentation](#api-documentation)
---

## Core Features

### 1. Code Editor

- **Lightweight Code Editor:** A minimal, efficient code editor that loads quickly and ensures a smooth user experience.
- **Syntax Highlighting:** Supports syntax highlighting for various programming languages.
- **Themes:** Multiple themes available, including light and dark modes.
- **Bracket Matching & Auto-Indentation:** Automatically highlights matching brackets and handles indentation to maintain code structure.

### 2. AI-Powered Code Assistance

- **Auto-Completion:** AI-driven suggestions for function names, variables, and code completion to speed up coding.
- **Quick Fixes:** Automatically identifies syntax errors and suggests fixes to improve code quality.
- **Code Snippets:** Frequently used code blocks are available for easy insertion, saving time on repetitive tasks.
- **Code Documentation Generation:** AI-assisted generation of code documentation to ensure code is well-documented.

### 3. Real-Time Collaboration

- **Multi-User Editing:** Multiple developers can work on the same codebase in real-time.

### 4. Security & Authentication

- **Authentication Options:** Simple email login and Google OAuth for easy user authentication.
- **Password Reset:** Password reset functionality for account recovery.

### 5. User Experience & UI Enhancements

- **Dark & Light Mode:** Toggle between dark and light modes based on user preference.
- **Customizable Themes & Font Sizes:** Personalize the interface by adjusting the font size and color themes.
- **Collapsible Sidebar:** Collapse the sidebar to maximize screen space and focus on the code.
- **Intuitive UI:** The user interface is designed to be simple, intuitive, and easy to use for a seamless coding experience.

---

## Technology Stack

This project is built using the following technologies:

- **Frontend:**
  - Vite+React.js for building the UI components
  - Monaco Editor (the same editor used by VSCode) for the core code editing functionality
  - WebSocket for real-time collaboration
  - Tailwind CSS for fast and flexible UI styling
  - Redux for state management

- **Backend:**
  - Node.js with Express for handling the API requests
  - WebSocket server for real-time communication and multi-user editing
  - MongoDB for database storage (user data, project files, and activity logs)

- **AI Features:**
  - An inbuilt AI assisted CODY-AI for code completion, suggestions, and documentation generation

## Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js**: You can download it from [nodejs.org](https://nodejs.org).

### Clone the Repository

```bash
git clone https://github.com/Adityakashyap1011/Mec-Coders.git
```

### Install Dependencies

npm install


### Run the Application

To start the application, run the following commands:


The application will be available at `.
---

## Usage
1. **Login or Register**: Upon first use, sign in using email or Google OAuth.
2. **Create or Join a Workspace**: Start a new workspace or join an existing one to begin collaborating.
3. **Edit Code**: Use the code editor with AI-powered suggestions, syntax highlighting, and auto-completion to write code.
4. **View Activity**: Track recent edits and actions through the activity log.
5. **AI Features**: Use auto-completion and code documentation tools to improve productivity and code quality.
---
