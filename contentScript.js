chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'runQuestions') {  // check that this message asks to run questions
    const questions = request.questions;
    for (let i = 0; i < questions.length; i++) {
      try {
        await createQuestion(questions[i]);  // call your automation function
        chrome.runtime.sendMessage({
          type: 'log',
          message: `Question ${i + 1} created`,
          success: true
        });
      } catch (error) {
        chrome.runtime.sendMessage({
          type: 'log',
          message: `Question ${i + 1} failed: ${error.message}`,
          success: false
        });
      }
    }
    sendResponse({ status: 'done' });  // reply to popup that automation finished
  }
});
