import type { FinickyConfig } from "/Applications/Finicky.app/Contents/Resources/finicky.d.ts";

// Set your default browser here
// This will also open the browser selector
const DEFAULT_BROWSER = 'Safari';

// Set your filters here
// Keep everything in lowercase and no need to include the whole URL
// You can even just add keywords
const filters = {
  
  // This will open in your default browser
  personal: [],

  // For opening in Google Chrome
  chrome: [],

  // For opening in Firefox
  firefox: []
};

export default {
  defaultBrowser: DEFAULT_BROWSER,
  rewrite: [
    {
      match: '*',
      url: (url) => {
        // If contains a recognized url, let other config decide
        if (Object.values(filters).flat().some(thing => url.toString().includes(thing))) {
          return url;
        }

        // Personal sites should just open default browser
        if (filters.personal.some(thing => url.toString().includes(thing))) {
          return url;
        }

        // Redirect to browser chooser
        return `http://localhost:4400/?url=${encodeURIComponent(url.toString())}`;
      }
    }
  ],
  handlers: [
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