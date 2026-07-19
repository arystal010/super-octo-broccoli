export async function streamChat(messages, onToken, onDone, onError) {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages }),
        });

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        // Handle response
        const data = await response.json();
        onToken(data.content);
        onDone(data.content);
    } catch (err) {
        onError(err);
    }
}