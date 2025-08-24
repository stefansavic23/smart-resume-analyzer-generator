# Smart Resume Analyzer Generator

**Smart Resume Analyzer Generator** is a full-stack web application that lets users upload their resume (PDF) alongside a job description, and then uses AI (Gemini) to analyze and generate insights, saving results to the database.

---

##  Table of Contents

- [Features](#features)  
- [Demo](#demo)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
- [Back-end Architecture](#back-end-architecture)  
- [Front-end Overview](#front-end-overview)  
- [API Endpoints](#api-endpoints)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [Contributing](#contributing)  
- [License](#license)  
- [Contact](#contact)

---

##  Features

- Uploads resumes (PDF) and job descriptions.  
- Uses AI (Google Gemini model) to analyze resume against job requirements.  
- Stores analysis results in MongoDB.  
- Displays AI-generated insights directly in the React front-end.  

---

##  Demo

*(Optional: Add a GIF or screenshot here)*  
Example behavior:  
- Upload resume & job description  
- Click “Analyze”  
- View AI-generated summary/analysis displayed in a styled card  

---

##  Tech Stack

- **Front-end**: React, Material-UI (MUI), Axios  
- **Back-end**: Node.js, Express, Multer (file upload), pdf-parse, Mongoose, Google Gemini GenAI SDK  
- **Database**: MongoDB  
- **Deployment**: (Add if deployed; e.g., Heroku, Vercel)

---

##  Getting Started

### Prerequisites

- Node.js (v16+)  
- MongoDB instance or Atlas connection  
- Google Cloud credentials for Gemini (set `.env` variables)

### Installation

Clone the repo:
```bash
git clone https://github.com/stefansavic23/smart-resume-analyzer-generator.git
cd smart-resume-analyzer-generator
