// set wait time in ms
function wait() {
  return new Promise(resolve => setTimeout(resolve, 100));
}

//parameter list
async function createQuestion({
    questionTitle,
    questionType,
    points = 1,
    questionText,
    answerChoices = [],
    correctAnswers = [],
    nurs = false
}) {
  // add question   
  document.querySelector('button.add_question_link').click();
  await wait();

  // title
  document.querySelector('input[name="question_name"]').value = questionTitle;
  document.querySelector('input[name="question_name"]').dispatchEvent(new Event('change', { bubbles: true }));

  // points
  document.querySelector('input#question_points').value = points;
  document.querySelector('input#question_points').dispatchEvent(new Event('change', { bubbles: true }));

  await wait();

  // question type
  const typeSelect = document.querySelector('select[name="question_type"]');
  if (typeSelect && questionType) {
    typeSelect.value = questionType;
    typeSelect.dispatchEvent(new Event('change', { bubbles: true }));
    await wait();
  }

  await wait();

  // question text
  const iframe = document.querySelector('.tox-edit-area iframe');
  const tinymce = iframe.contentDocument.getElementById('tinymce');
  if (nurs === true) {
    tinymce.innerHTML = `
      <div style="background-color: #ccffcc; height: 100%; padding: 20px 10px 10px 20px; margin-bottom: 10px;">
        <p>${questionText}</p>
      </div>`;
  } else {
    tinymce.innerText = questionText;
  }
  tinymce.dispatchEvent(new Event('change', { bubbles: true }));
  await wait();

  const answersDiv = document.querySelector('.form_answers');
  let answers = answersDiv.querySelectorAll(':scope > div');

  // Adjust number of answer choices
  // add
  while (answers.length < answerChoices.length) {
    document.querySelector('a.add_answer_link').click();
    await wait();
    answers = answersDiv.querySelectorAll(':scope > div');
  }

  // delete
  while (answers.length > answerChoices.length) {
    answers[answers.length - 1].querySelector('a.delete_answer_link').click();
    await wait();
    answers = answersDiv.querySelectorAll(':scope > div');
  }

  answers = answersDiv.querySelectorAll(':scope > div');

  // add answer option text
  for (let i = 0; i < answerChoices.length; i++) {
    answers[i].querySelector('input[name="answer_text"]').value = answerChoices[i];
    answers[i].querySelector('input[name="answer_text"]').dispatchEvent(new Event('change', { bubbles: true }));
  }

  await wait();


  answers[0].querySelector('button.select_answer_link').click();
  await wait();


  // set correct answers
  for (const ans of correctAnswers) {
    if (answers[ans]) {
        const answerDiv = answers[ans];
        const isSelected = answerDiv.classList.contains('correct_answer');

        if (questionType === 'multiple_answers_question') {
        if (!isSelected) {
            answerDiv.querySelector('button.select_answer_link').click();
            await wait();
        }
        } else {
        answerDiv.querySelector('button.select_answer_link').click();
        await wait();
        }
    }
    }

  await wait();

  // update question
  document.querySelector('button.submit_button').click();

  await wait();
  console.log("Question Created");
}

window.createQuestion = createQuestion;

/*
createQuestion({
  questionTitle: "Question 001",
  questionType: "multiple_choice_question",
  points: 1,
  questionText: "Answer is B",
  answerChoices: ["Option A", "Option B", "Option C", "Option D", "Option E"],
  correctAnswers: [1],
  nurs: true
});
*/

/*
Add comments:
Must always pass answer choices [] even if true false question with choices ["True", "False"]
For all question types EXCEPT multiple_answers_question, only pass one value in the correctAnswers array
*/