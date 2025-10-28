# Browser setup (Mac only)
This is my secret to keep balance when working for multiple companies. 
<br><br>
<strong>By default</strong>, config will do the following:
<table>
    <thead>
        <tr>
            <th>Personal stuff</th>
            <th>Company A</th>
            <th>Company B</th>
            <th>Other stuff</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Safari</td>
            <td>Chrome</td>
            <td>Firefox</td>
            <td>Ask</td>
        </tr>
    </tbody>
</table>

## Browser chooser
This will open when opening an unknown link.

<table>
    <tr>
        <td>
            <img width="635" height="367" alt="image" src="https://github.com/user-attachments/assets/21228cb0-95ca-4061-8969-6910e68e7425" />
        </td>
        <td>
            <img width="623" height="350" alt="image" src="https://github.com/user-attachments/assets/079e1093-5c37-4a2b-ac15-d3464d5896ea" />
        </td>
    </tr>
</table>



## Install
- Install NodeJS
- Install [Finicky](https://github.com/johnste/finicky)
- Install browsers (at least Chrome and Firefox)
- Clone repo and run `setup.sh`

## Editing config
You can modify rules updating `~/.finicky.ts`. If you prefer, you may edit this folder finicky and it will automatically copy into your home folder on setup run.

**Example config**: <br>
```typescript
// ~/.finicky.ts
const DEFAULT_BROWSER = 'Safari';

// Set your filters here
// Keep everything in lowercase and no need to include the whole URL
// You can even just add keywords
const filters = {
  
  // This will open in your default browser
  personal: [
    'chatgpt.com'
  ],

  // For opening in Google Chrome
  chrome: [
    'google.com'
  ],

  // For opening in Firefox
  firefox: [
    'x.com'
  ]
};
```
This will open Google in Chrome, Twitter (x) in Firefox, ChatGPT in Safari, and ask for other links.

## Coming soon
- [ ] Dynamically list available browsers
- [ ] UI to better update config
- [ ] Remember browser for next time opening certain link
<br>
<p align="right">
<sub>Made with ♥️ by Alan</sub>
</p>
