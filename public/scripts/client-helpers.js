const submitNewTask = (element) => {
  const $form = $(element);
  const formArray = $form.serializeArray();

  const task = {
    description: formArray[0].value,
    category: formArray[1].value,
    due_date: formArray[2].value
  };

  task.category = determineCategory(task);

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



const waitForCategory = new Promise((resolve, reject) => {

})


















const completeStatusAnimation = function () {
  $(".complete-status").click(function () {
    $(this).fadeOut(250, function () {
      if ($(this).attr("src") === "images/not-completed.png") {
        $(this).attr("src", "images/completed.png");
        $(this).removeClass("not-completed");
        $(this).addClass("completed");
      } else {
        $(this).attr("src", "images/not-completed.png");
        $(this).removeClass("completed");
        $(this).addClass("not-completed");
      }
    }).fadeIn(250);
  });
};

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
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
  let iconType = `<i class="fa-solid fa-clipboard category-icon"></i>`;
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
      // re-register the click event for newly emerged tasks
      completeStatusAnimation();

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
    }

    if ($(this).hasClass("incomplete-tasks")) {
      loadTasks("incomplete");
    }

    if ($(this).hasClass("completed-tasks")) {
      loadTasks("completed");
    }

    if ($(this).hasClass("watch-tasks")) {
      loadTasks("films");
    }

    if ($(this).hasClass("read-tasks")) {
      loadTasks("books");
    }

    if ($(this).hasClass("eat-tasks")) {
      loadTasks("restaurants");
    }

    if ($(this).hasClass("shop-tasks")) {
      loadTasks("products");
    }

    if ($(this).hasClass("others-tasks")) {
      loadTasks("others");
    }
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
  })

  return `${month} ${dateArr[2]}, ${dateArr[0]}`;
}
