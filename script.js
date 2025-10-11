const API_URL = 'http://localhost:8080/api/todos';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const timeInput = document.getElementById('time-input');
const list = document.getElementById('todo-list');
const dropdown = document.getElementById('todo-dropdown');

// Fallback tasks
const exampleTasks = [
  { id: 'ex1', title: 'Buy groceries', time: '09:00' },
  { id: 'ex2', title: 'Finish homework', time: '14:30' },
  { id: 'ex3', title: 'Call mom', time: '10:45' }
];

// Load tasks from backend or fallback
async function fetchTodos() {
  try {
    const res = await fetch(API_URL);
    const todos = await res.json();
    renderAll(todos);
  } catch {
    console.warn('Backend not available. Showing example tasks.');
    renderAll(exampleTasks);
  }
}

// Render all tasks
function renderAll(todos) {
  list.innerHTML = '';
  dropdown.innerHTML = '<option disabled selected>-- Choose a task --</option>';
  todos.forEach(todo => {
    renderTodo(todo);
    addToDropdown(todo);
  });
}

// Render one task in list
function renderTodo(todo) {
  const li = document.createElement('li');

  const top = document.createElement('div');
  top.className = 'top';

  const inputField = document.createElement('input');
  inputField.value = `${todo.title} (${todo.time})`;
  inputField.disabled = true;

  const actions = document.createElement('div');
  actions.className = 'actions';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.onclick = () => {
    inputField.disabled = !inputField.disabled;
    editBtn.textContent = inputField.disabled ? 'Edit' : 'Save';
    if (inputField.disabled && !todo.id.startsWith('ex')) {
      const [newTitle, newTime] = inputField.value.split(' (');
      updateTodo(todo.id, newTitle.trim(), newTime.replace(')', '').trim());
    }
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = async () => {
    li.remove();
    removeFromDropdown(todo.id);
    if (!todo.id.startsWith('ex')) {
      await deleteTodo(todo.id);
    }
  };

  actions.append(editBtn, deleteBtn);
  top.append(inputField, actions);
  li.append(top);
  list.appendChild(li);
}

// Add task to dropdown
function addToDropdown(todo) {
  const option = document.createElement('option');
  option.value = todo.id;
  option.textContent = `${todo.title} (${todo.time})`;
  dropdown.appendChild(option);
}

// Remove task from dropdown
function removeFromDropdown(id) {
  const option = dropdown.querySelector(`option[value="${id}"]`);
  if (option) option.remove();
}

// Add new task
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = input.value.trim();
  const time = timeInput.value.trim();
  if (!title || !time) return;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, time })
    });
    const newTodo = await res.json();
    renderTodo(newTodo);
    addToDropdown(newTodo);
  } catch {
    const fallbackTodo = { id: `ex${Date.now()}`, title, time };
    renderTodo(fallbackTodo);
    addToDropdown(fallbackTodo);
  }

  input.value = '';
  timeInput.value = '';
});

// Update task
async function updateTodo(id, title, time) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, time })
  });
  const option = dropdown.querySelector(`option[value="${id}"]`);
  if (option) option.textContent = `${title} (${time})`;
}

// Delete task
async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}

// Load tasks on page load
fetchTodos();