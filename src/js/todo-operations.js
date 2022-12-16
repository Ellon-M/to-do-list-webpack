export const mockStorage = {};

export const saveToStorage = (taskList, { getTasks, setTasks }) => {
  getTasks = (key) => {
    localStorage.getItem(key);
  };
  setTasks = (key, tasks) => {
    localStorage.setItem(key, tasks);
    mockStorage[key] = tasks;
  };

  getTasks('tasks');
  setTasks('tasks', taskList);
};

export const addToList = (container, task) => {
  const listItem = document.createElement('li');
  listItem.innerText = task;
  container.appendChild(listItem);
};

export const removeFromStorage = (taskList, id, { setTasks }) => {
  setTasks = (key, tasks) => {
    localStorage.setItem(key, tasks);
    mockStorage[key] = tasks;
  };

  setTasks('tasks', taskList);

  mockStorage.tasks.splice(id, 1);
};

export const removeFromList = (list, id) => {
  if (id >= list.length) return;

  list.forEach((item) => {
    item.index -= 1;
  });

  list.splice(id, 1);
};
