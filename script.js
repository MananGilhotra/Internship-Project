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
    aiMsg.textContent = "I'm here to help!";
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

