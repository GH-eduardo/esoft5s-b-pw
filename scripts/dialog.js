function addDialogToEditButton(start) {
    let editButtons = document.querySelectorAll('.editButton');

    for (let index = start; index < editButtons.length; index++) {
        editButtons[index].addEventListener('click', () => dialog(index));
    }
}

function editTask(taskId, newTitle, newDescription) {
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];

    const taskIndex = tasks.findIndex(task => task.id == taskId);

    tasks[taskIndex].title = newTitle;
    tasks[taskIndex].description = newDescription;

    localStorage.setItem(taskKey, JSON.stringify(tasks));
    window.location.reload()
}

function dialog(taskId, title, description) {

    let dialog = document.createElement('dialog')
    let cancelButton = document.createElement('button')
    cancelButton.innerText = 'Cancelar'
    cancelButton.id = 'cancelButton'
    cancelButton.addEventListener("click", function () {
        dialog.close();
        document.querySelector('main').removeChild(dialog)
    });
    let saveButton = document.createElement('button')
    saveButton.innerText = 'Salvar'

    dialog.innerHTML = `
        <form id="editTaskForm">
            <label for="title">Novo Título: </label>
            <input type="text" name="title" value="${title}" id="newTitle" style="margin-bottom: 15px;"required>
            <label for="description">Nova Descrição: </label>
            <textarea name="description" id="newDescription" required>${description}</textarea>
        </form>
    `
    dialog.style = 'display: flex; flex-direction: column; align-items: center; gap: 10px;'

    saveButton.addEventListener("click", function () {
        let newTitle = document.querySelector('#newTitle').value
        let newDescription = document.querySelector('#newDescription').value

        editTask(taskId, newTitle, newDescription)
        dialog.close();
        document.querySelector('main').removeChild(dialog)
        alert('Tarefa editada com sucesso!')
    });

    let div = document.createElement('div')
    div.style = 'margin-top: 10px; display: flex; gap: 10px;'
    div.appendChild(cancelButton)
    div.appendChild(saveButton)

    dialog.appendChild(div)
    dialog.open = false

    document.querySelector('main').appendChild(dialog)
    dialog.showModal()
}