const taskKey = '@tasks'

// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault() // Evita o recarregamento da página
  const taskList = document.querySelector('#taskList')

  const form = document.querySelector('#taskForm')
  const formData = new FormData(form)

  const taskTitle = formData.get('title')
  const taskDescription = formData.get('description')

  const li = document.createElement('li')

  li.innerHTML = `
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
  `
  const editButton = document.createElement('button')
  editButton.textContent = '✏️'
  editButton.title = 'Editar tarefa'
  editButton.classList.add('editButton')
  li.appendChild(editButton)

  taskList.appendChild(li)

  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  tasks.push({ title: taskTitle, description: taskDescription})
  localStorage.setItem(taskKey, JSON.stringify(tasks))

  form.reset()
  addDialogToEditButton(tasks.length - 1) // começa pelo último adicionado
}

// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const taskList = document.querySelector('#taskList')
  taskList.innerHTML = tasks
    .map((task) => `<li><h2>${task.title}</h2><p>${task.description}</p><button class = "editButton" title = "Editar tarefa">✏️</button></li>`)
    .join('')
    addDialogToEditButton(0) // começa a partir do primeiro botão
})