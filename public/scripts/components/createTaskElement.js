/**
 * Takes in task object to parse data for task element.
 * @param {{}} task
 * TODO: Initialize in client.js
 */
$(() => {
  const createTaskElement = function(task) => {
    return `
  <li>
    <input type="checkbox" />${task.description}
    <button
      class="collapse-btn"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseExample"
      aria-expanded="false"
      aria-controls="collapseExample">
      <i class="fa-solid fa-angles-down"></i>
    </button>
  </li>
  `;
  };

  module.exports = {
    createTaskElement,
  };
});
