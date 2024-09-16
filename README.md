# AI Subsidy Advisor Project

This project is an AI-driven subsidy advisor for the Dutch subsidy market. It uses a FastAPI backend with Python and a React frontend.

## Prerequisites

Ensure you have the following installed on your machine:

- **Python 3.12.6** (or higher)
- **Node.js** (for the React frontend)
- **pip** (Python package manager)
- **virtualenv** (optional but recommended for Python environment isolation)

## Backend Setup (FastAPI)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jncontrerasdev/mstr-assignment.git
   
2. Navigate to the backend directory
    cd ai-subsidy-advisor/backend

3. Create a virtual environment (recommended):
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`

4. Install Python dependencies:
    pip install -r requirements.txt

5. Set up environment variables (Optional: if you have environment-specific settings):
    cp .env.example .env
    Edit .env as necessary

6. Run the FastAPI server
    uvicorn app:app --reload

The FastAPI server should now be running at http://127.0.0.1:8000

## Frontend Setup (React)

1. Navigate to the frontend directory:
    cd ai-subsidy-advisor/frontend

2. Install Node dependencies:
    npm install

3. Start the React development server:
    npm start

The React app should now be running at http://localhost:3000

## Testing the Project

1. Ensure both the FastAPI backend and React frontend are running.
2. Open your browser and navigate to http://localhost:3000 to use the AI Subsidy Advisor application.

## Common Issues
- 403 Cloudflare Block: If you encounter a 403 error, it may be caused by Cloudflare. Ensure you're running the project locally for development and testing.
- Query Contains Unsafe Content: If the backend responds with a 400 status code and "Query contains unsafe content", check the is_safe_query function for harmful patterns.
