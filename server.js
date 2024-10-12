const express = require('express');
const { spawn } = require('child_process');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cluster = require('cluster');
const os = require('os');

// Get the number of available CPU cores
const numCPUs = os.cpus().length;

// Check if the process is the master
if (cluster.isMaster) {
    console.log(`Master process is running with PID: ${process.pid}`);

    // Fork a worker for each CPU core
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Listen for exiting workers and replace them with new ones
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} exited with code ${code}. Forking a new worker...`);
        cluster.fork(); // Start a new worker if one exits
    });
} else {
    // Worker processes will run the following code
    const app = express();
    const port = 3000;

    // Set up multer for file uploads
    const upload = multer({ dest: 'uploads/' }); // Upload destination folder

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));

    // Endpoint to handle prompts and run Ollama with SSE (Server-Sent Events)
    app.get('/api/run-ollama', (req, res) => {
        const prompt = req.query.prompt;
        const filePath = req.query.filePath || '';  // Handle undefined filePath

        console.log(`Received prompt: "${prompt}"`);

        let finalPrompt = prompt;

        if (filePath) {
            // If a file is provided, append its contents to the prompt
            try {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                finalPrompt += `\n\nFile Contents:\n${fileContent}`;
            } catch (err) {
                console.error(`Error reading file: ${err.message}`);
                return res.status(500).json({ error: 'Failed to read file' });
            }
        }

        const ollamaProcess = spawn('ollama', ['run', 'llama3']);

        // Send the prompt to Ollama
        // ollamaProcess.stdin.write('/set parameter num_thread 20');
        ollamaProcess.stdin.write(finalPrompt);
        ollamaProcess.stdin.end();

        // Set up Server-Sent Events (SSE) response
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // Stream response from Ollama
        ollamaProcess.stdout.on('data', (data) => {
            const chunk = data.toString();
            console.log(`Sending chunk: ${chunk}`);
            res.write(`data: ${chunk}\n\n`);
        });

        ollamaProcess.stdout.on('end', () => {
            res.write('data: [DONE]\n\n');
            res.end();
        });

        ollamaProcess.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
        });

        ollamaProcess.on('close', (code) => {
            console.log(`Ollama process exited with code ${code}`);
        });
    });

    // Endpoint to handle file uploads
    app.post('/upload', upload.single('file'), (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = path.join(__dirname, req.file.path);
        console.log(`File uploaded to: ${filePath}`);

        res.json({ filePath });
    });

    // Start the Express server
    app.listen(port, () => {
        console.log(`Worker process running on http://localhost:${port} with PID: ${process.pid}`);
    });
}
