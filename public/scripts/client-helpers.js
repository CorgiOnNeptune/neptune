let openEditorButtons = document.querySelectorAll('[data-modal-target]');
let closeEditorButton = $('.close-btn');
let overlay = $('#overlay');

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const openEditor = function (editor) {
  if (!editor) return;
  editor.classList.add('active');
  overlay.addClass('active');
};

const closeEditor = function (editor) {
  if (!editor) return;
  editor.removeClass('active');
  overlay.removeClass('active');
};

const addEditorEvents = function () {
  openEditorButtons = document.querySelectorAll('[data-modal-target]');
  closeEditorButton = $('.close-btn');
  overlay = $('#overlay');

  openEditorButtons.forEach(button => {
    button.addEventListener('click', () => {
      const editor = document.querySelector(button.dataset.modalTarget);
      openEditor(editor);
    });
  });

  closeEditorButton.on('click', () => {
    const editor = $('.editor');
    closeEditor(editor);
  });
};

const submitNewTask = async (element) => {
  const $form = $(element);
  const formArray = $form.serializeArray();

  let task = {
    description: formArray[0].value,
    category: formArray[1].value,
    due_date: formArray[2].value,
    data: {}
  };

  if (!task.category || task.category === 'auto') {
    task = await determineCategory(task);
  } else {
    await callAPIByCategory(task);
  }

  $.post('/tasks', task)
    .then(() => {
      $("#tasks-ul").empty();
      loadTasks('incomplete');
      $form[0].reset();
      closeEditor($('.editor'));
    })
    .fail((err) => {
      console.log(err.message);
    });
};

const completeStatusAnimation = function () {
  $(".complete-status").click(function () {
    $(this).fadeOut(180, function () {
      let taskId;
      let status;
      if ($(this).attr("src") === "images/not-completed.png") {
        $(this).attr("src", "images/completed.png");
        $(this).removeClass("not-completed");
        $(this).addClass("completed");
        taskId = $(this).closest("li").attr("id").slice(8);
        status = true;
      } else {
        $(this).attr("src", "images/not-completed.png");
        $(this).removeClass("completed");
        $(this).addClass("not-completed");
        taskId = $(this).closest("li").attr("id").slice(8);
        status = false;
      }
      $.ajax({
        url: `/tasks/${taskId}/status`,
        method: "POST",
        data: { id: taskId, status: status }
      })
        .then(() => {
          console.log(`Complete status changed: ${taskId}: ${status}`);
        })
        .catch((error) => {
          console.log(error);
        });

    }).fadeIn(180);
  });
};

const createTaskElement = (task) => {
  let completeStatus;
  let iconSrc;
  if (task.complete === true) {
    completeStatus = "completed";
    iconSrc = "images/completed.png";
  } else {
    completeStatus = "not-completed";
    iconSrc = "images/not-completed.png";
  }
  const dueDate = formatDate(task.due_date.slice(0, 10));
  let iconType = `<i class="fa-solid fa-clipboard-question category-icon"></i>`;
  if (task.category === "films") {
    iconType = `<i class="fa-solid fa-video category-icon"></i>`;
  }
  if (task.category === "books") {
    iconType = `<i class="fa-solid fa-book-open category-icon"></i>`;
  }
  if (task.category === "restaurants") {
    iconType = `<i class="fa-solid fa-utensils category-icon"></i>`;
  }
  if (task.category === "products") {
    iconType = `<i class="fa-solid fa-cart-shopping category-icon"></i>`;
  }
  if (task.category === "others") {
    iconType = `<i class="fa-solid fa-clipboard-question category-icon"></i>`;
  }

  const $task = $(`
  <li id="task_id_${task.id}">
    <div class="task-content">
      <img src="${iconSrc}" alt="" class="complete-status ${completeStatus}">
      ${iconType}
      <span>${escape(task.task_name)}</span>
      <span class="edit-delete-section">
        <span class="due-date">Due ${dueDate}</span>
        <span class="edit-delete"><button data-modal-target="#old-task-editor"><i class="fa-solid fa-pen-to-square"></i></button></span>
        <span class="edit-delete"><button><i class="fa-sharp fa-solid fa-trash"></i></button></span>
      </span>
    </div>
  </li>
  `);
  return $task;
};

const renderTasks = function (tasks) {
  for (let task of tasks) {
    const $task = createTaskElement(task);
    $('#tasks-ul').prepend($task);
  }
};

const loadTasks = function (category) {
  let url = "/tasks";
  if (category) {
    url += `/${category}`;
  }
  $.ajax({
    url: url,
    method: "GET"
  })
    .then((tasks) => {
      renderTasks(tasks.tasks);
      // re-register the click events
      completeStatusAnimation();
      addEditorEvents();

    })
    .catch((error) => {
      console.log(error);
    });
};

const loadTasksByCategory = function () {
  $(".menu-category").click(function () {
    $("#tasks-ul").empty();

    if ($(this).hasClass("all-tasks")) {
      loadTasks();
      $("#header-text").text("All");

    }

    if ($(this).hasClass("incomplete-tasks")) {
      loadTasks("incomplete");
      $("#header-text").text("Incomplete");
    }

    if ($(this).hasClass("completed-tasks")) {
      loadTasks("completed");
      $("#header-text").text("Completed");
    }

    if ($(this).hasClass("watch-tasks")) {
      loadTasks("films");
      $("#header-text").text("Watch");
    }

    if ($(this).hasClass("read-tasks")) {
      loadTasks("books");
      $("#header-text").text("Read");
    }

    if ($(this).hasClass("eat-tasks")) {
      loadTasks("restaurants");
      $("#header-text").text("Eat");
    }

    if ($(this).hasClass("shop-tasks")) {
      loadTasks("products");
      $("#header-text").text("Shop");
    }

    if ($(this).hasClass("others-tasks")) {
      loadTasks("others");
      $("#header-text").text("Others");
    }
  });
};

const deleteTask = (taskID) => {
  $.ajax({
    url: `/tasks/${taskID}`,
    method: 'POST',
    data: { id: taskID, status: status }
  })
    .then(() => {
      console.log('Task deleted successfully');
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Takes in a date string "YYYY-MM-DD" converts it to 'Month DD, YYYY'
 * @param {string} date
 */
const formatDate = (date) => {
  if (!date) return;

  const dateArr = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let month = dateArr[1];

  months.forEach((val, index) => {
    if (index + 1 === Number(month)) {
      month = months[index];
    }
  });

  return `${month} ${dateArr[2]}, ${dateArr[0]}`;
};

const setDefaultDate = function () {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  const today = year + "-" + month + "-" + day;
  $("#due_date").attr("value", today);
};
