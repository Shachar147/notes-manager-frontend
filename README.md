# 📝 Welcome to notes-manager-frontend! 🌐

Hello! 👋 This is the frontend for the Notes Manager app, allowing you to manage your notes and knowledgebase with a modern, user-friendly interface.

## ⚙️ Setup Instructions

1. **Environment Variables**
   - Create a `.env` file in the root of the `notes-manager-frontend` directory.
   - You can copy the example from `.env-dev`:
     ```bash
     cp .env-dev .env
     ```
   - Edit the `.env` file as needed for your environment.

2. **🔑 Google Client ID**
   - Make sure your `.env` file contains a valid Google Client ID for authentication.
   - Obtain a Google Client ID from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
   - Add it to your `.env` file, for example:
     ```env
     VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
     ```

3. **📦 Install Dependencies**
   ```bash
   npm install
   ```

4. **▶️ Run the Development Server**
   ```bash
   npm run dev
   ```
   - The app will be available at the URL shown in your terminal (usually http://localhost:5173).

## 💡 Note for Intel Mac users
If you're on an Intel chip, make sure to follow the backend instructions for using the correct Docker Compose file (`docker-compose-intel.yml`).

--- 