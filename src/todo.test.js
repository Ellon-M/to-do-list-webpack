import {
  mockStorage,
  saveToStorage,
  addToList,
  removeFromStorage,
  removeFromList,
  updateTask,
  updateCompleted,
  clearAllCompleted,
} from "./js/todo-operations.js";

// unit tests - add and remove functions
describe("add and remove to-do tasks", () => {
  test("localstorage set and get task items", () => {
    // Arrange
    const getSpy = jest.spyOn(Storage.prototype, "getItem");
    const setSpy = jest.spyOn(Storage.prototype, "setItem");

    // Act
    const get = jest.fn().mockReturnValueOnce(undefined);
    const set = jest.fn();
    saveToStorage([{ index: 0, desc: "task 1" }], { get, set });

    // Assert
    expect(getSpy).toHaveBeenCalled();
    expect(setSpy).toHaveBeenCalled();
    expect(mockStorage.tasks).toEqual([{ index: 0, desc: "task 1" }]);
  });
  test("add only one list item to the DOM", () => {
    // Arrange
    document.body.innerHTML = "<ul id='container'></ul>";
    const container = document.getElementById("container");
    const task = "New task";

    // Act
    addToList(container, task);
    const list = document.querySelectorAll("#container li");

    // Assert
    expect(list).toHaveLength(1);
  });
  test("remove one item from the localstorage", () => {
    // Arrange
    const set = jest.fn();

    // Act
    removeFromStorage(
      [
        { index: 0, desc: "task 1" },
        { index: 1, desc: "task 2" },
      ],
      1,
      { set }
    );

    // Assert
    expect(mockStorage.tasks).toEqual([{ index: 0, desc: "task 1" }]);
  });
  test("remove only one list item from the DOM", () => {
    // Arrange
    document.body.innerHTML =
      "<ul id='container'><li>Task 1</li><li>Task 2</li></ul>";

    // Act
    const list = [...document.querySelectorAll("#container li")];
    removeFromList(list, 1);

    // Assert
    expect(list).toHaveLength(1);
  });
});

// unit tests - update/edit task, update completed, clear all completed
describe("edit, update completed, clear all completed tasks", () => {
  test("edit task description in localstorage", () => {
    // Arrange
    const get = jest.fn();
    const set = jest.fn();
    const setSpy = jest.spyOn(Storage.prototype, "setItem");
    const getSpy = jest.spyOn(Storage.prototype, "getItem");

    // Act
    updateTask(
      [
        { index: 0, desc: "task 2" },
        { index: 1, desc: "task 2" },
      ],
      "task 1",
      0,
      { get, set }
    );

    // Assert
    expect(setSpy).toHaveBeenCalled();
    expect(getSpy).toHaveBeenCalled();
    expect(mockStorage.tasks[0]).toEqual({ index: 0, desc: "task 1" });
  });
  test("update completed status", () => {
    // Arrange
    const set = jest.fn();
    const setSpy = jest.spyOn(Storage.prototype, "setItem");

    // Act
    updateCompleted(
      [
        { index: 0, desc: "task 1", completed: false },
        { index: 1, desc: "task 2", completed: false },
      ],
      0,
      { set }
    );

    // Assert
    expect(setSpy).toHaveBeenCalled();
    expect(mockStorage.tasks[0]).toEqual({
      index: 0,
      desc: "task 1",
      completed: true,
    });
  });
  test("clear all completred tasks", () => {
    // Arrange
    const set = jest.fn();
    const setSpy = jest.spyOn(Storage.prototype, "setItem");
    // Act
    const filt = clearAllCompleted(
      [
        { index: 0, desc: "task 1", completed: true },
        { index: 1, desc: "task 2", completed: false },
        { index: 2, desc: "task 3", completed: true },
        { index: 3, desc: "task 4", completed: true },
      ],
      { set }
    );
    // Assert
    expect(setSpy).toHaveBeenCalled();
    expect(filt).toHaveLength(1);
    expect(filt).toEqual([{ index: 1, desc: "task 2", completed: false }]);
  });
});
