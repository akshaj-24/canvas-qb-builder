# Copilot Instructions for AI Coding Agents

## Project Overview
This is a browser extension for managing and exporting question banks, likely for Canvas LMS or similar platforms. The codebase is JavaScript/HTML-based and consists of content scripts, workflow logic, and a simple UI.

## Key Components
- `contentScript.js`: Injected into the browser context, handles DOM interactions and data extraction.
- `getdata.js`: Responsible for fetching or processing question data, possibly from the page or external sources.
- `workflow.js`: Orchestrates the main logic flow, including user actions and data export.
- `ui.html`: The extension's popup or main UI, interacts with scripts via DOM events.
- `test_questions_40.json`: Sample data for development/testing.

## Developer Workflows
- **No build step detected**: Code is plain JS/HTML; changes are reflected immediately in the extension.
- **Testing**: Use `test_questions_40.json` for local data-driven testing. No automated test framework present.
- **Debugging**: Use browser DevTools to inspect injected scripts and UI. Reload the extension after code changes.

## Project-Specific Patterns
- Data flows from the browser DOM (via `contentScript.js`) to the UI and export logic (`workflow.js`).
- Communication between scripts is via DOM events and direct function calls; no message passing or background scripts detected.
- JSON is the primary data format for import/export.
- UI logic is minimal and handled in `ui.html` with event listeners.

## Integration Points
- No external dependencies or package managers detected.
- Designed to run as a browser extension; ensure manifest changes are reflected by reloading the extension.

## Conventions
- Keep logic modular: UI, data extraction, and workflow are separated by file.
- Use `test_questions_40.json` for validating data handling routines.
- All scripts are loaded directly; avoid using ES modules or advanced bundling.

## Example Patterns
- To extract questions: see `contentScript.js` for DOM traversal and data collection.
- To trigger export: see `workflow.js` for how data is packaged and sent to the user.
- UI event handling: see `ui.html` for button click listeners and script integration.

---
For questions or unclear patterns, review the main JS files and `ui.html` for direct examples. Update this file as new workflows or conventions emerge.
