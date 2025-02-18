document.getElementById('theme-toggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  this.querySelector('i').classList.toggle('fa-sun');
  this.querySelector('i').classList.toggle('fa-moon');
});


document.getElementById('planner-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const subject = document.getElementById('subject').value;
  const topic = document.getElementById('topic').value;
  const deadline = document.getElementById('deadline').value;
  
  const noteItem = document.createElement('div');
  noteItem.className = 'note-item';
  noteItem.innerHTML = `<strong>${subject}</strong>: ${topic} (Due: ${deadline})`;
  document.getElementById('schedule').appendChild(noteItem);
  
  this.reset();
});



document.getElementById('send-btn').addEventListener('click', function() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  
  if (message) {
    const chatbox = document.getElementById('chatbox');
    
    const userMsg = document.createElement('div');
    userMsg.className = 'message user-message';
    userMsg.textContent = message;
    chatbox.appendChild(userMsg);
    
    const aiMsg = document.createElement('div');
    aiMsg.className = 'message ai-message';
    aiMsg.textContent = "Hello,I'm here to help!";
    chatbox.appendChild(aiMsg);
    
    chatbox.scrollTop = chatbox.scrollHeight;
    input.value = '';
  }
});



let timerRunning = false;
let timerInterval;
const startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', function() {
  if (timerRunning) {
    clearInterval(timerInterval);
    this.innerHTML = '<i class="fas fa-play"></i> Start';
    timerRunning = false;
  } else {
    let timeLeft = 60 * 60;
    this.innerHTML = '<i class="fas fa-pause"></i> Pause';
    timerRunning = true;
    
    timerInterval = setInterval(() => {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      document.getElementById('timer').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert('Great job! Take a break!');
        this.innerHTML = '<i class="fas fa-play"></i> Start';
        timerRunning = false;
      }
    }, 1000);
  }
});

document.getElementById('reset-btn').addEventListener('click', function() {
  clearInterval(timerInterval);
  document.getElementById('timer').textContent = '60:00';
  startBtn.innerHTML = '<i class="fas fa-play"></i> Start';
  timerRunning = false;
});


document.getElementById('save-note').addEventListener('click', function() {
  const noteInput = document.getElementById('note-input');
  const noteText = noteInput.value.trim();
  
  if (noteText) {
    const noteItem = document.createElement('div');
    noteItem.className = 'note-item';
    noteItem.textContent = noteText;
    document.getElementById('notes-list').appendChild(noteItem);
    noteInput.value = '';
  }
});
// Daily Questions Tracker
const questionForm = document.getElementById('question-form');
const questionsList = document.getElementById('questions-list');
const totalQuestionsEl = document.getElementById('total-questions');
const questionsTodayEl = document.getElementById('questions-today');
const currentStreakEl = document.getElementById('current-streak');

// Load questions from localStorage
let questions = JSON.parse(localStorage.getItem('daily-questions')) || [];
updateQuestionStats();

questionForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get current date at midnight (to compare dates properly)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Check if user already added a question today
  const addedToday = questions.some(q => {
    const qDate = new Date(q.date);
    qDate.setHours(0, 0, 0, 0);
    return qDate.getTime() === today.getTime();
  });
  
  if (addedToday) {
    alert('You have already added today\'s question. Come back tomorrow!');
    return;
  }
  
  const title = document.getElementById('question-title').value;
  const difficulty = document.getElementById('question-difficulty').value;
  const link = document.getElementById('question-link').value;
  const notes = document.getElementById('question-notes').value;
  
  const newQuestion = {
    id: Date.now(),
    title,
    difficulty,
    link,
    notes,
    date: new Date().toISOString(),
    isCustom: true // Flag to identify user-added questions
  };
  
  questions.unshift(newQuestion);
  localStorage.setItem('daily-questions', JSON.stringify(questions));
  
  displayQuestion(newQuestion);
  updateQuestionStats();
  this.reset();
  
  // Show success message
  alert('Question added successfully! Come back tomorrow to maintain your streak!');
});

function displayQuestion(question) {
  const questionEl = document.createElement('div');
  questionEl.className = 'question-item';
  
  const date = new Date(question.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  questionEl.innerHTML = `
    <div class="question-item-header">
      <span class="question-title">${question.title}</span>
      <span class="question-date">${formattedDate}</span>
    </div>
    <span class="question-difficulty difficulty-${question.difficulty.toLowerCase()}">
      ${question.difficulty}
    </span>
    ${question.notes ? `<p class="question-notes">${question.notes}</p>` : ''}
    ${question.link ? `
      <a href="${question.link}" target="_blank" class="question-link">
        <i class="fas fa-external-link-alt"></i>
        View Question
      </a>
    ` : ''}
    ${question.isCustom ? '<span class="custom-badge">Custom Question</span>' : ''}
  `;
  
  if (questionsList.firstChild) {
    questionsList.insertBefore(questionEl, questionsList.firstChild);
  } else {
    questionsList.appendChild(questionEl);
  }
}

function updateQuestionStats() {
  // Update total questions
  totalQuestionsEl.textContent = questions.length;
  
  // Get today's date at midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Count questions solved today
  const questionsToday = questions.filter(q => {
    const qDate = new Date(q.date);
    qDate.setHours(0, 0, 0, 0);
    return qDate.getTime() === today.getTime();
  }).length;
  questionsTodayEl.textContent = questionsToday;
  
  // Calculate current streak
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  let datesChecked = new Set();
  
  // Sort questions by date for accurate streak calculation
  const sortedQuestions = [...questions].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  for (let i = 0; i < sortedQuestions.length; i++) {
    const questionDate = new Date(sortedQuestions[i].date);
    questionDate.setHours(0, 0, 0, 0);
    const dateStr = questionDate.toISOString();
    
    if (!datesChecked.has(dateStr)) {
      datesChecked.add(dateStr);
      
      if (questionDate.getTime() === currentDate.getTime()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (
        (currentDate.getTime() - questionDate.getTime()) / (1000 * 60 * 60 * 24) > 1
      ) {
        // Break if there's a gap of more than 1 day
        break;
      }
    }
  }
  
  currentStreakEl.textContent = streak;
  
  // Check if user needs to add today's question
  const hasAddedToday = questions.some(q => {
    const qDate = new Date(q.date);
    qDate.setHours(0, 0, 0, 0);
    return qDate.getTime() === today.getTime();
  });
  
  if (!hasAddedToday) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = 'Add today\'s question to maintain your streak!';
    questionForm.insertBefore(notification, questionForm.firstChild);
  }
}

// Add this CSS to style the notification and custom badge
const style = document.createElement('style');
style.textContent = `
  .notification {
    background-color: #fff3cd;
    color: #856404;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border-radius: 4px;
    text-align: center;
  }
  
  .custom-badge {
    background-color: var(--primary);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    margin-left: 0.5rem;
  }
  
  .dark-mode .notification {
    background-color: #2c2c2c;
    color: #ffd700;
  }
`;
document.head.appendChild(style);

// Display existing questions
questions.forEach(displayQuestion);