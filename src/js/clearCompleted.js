const clearCompleted = () => {
  const retreived = JSON.parse(localStorage.getItem('tasks'));

  const filtered = retreived.filter((task) => task.completed !== true);
  localStorage.setItem('tasks', JSON.stringify(filtered));
};

export default clearCompleted;