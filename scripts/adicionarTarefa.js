function adicionarTarefa() {

    let input = document.querySelector('#writeTask');
    let button = document.querySelector('#addTask');

    let existingList = JSON.parse(localStorage.getItem('todoList')) || { tasks: [] };
    if (existingList == null) { existingList = { tasks: [] }; }
    for (let i = 0; i < existingList.tasks.length; i++) {
        let a = document.createElement("p");
        a.textContent = `${i + 1}. ${existingList.tasks[i]}`;
        document.querySelector("main").appendChild(a);
    }

    button.addEventListener('click', () => {
        button.style.backgroundColor = "red";
        setTimeout(() => {
            button.style.backgroundColor = "#0074d9";
        }, 100);

        existingList = { tasks: [] };

        if (text !== '') {

            let text = input.value.trim();
            existingList.tasks.push(text);
            localStorage.setItem('todoList', JSON.stringify(existingList));

            input.value = '';

            existingList = JSON.parse(localStorage.getItem('todoList'));
            let p = document.createElement("p");
            p.textContent = `${existingList.tasks.length}. ${existingList.tasks[existingList.tasks.length - 1]}`;
            document.querySelector("main").appendChild(p);
        }
    });
}
