// utils.js - Existing content (if any)
export { CONFIG } from "./config.js";
export { streamChat } from "./api.js";
export { renderMarkdown, highlightCodeBlocks } from "./markdown.js";
export {
  $,
  $$,
  generateId,
  sanitize,
  copyToClipboard,
  autoResizeTextarea,
  getStorage,
  setStorage,
  formatTime
} from "./utils.js";

// --- NEW FUNCTION ---
export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
    console.log(`Removed storage for key: ${key}`);
  } catch (error) {
    console.error("Failed to remove storage:", error);
  }
}