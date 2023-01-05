/**
 * Takes in task object to parse data for task element.
 * @param {{}} task
 */
$(() => {
  function createTaskElement(task) {
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
    <div class="task-details" id="collapseExample">
    </div>
  </li>
  `;
  }
});
