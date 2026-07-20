<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Streaming API Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        #output {
            border: 1px solid #ccc;
            padding: 15px;
            min-height: 100px;
            margin: 10px 0;
            white-space: pre-wrap;
        }
        button {
            padding: 10px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
        .status {
            margin: 10px 0;
            padding: 5px;
        }
        .success {
            color: green;
        }
        .error {
            color: red;
        }
    </style>
</head>
<body>
    <h1>Streaming API Test</h1>
    <p>This test verifies that the streaming API fix works correctly.</p>

    <div>
        <button id="testButton">Test Streaming API</button>
    </div>

    <div class="status" id="status"></div>

    <div id="output"></div>

    <script type="module">
        // Import the fixed streamChat function
        import { streamChat } from './frontend/js/api.js';

        document.getElementById('testButton').addEventListener('click', async function() {
            const statusElement = document.getElementById('status');
            const outputElement = document.getElementById('output');

            statusElement.textContent = 'Testing streaming API...';
            statusElement.className = 'status';
            outputElement.textContent = '';

            try {
                // Test with a simple message
                const messages = [
                    { role: 'user', content: 'Hello, how are you?' }
                ];

                let fullResponse = '';

                await streamChat(
                    messages,
                    (token) => {
                        fullResponse += token;
                        outputElement.textContent = fullResponse;
                    },
                    () => {
                        statusElement.textContent = 'Streaming completed successfully!';
                        statusElement.className = 'status success';
                        console.log('Full response:', fullResponse);
                    },
                    (error) => {
                        statusElement.textContent = 'Error: ' + error.message;
                        statusElement.className = 'status error';
                        console.error('Streaming error:', error);
                    }
                );
            } catch (error) {
                statusElement.textContent = 'Test failed: ' + error.message;
                statusElement.className = 'status error';
                console.error('Test error:', error);
            }
        });
    </script>
</body>
</html>
