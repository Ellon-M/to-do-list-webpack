export default class ManageList {
  constructor() {
    this.taskList = [];
    this.checkboxes = document.querySelectorAll('.checkbox');
    this.dels = document.querySelectorAll('.destroy');
    this.listItem = document.querySelectorAll('.list-item');
    this.listInput = document.getElementById('to-do-input');
    this.listSubmit = document.getElementById('submit-new-item');
    this.listDescription = document.querySelectorAll('.list-description');
    this.initEvents();
  }

  initEvents() {
    this.listSubmit.addEventListener('click', () => {
      this.add();
    });

    this.listSubmit.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.add();
      }
    });

    this.checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('click', (e) => {
        if (e.target.checked) {
          this.completed(Number(checkbox.id));
        } else if (!e.target.checked) {
          this.cancelCompleted(Number(checkbox.id));
        }
      });
    });

    this.dels.forEach((del) => {
      del.addEventListener('click', () => {
        this.remove(Number(del.id));
        /* eslint-disable */
        location.reload();
        /* eslint-disable */
      });
    });

    this.listDescription.forEach((desc) => {
      desc.addEventListener('click', () => {
        desc.contentEditable = 'true';
      });
      desc.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          this.update(desc.id, desc.innerText);
        }
      });
    });
  }

  add() {
    let retreived = JSON.parse(localStorage.getItem('tasks'));
    if (retreived === null) {
      retreived = [];
    }

    const taskData = {
      index: retreived.length,
      desc: this.listInput.value,
      completed: false,
    };
    localStorage.setItem('task', JSON.stringify(taskData));
    retreived.push(taskData);
    localStorage.setItem('tasks', JSON.stringify(retreived));
  }

  get() {
    this.taskList = JSON.parse(localStorage.getItem('tasks'));
  }

  update(id, newValue) {
    const retreived = JSON.parse(localStorage.getItem('tasks'));

    retreived.forEach((item) => {
      if (item.index === Number(id)) {
        item.desc = newValue;
      }
      localStorage.setItem('tasks', JSON.stringify(retreived));
    });
  }

  completed(id) {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      this.taskList.push(JSON.parse(localStorage.getItem(key)));
    });
    this.taskList.forEach((task) => {
      if (id === task.index) {
        task.completed = true;
        localStorage.setItem(`task${id}`, JSON.stringify(task));
      }
    });
  }

  cancelCompleted(id) {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      this.taskList.push(JSON.parse(localStorage.getItem(key)));
    });
    this.taskList.forEach((task) => {
      if (id === task.index) {
        task.completed = false;
        localStorage.setItem(`task${id}`, JSON.stringify(task));
      }
    });
  }

  remove(id) {
    this.taskList = JSON.parse(localStorage.getItem('tasks'));
    this.taskList.splice(id, 1);
    this.taskList.map((task) => {
      task.index = this.taskList.indexOf(task);
    });
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
  }

  updateIndexes() {
    this.taskList.map((task) => {
      task.index = this.taskList.indexOf(task);
    });
  }
}