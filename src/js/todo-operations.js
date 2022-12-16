export const mockStorage = {};

export const saveToStorage = (taskList, { getTasks, setTasks }) => {
  getTasks = (key) => {
    localStorage.getItem(key);
  };
  setTasks = (key, tasks) => {
    localStorage.setItem(key, tasks);
    mockStorage[key] = tasks;
  };

  getTasks("tasks");
  setTasks("tasks", taskList);
};

export const addToList = (container, task) => {
  const listItem = document.createElement("li");
  listItem.innerText = task;
  container.appendChild(listItem);
};

export const removeFromStorage = (taskList, id, { setTasks }) => {
  setTasks = (key, tasks) => {
    localStorage.setItem(key, tasks);
    mockStorage[key] = tasks;
  };

  setTasks("tasks", taskList);

  mockStorage.tasks.splice(id, 1);
};

export const removeFromList = (list, id) => {
  if (id >= list.length) return;

  list.forEach((item) => {
    item.index -= 1;
  });

  list.splice(id, 1);
};

export const updateTask = (taskList, newTask, id, { getTasks, setTasks }) => {
  setTasks = (key, tasks) => {
    localStorage.setItem(key, tasks);
    mockStorage[key] = tasks;
  };

  getTasks = (key) => {
    localStorage.getItem(key);
  };

  setTasks("tasks", taskList);
  getTasks("tasks");

  mockStorage.tasks.forEach((task) => {
    for (const val in task) {
      if (id === task.index) {
        task.desc = newTask;
      }
    }
  });
  setTasks("tasks", mockStorage.tasks);
};

export const updateCompleted = (taskList, id, { setTasks }) => {
  setTasks = (key, tasks) => {
    localStorage.setItem(key, tasks);
    mockStorage[key] = tasks;
  };

  setTasks("tasks", taskList);

  mockStorage.tasks.forEach((task) => {
    if (id === task.index) {
      task.completed = true;
    }
  });

  setTasks("tasks", mockStorage.tasks);
};

export const clearAllCompleted = (taskList, { setTasks }) => {
  setTasks = (key, tasks) => {
    localStorage.setItem(key, tasks);
    mockStorage[key] = tasks;
  };
  setTasks("tasks", taskList);
  const filt = mockStorage.tasks.filter((task) => task.completed !== true);
  return filt;
};
