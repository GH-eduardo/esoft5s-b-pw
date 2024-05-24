// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault(); // Evita o recarregamento da página
  const taskId = new Date().getTime();
  const taskList = document.querySelector('#taskList');

  const form = document.querySelector('#taskForm');
  const formData = new FormData(form);

  const taskTitle = formData.get('title');
  const taskDescription = formData.get('description');

  const li = document.createElement('li');

  li.id = taskId;
  li.innerHTML = `
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
  `;

  taskList.appendChild(li);

  const editButton = document.createElement('button');
  editButton.textContent = '✏️';
  editButton.title = 'Editar tarefa';
  editButton.class = 'editButton';
  editButton.classList.add('editButton');
  li.appendChild(editButton);

  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks.push({ title: taskTitle, description: taskDescription });
  localStorage.setItem(taskKey, JSON.stringify(tasks));

  form.reset();
}
