import type { FinickyConfig } from "/Applications/Finicky.app/Contents/Resources/finicky.d.ts";

// Only change if you know what you're doing!
const SELECTOR_PORT = 5400;

// Set your default browser here
// This will also open the browser selector
const DEFAULT_BROWSER = 'Safari';

// Set your filters here
// Keep everything in lowercase and no need to include the whole URL
// You can even just add keywords
const filters = {
  
  // This will open in your default browser
  personal: [],

  // Add pages here to open the browser selector
  ask: [],

  // For opening in Google Chrome
  chrome: [],

  // For opening in Firefox
  firefox: []
};

const redirect = (url: URL) => {
  return `http://localhost:${SELECTOR_PORT}/?url=${encodeURIComponent(url.toString())}`;
}

export default {
  defaultBrowser: DEFAULT_BROWSER,
  rewrite: [
    {
      match: '*',
      url: (url) => {
        // Open browser selector if matches with ask array
        if (filters.ask.some(thing => url.toString().includes(thing))) {
          return redirect(url);
        }

        // If contains a recognized url, let other config decide
        if (Object.values(filters).flat().some(thing => url.toString().includes(thing))) {
          return url;
        }

        // Personal sites should just open default browser
        if (filters.personal.some(thing => url.toString().includes(thing))) {
          return url;
        }

        // Fallback to browser chooser
        return redirect(url);
      }
    }
  ],
  handlers: [
    {
      match: (url) => {
        if (url.toString().startsWith(`http://localhost:${SELECTOR_PORT}`)) {
          return true;
        }

        return false;
      },
      browser: DEFAULT_BROWSER
    },
    {
      match: (url) => {
        if (!url || !url.href || !url.host || !url.pathname) {
          return false;
        }

        return filters.chrome.some(thing => url.toString().toLowerCase().includes(thing));
      },
      browser: "Google Chrome"
    },
    {
      match: (url) => {
        if (!url || !url.href || !url.host || !url.pathname) {
          return false;
        }

        return (filters.firefox).some(thing => url.toString().toLowerCase().includes(thing));
      },
      browser: "Firefox"
    }
  ]
} satisfies FinickyConfig;