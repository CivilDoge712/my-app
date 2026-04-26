const cacheName = 'task-v2';
const assets = [
  './',
  './index.html',
  './settings.html',
  './info.html',
  './style.css',
  './manifest.json'
];

// Install: Cache everything
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// Fetch: Try network first, then cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

function addTask() {
    const input = document.getElementById('taskInput');
    const repeat = document.getElementById('taskRepeat');
    const val = input.value.trim();
    
    if (!val) return;
    
    // Save the text AND the repeat schedule
    tasks.push({ 
        text: val, 
        schedule: repeat.value 
    });
    
    input.value = "";
    saveAndRender();
}

function renderTasks() {
    const list = document.getElementById('taskList');
    if (!list) return;
    
    if (tasks.length === 0) {
        list.innerHTML = '<p style="text-align:center; color:#8e8e93;">No tasks yet!</p>';
        return;
    }

    list.innerHTML = tasks.map((task, i) => `
        <div class="task-card">
            <div style="display: flex; flex-direction: column;">
                <span class="task-text">${task.text}</span>
                <small style="color: #8e8e93; font-size: 12px;">Reappears: ${task.schedule}</small>
            </div>
            <button class="tick-btn" onclick="deleteTask(${i})">✔</button>
        </div>
    `).join('');
}
