// unit tests - add and remove functions

import {
  mockStorage, saveToStorage, addToList, removeFromStorage, removeFromList,
} from './js/todo-operations.js';

describe('add and remove to-do tasks', () => {
  test('localstorage set and get task items', () => {
    // Arrange
    const getSpy = jest.spyOn(Storage.prototype, 'getItem');
    const setSpy = jest.spyOn(Storage.prototype, 'setItem');

    // Act
    const get = jest.fn().mockReturnValueOnce(undefined);
    const set = jest.fn();
    saveToStorage([{ index: 0, desc: 'task 1' }], { get, set });

    // Assert
    expect(getSpy).toHaveBeenCalled();
    expect(setSpy).toHaveBeenCalled();
    expect(mockStorage.tasks).toEqual([{ index: 0, desc: 'task 1' }]);
  });
  test('add only one list item to the DOM', () => {
    // Arrange
    document.body.innerHTML = "<ul id='container'></ul>";
    const container = document.getElementById('container');
    const task = 'New task';

    // Act
    addToList(container, task);
    const list = document.querySelectorAll('#container li');

    // Assert
    expect(list).toHaveLength(1);
  });
  test('remove one item from the localstorage', () => {
    // Arrange
    const set = jest.fn();

    // Act
    removeFromStorage([{ index: 0, desc: 'task 1' }, { index: 1, desc: 'task 2' }], 1, { set });

    // Assert
    expect(mockStorage.tasks).toEqual([{ index: 0, desc: 'task 1' }]);
  });
  test('remove only one list item from the DOM', () => {
    // Arrange
    document.body.innerHTML = "<ul id='container'><li>Task 1</li><li>Task 2</li></ul>";

    // Act
    const list = [...document.querySelectorAll('#container li')];
    removeFromList(list, 1);

    // Assert
    expect(list).toHaveLength(1);
  });
});