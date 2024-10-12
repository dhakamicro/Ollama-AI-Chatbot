<p align="center"><a href="https://huggingface.co/meta-llama" target="_blank"><img height="128" src="https://huggingface.co/front/assets/huggingface_logo-noborder.svg"></a><a href="https://ollama.com/download" target="_blank"><img height="128" src="https://ollama.com/public/ollama.png"></a></p>

# Ollama AI Chatbot

Ollama AI Chatbot is a web-based application that allows users to interact with the [Ollama Llama 3](https://ollama.com) AI model through a chat interface. This project provides a seamless way to submit prompts and get AI-generated responses. It also supports optional file uploads, which can be included with the prompt to enrich the context for the AI.

The system features real-time streaming of AI responses and includes a **Stop** button that allows users to halt the AI response generation if needed.

## Features

- **Real-time Streaming**: Responses from the AI are streamed in real time to enhance user experience.
- **File Uploads**: Users can optionally upload files to provide additional context to the AI when generating responses.
- **Stop Functionality**: Users can stop the AI mid-response using the "Stop" button.
- **Customizable UI**: The chat interface is clean, modern, and built with Bootstrap 5 for easy customization.
- **Server-Sent Events (SSE)**: The project uses SSE to stream responses efficiently.

## Screenshots

- Chat interface with prompts and AI responses.
- Real-time streaming of AI-generated content.
- File upload option and Stop button functionality.

## Prerequisites

To run this project locally, you need:

- **Node.js** (v14 or higher)
- **NPM** or **Yarn**
- [Ollama](https://ollama.com) command line interface installed (if not already)

### Install Ollama

Make sure you have Ollama installed and accessible via the command line. Follow instructions at [Ollama.com](https://ollama.com/download) for installation.

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/Ollama-AI-Chatbot.git
   cd Ollama-AI-Chatbot
   ```

2. **Install Dependencies**

- Run the following command to install all required packages:

`npm install`

3. **Run the Application**

   - Once the dependencies are installed, you can start the server:

   `npm start `

- The server will be running on http://localhost:3000.

4. **Access the Web Interface**
   Open your browser and navigate to:

`http://localhost:3000`

## Usage

### Sending a Prompt

- Type your query in the input box and click the **"Send Prompt"** button.
- The AI will process the prompt and stream the response back to the chat box in real time.

### Uploading a File (Optional)

- Click the **"Browse"** button to upload a file. The file's contents will be sent along with the prompt to provide additional context for the AI.
- The uploaded file will be shown as part of the prompt in the chat.

### Stopping the Response

- If the response is taking too long or you want to cancel it, click the **"Stop"** button to immediately halt the AI response.

### File Structure

```
├── public/
│   └── index.html        # Front-end UI (Chat Interface)
├── server.js             # Node.js backend (Express server)
├── package.json          # Project metadata and dependencies
├── uploads/              # Directory to store uploaded files (created automatically)
└── README.md             # Documentation
```

## Technologies Used

- **Node.js**: JavaScript runtime for server-side code.
- **Express**: Fast and minimalist web framework for Node.js.
- **Bootstrap 5**: CSS framework for responsive and modern UI.
- **Multer**: Middleware for handling file uploads.
- **Server-Sent Events (SSE)**: Streaming protocol to send data from server to client in real-time.

## Project Configuration

### Environment Variables

To customize the environment settings, you can set the following environment variables in your `.env` file:

```PORT=3000
OLLAMA_COMMAND=ollama run llama3
```

-These variables control the server port and the command used to interact with the Ollama AI.

### Deployment

    -**Ollama and llama3**

```
sudo apt update
sudo apt upgrade
udo apt install build-essential curl git
sudo apt install cmake
sudo apt install libopenblas-dev
sudo apt install liblapack-dev
sudo apt install python3 python3-pip
sudo pip3 install virtualenv
virtualenv llama-env
source llama-env/bin/activate
 curl -fsSL https://ollama.com/install.sh | sh
ollama run llama3
```

    -**NodeJs API Server and Frontend **

```
sudo apt update
sudo apt install nodejs npm
git clone https://github.com/yourusername/Ollama-AI-Chatbot.git
cd Ollama-AI-Chatbot
npm install
npm start
```

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request with any improvements or new features.

### License

This project is licensed under the MIT License - see the LICENSE file for details.
