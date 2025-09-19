document.getElementById('start').addEventListener('click', async () => {
  const fileInput = document.getElementById('fileInput');
  const status = document.getElementById('status');

  if (!fileInput.files.length) {
    alert('Please select a file first');
    return;
  }

  const file = fileInput.files[0];
  status.textContent = 'Reading file';

  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const jsonText = event.target.result;
      const questions = JSON.parse(jsonText);
      status.textContent = `${questions.length} questions.`;

      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'runQuestions', questions}, (response) => {
          if (chrome.runtime.lastError) {
            status.textContent = "Running";
          } else {
            status.textContent = "Running";
          }
        });
      });
    } catch (e) {
      status.textContent = "Error parsing JSON file: " + e.message;
    }
  };

    reader.onerror = () => {
    status.textContent = "Error reading file";
  };

  reader.readAsText(file);
});

//   try {
//     // Send file as FormData to backend
//     const formData = new FormData();
//     formData.append('file', file);

//     status.textContent = 'Parsing file';

//     const response = await fetch('http://localhost:4000/parse', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error(`Failed: ${response.statusText}`);
//     }

//     const result = await response.json();
//     const { questions } = result;

//     status.textContent = `${questions.length} questions parsed. Creating in Canvas.`;

//     // Inject automation into active Canvas tab
//     chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
//       chrome.scripting.executeScript({
//         target: {tabId: tabs[0].id},
//         function: async (questions) => {
//           for (let i = 0; i < questions.length; i++) {
//             try {
//               await createQuestion(questions[i]);
//               window.postMessage({type: 'log', message: `Question ${i+1} created`, success: true});
//             } catch (e) {
//               window.postMessage({type: 'log', message: `Question ${i+1} failed: ${e.message}`, success: false});
//             }
//           }
//         },
//         args: [questions],
//       });
//     });

//     status.textContent = 'Creating questions.';

//   } catch (error) {
//     status.textContent = `Error: ${error.message}`;
//   }
// });

function appendLog(message, success = true) {
  const logContainer = document.getElementById('logContainer');
  const errorContainer = document.getElementById('errorContainer');
  if (!logContainer) return;
  if (!errorContainer) return;

  const line = document.createElement('div');
  line.textContent = message;
  line.style.padding = '4px 6px';
  line.style.marginBottom = '2px';
  line.style.borderRadius = '4px';
  line.style.color = success ? '#155724' : '#721c24';
  line.style.backgroundColor = success ? '#d4edda' : '#f8d7da';

  logContainer.appendChild(line);
  if (!success) {
    errorContainer.appendChild(line.cloneNode(true));
  }
  logContainer.scrollTop = logContainer.scrollHeight; // auto scroll down
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'log') {
    appendLog(message.message, message.success);
  }
});

