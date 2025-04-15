const themeToggleButton = document.getElementById('theme-toggle');
themeToggleButton.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  
  const themeIcon = this.querySelector('i');
  themeIcon.classList.toggle('fa-sun');
  themeIcon.classList.toggle('fa-moon');
});

const studyPlanForm = document.getElementById('planner-form');
const studyPlanList = document.getElementById('study-plan-list');

studyPlanForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const subject = document.getElementById('subject').value;
  const topic = document.getElementById('topic').value;
  const deadline = document.getElementById('deadline').value;
  
  const formattedDate = new Date(deadline).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  const planItem = document.createElement('div');
  planItem.className = 'note-item';
  planItem.innerHTML = `<strong>${subject}</strong>: ${topic} (Due: ${formattedDate})`;
  
  studyPlanList.appendChild(planItem);
  
  this.reset();
});

const sendButton = document.getElementById('send-btn');
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('user-input');

sendButton.addEventListener('click', function() {
  const message = userInput.value.trim();
  
  if (message) {
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = message;
    chatbox.appendChild(userMessage);
    
    const aiMessage = document.createElement('div');
    aiMessage.className = 'message ai-message';
    aiMessage.textContent = "I'm here to help with your studies! What would you like to learn today?";
    chatbox.appendChild(aiMessage);
    
    chatbox.scrollTop = chatbox.scrollHeight;
    
    userInput.value = '';
  }
});

userInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    sendButton.click();
    event.preventDefault();
  }
});

let timerRunning = false;
let timerInterval;
const startButton = document.getElementById('start-btn');
const resetButton = document.getElementById('reset-btn');
const timerDisplay = document.getElementById('timer');

startButton.addEventListener('click', function() {
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
      
      timerDisplay.textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert('Great job! You completed a full focus session. Take a break!');
        this.innerHTML = '<i class="fas fa-play"></i> Start';
        timerRunning = false;
      }
    }, 1000);
  }
});

resetButton.addEventListener('click', function() {
  clearInterval(timerInterval);
  timerDisplay.textContent = '60:00';
  startButton.innerHTML = '<i class="fas fa-play"></i> Start';
  timerRunning = false;
});

const saveNoteButton = document.getElementById('save-note');
const noteInput = document.getElementById('note-input');
const notesList = document.getElementById('notes-list');

saveNoteButton.addEventListener('click', function() {
  const noteText = noteInput.value.trim();
  
  if (noteText) {
    const now = new Date();
    const timestamp = now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const noteItem = document.createElement('div');
    noteItem.className = 'note-item';
    noteItem.innerHTML = `
      <div><small>${timestamp}</small></div>
      <div>${noteText}</div>
    `;
    
    notesList.appendChild(noteItem);
    
    noteInput.value = '';
  }
});