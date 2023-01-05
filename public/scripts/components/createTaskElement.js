/**
 * Takes in task object to parse data for task element.
 * @param {{}} task
 */
$(() => {
  function createTaskElement(task) {
    return `
  <li>
    <div class="task-content">
      <input type="checkbox"/>
      <span>${task.description}</span>
      <span class="edit-delete-section">
        <span class="edit-delete"><button><i class="fa-solid fa-pen-to-square"></i></button></span>
        <span class="edit-delete"><button><i class="fa-sharp fa-solid fa-trash"></i></button></span>
      </span></div>
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
