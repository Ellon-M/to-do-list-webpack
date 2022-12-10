import '../style.css';
import ManageList from './manageList.js';

class ListComponent {
  constructor() {
    this.listContainer = document.querySelector('.list-wrap');
    this.tasks = [];
  }

  generateList() {
    const list = document.querySelector('.list');

    const emptyMessage = document.createElement('p');

    const taskData = JSON.parse(localStorage.getItem('tasks'));

    if (taskData !== null) {
      taskData.forEach((task) => {
        this.tasks.push(task);
      });
    }

    if (this.tasks.length > 0) {
      this.tasks.forEach((task) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        const description = document.createElement('label');
        const checked = document.createElement('span');
        const checkbox = document.createElement('input');
        const del = document.createElement('img');
        description.className = 'list-description';
        checked.className = 'checked';
        checkbox.className = 'checkbox';
        checkbox.id = task.index;
        checkbox.name = 'checkbox';
        checkbox.type = 'checkbox';
        checked.appendChild(checkbox);
        description.innerText = task.desc;
        description.id = task.index;
        del.className = 'destroy';
        del.id = task.index;
        del.src = 'https://img.icons8.com/ios/24/000000/null/delete--v1.png';
        listItem.appendChild(checked);
        listItem.appendChild(description);
        listItem.appendChild(del);

        list.appendChild(listItem);
      });
    } else {
      emptyMessage.innerText = 'Nothing on the list at the moment';
      list.appendChild(emptyMessage);
    }

    const bottomLink = document.createElement('div');
    const clearLink = document.createElement('a');

    bottomLink.className = 'bottom-link';
    clearLink.className = 'clear-link';
    clearLink.innerText = 'clear all completed';

    bottomLink.appendChild(clearLink);

    this.listContainer.appendChild(list);
    this.listContainer.appendChild(bottomLink);

    /* eslint-disable */
    const m = new ManageList();
    /* eslint-disable */
  }
}

const list = new ListComponent();

list.generateList();
