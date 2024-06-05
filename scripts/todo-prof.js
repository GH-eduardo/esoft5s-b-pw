const taskKey = '@tasks'

// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault() // Evita o recarregamento da página
  const taskList = document.querySelector('#taskList')

  const form = document.querySelector('#taskForm')
  const formData = new FormData(form)

  const taskTitle = formData.get('title')
  const taskDescription = formData.get('description')
  const taskId = new Date().getTime()

  taskList.innerHTML +=
    `<li id="${taskId}"><h2>Título: ${taskTitle}</h2>
    <p>Descrição: ${taskDescription}</p>
    <button class = "editButton" title = "Editar tarefa" onclick="dialog('${taskId}')">✏️</button>
    <button class = "removeButton" title = "Remover tarefa" onclick="remove('${taskId}')">️❌</button>
    </li>`

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  tasks.push({ id: taskId, title: taskTitle, description: taskDescription })
  localStorage.setItem(taskKey, JSON.stringify(tasks))

  form.reset()
}

function remove(id) {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const taskIndex = tasks.findIndex(task => task.id == id)
  tasks.splice(taskIndex, 1)
  localStorage.setItem(taskKey, JSON.stringify(tasks))
  document.getElementById(id).remove()
}

// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const taskList = document.querySelector('#taskList')
  taskList.innerHTML = tasks
    .map((task) => `<li id="${task.id}"><h2>Título: ${task.title}</h2>
    <p>Descrição: ${task.description}</p>
    <button class = "editButton" title = "Editar tarefa" onclick="dialog('${task.id}', '${task.title}', '${task.description}')">✏️</button>
    <button class = "removeButton" title = "Remover tarefa" onclick="remove('${task.id}')">️❌</button>
    </li>`)
    .join('')
})