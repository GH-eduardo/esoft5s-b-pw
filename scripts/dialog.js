function addDialogToEditButton(start) {
    let editButtons = document.querySelectorAll('.editButton');

    for (let index = start; index < editButtons.length; index++) {
        editButtons[index].addEventListener('click', () => dialog(index));
    }
}

function dialog(taskId) {

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

    let div = document.createElement('div')
    div.style = 'margin-top: 10px; display: flex; gap: 10px;'
    div.appendChild(cancelButton)
    div.appendChild(saveButton)

    const tasks = JSON.parse(localStorage.getItem(taskKey)) || []

    dialog.innerHTML = `
        <form id="editTaskForm">
            <label for="title"></label>
            <input type="text" name="title" value="${tasks[taskId].title}" required>
            <label for="description"></label>
            <textarea name="description" required>${tasks[taskId].description}</textarea>
        </form>
    `
    dialog.style = 'display: flex; flex-direction: column; align-items: center;'

    dialog.appendChild(div)
    dialog.open = false

    document.querySelector('main').appendChild(dialog)
    dialog.showModal()
}