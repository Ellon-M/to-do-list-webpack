import '../style.css';
import tasks from './tasks.js';

class ListComponent {
  constructor() {
    this.listContainer = document.querySelector('.list-container');
  }

  generateList() {
    const list = document.createElement('ul');
    const emptyMessage = document.createElement('p');

    if (tasks.length > 0) {
      list.className = 'to-do-list';

      const sortedTasks = tasks.sort((a, b) => a.index - b.index);

      sortedTasks.forEach((task) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-item';
        const description = document.createElement('span');
        const checked = document.createElement('span');
        const checkbox = document.createElement('input');
        description.className = 'list-description';
        checked.className = 'checked';
        checkbox.id = 'checkbox';
        checkbox.name = 'checkbox';
        checkbox.type = 'checkbox';
        checked.appendChild(checkbox);
        description.innerText = task.description;
        listItem.appendChild(checked);
        listItem.appendChild(description);
        list.appendChild(listItem);
      });
    } else {
      emptyMessage.innerText = 'Nothing on the list at the moment';
      list.appendChild(emptyMessage);
    }

    this.listContainer.appendChild(list);
  }
}

const list = new ListComponent();

list.generateList();

