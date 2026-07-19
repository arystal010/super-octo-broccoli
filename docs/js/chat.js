// ============================================================
// Clear chat
// ============================================================
export function clearChat() {
    try {
        // Clear DOM elements if they exist
        const chatMessages = document.getElementById("chatMessages");
        if (chatMessages) chatMessages.innerHTML = "";

        const historyList = document.getElementById("historyList");
        if (historyList) {
            historyList.innerHTML = "";
        } else {
            console.warn("History list container not found. Skipping history reset.");
        }

        // Reset state
        currentMessages = [];
        chatHistory = [];

        // Clear storage only if HISTORY_KEY exists and removeStorage is available
        if (HISTORY_KEY && typeof removeStorage === "function") {
            removeStorage(HISTORY_KEY);
        } else {
            console.warn("Failed to clear storage. HISTORY_KEY may not exist or removeStorage is missing.");
        }
    } catch (error) {
        console.error("Error during clearChat():", error);
    }
}