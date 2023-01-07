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

  let $task;
  const header = $("#header-text").text();
  let id;
  if (header === "Watch" || header === "Read" || header === "Eat" || header === "Shop") {
    id = task.task_id;
  } else {
    id = task.id;

  }
  if (task.category === "others") {
    $task = $(`
    <li id="task_id_${id}">
    <div class="task-content">
      <img src="${iconSrc}" alt="" class="complete-status ${completeStatus}">
      ${iconType}
      <span class="task-title">${escape(task.task_name)}</span>
      <span class="edit-delete-section">
        <span class="due-date">Due ${dueDate}</span>
        <span class="edit-delete"><button data-modal-target="#old-task-editor" class="edit-button"><i class="fa-solid fa-pen-to-square"></i></button></span>
        <span class="edit-delete"><button class="delete-btn" onclick="deleteTask(${task.id})"><i class="fa-sharp fa-solid fa-trash"></i></button></span>
      </span>
    </div>
    </li>
    `);
    return $task;
  }

  $task = $(`
  <li id="task_id_${id}">
    <div class="task-content">
      <img src="${iconSrc}" alt="" class="complete-status ${completeStatus}">
      ${iconType}
      <span class="task-title">${escape(task.task_name)}</span>
      <span class="edit-delete-section">
        <span class="due-date">Due ${dueDate}</span>
        <span class="edit-delete"><button data-modal-target="#old-task-editor" class="edit-button"><i class="fa-solid fa-pen-to-square"></i></button></span>
        <span class="edit-delete"><button><i class="fa-sharp fa-solid fa-trash"></i></button></span>
      </span>
    </div>
    <button
    class="collapse-btn"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#collapseExample"
    aria-expanded="false"
    aria-controls="collapseExample">
    <i class="fa-solid fa-angles-down"></i>
  </button>
  <div class="details" id="collapseExample">
    <div class="poster-container"><img src="https://www.themoviedb.org/t/p/original/1AnfXMG9PPMVjwXcHW6JLSJUbPo.jpg" alt="poster" id="poster"></div>
    <div class="info">
      <div class="info-header">
        <div class="title">Arrival</div>
        <div class="genres">
        </div>
      </div>
      <div class="description">A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.</div>
      <div class="director">
        <div class="director-title">Director</div>
        <div class="director-name">Denis Villeneuve</div>
      </div>
      <div class="cast">
        <div class="cast-title">Cast</div>
        <div class="cast-names">Amy Adams Jeremy Renner Forest Whitaker</div>
      </div>

    </div>

    <div class="more">
      <div class="ratings">
        <div class="IMDB-rating">
          <img src="images/IMDB-logo.png" alt="">
          <span id="imdb">7.9</span>
        </div>
        <div class="RT-rating">
          <img src="images/RT-logo.png" alt="">
          <span id="RT">92%</span>
        </div>
        <div class="MC-rating">
          <img src="images/metacritic-logo.png" alt="">
          <span id="meta">80</span>
        </div>
        <div class="Meta-rating"></div>
      </div>

      <div class="streaming-guide">
        <div class="streaming">Streaming Guide</div>
      <a href="https://www.justwatch.com/us/movie/arrival-2016" id="just-watch-link">
        <img src="images/just-watch-logo.png" alt="justwatch">
      </a>
      </div>
    </div>
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
      setDefaultDate();
      setDefaultValue();
      renderDetails(category);

    })
    .catch((error) => {
      console.log(error);
    });
};

const renderDetails = function (category) {

  if (!category || category === "films" || category === "completed" || category === "incomplete") {
    let url = `/tasks/films`;
    $.ajax({
      url: url,
      method: "GET"
    })
      .then((data) => {
        const tasks = data.tasks;
        tasks.forEach(function (task) {
          const id = `task_id_${task.task_id}`;
          const taskElement = $('#' + id);
          if (taskElement[0]) {
            taskElement.find(".title").text(task.title);
            taskElement.find("#poster").attr("src", `${task.poster}`);
            taskElement.find(".description").text(task.plot);
            if (task.director !== "N/A") {
              taskElement.find(".director-name").text(task.director);
            } else {
              taskElement.find(".director-title").text("Writers");
              taskElement.find(".director-name").text(task.writer);
            }
            taskElement.find(".description").text(task.plot);
            taskElement.find(".cast-names").text(task.actors);
            console.log(typeof (task.genre));
            const genres = task.genre.split(", ");
            genres.forEach((genre) => {
              taskElement.find(".genres").append(`
              <span class="genre">${genre}</span>
              `);
            });
            const ratings = task.ratings;
            const imdbRating = ratings[0].slice(0, 3);
            taskElement.find("#imdb").text(imdbRating);
            if (ratings.length === 3) {
              const mcRating = ratings[2].slice(0, 2);
              taskElement.find("#rt").text(ratings[1]);
              taskElement.find("#meta").text(mcRating);
            }
            taskElement.find("#just-watch-link").attr("href", `${getJustWatchURL(task)}`);
          }
        });


      })
      .catch((error) => {
        console.log(error);
      });
  }
};

const loadTasksByCategory = function () {
  $(".menu-category").click(function () {
    $("#tasks-ul").empty();

    if ($(this).hasClass("all-tasks")) {
      loadTasks();
      $("#header-text").text("All");

    }

    if ($(this).hasClass("incomplete-tasks")) {
      $("#header-text").text("Incomplete");
      loadTasks("incomplete");
    }

    if ($(this).hasClass("completed-tasks")) {
      $("#header-text").text("Completed");
      loadTasks("completed");
    }

    if ($(this).hasClass("watch-tasks")) {
      $("#header-text").text("Watch");
      loadTasks("films");
    }

    if ($(this).hasClass("read-tasks")) {
      $("#header-text").text("Read");
      loadTasks("books");
    }

    if ($(this).hasClass("eat-tasks")) {
      $("#header-text").text("Eat");
      loadTasks("restaurants");
    }

    if ($(this).hasClass("shop-tasks")) {
      $("#header-text").text("Shop");
      loadTasks("products");
    }

    if ($(this).hasClass("others-tasks")) {
      $("#header-text").text("Others");
      loadTasks("others");
    }
  });
};

const deleteTask = (taskID) => {
  $.ajax({
    url: `/tasks/${taskID}/delete`,
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

const convertDate = function (date) {
  let newDate = "";
  let month;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  for (let i in months) {
    if (date.slice(0, 3) === months[i]) {
      month = Number(i) + 1;
    }
  }
  if (month < 10) {
    month = "0" + month;
  }
  newDate += `${date.slice(8)}-${month}-${date.slice(4, 6)}`;
  return newDate;
};


const setDefaultValue = function () {
  $(".edit-button").click(function () {
    const li = $(this).closest("li");
    const taskTitle = li.find(".task-title").text();
    const dueDate = li.find(".due-date").text().slice(4);
    const icon = li.find(".category-icon");
    let category = "others";
    if (icon.hasClass("fa-video")) {
      category = "films";
    }
    if (icon.hasClass("fa-book-open")) {
      category = "books";
    }
    if (icon.hasClass("fa-utensils")) {
      category = "restaurants";
    }
    if (icon.hasClass("fa-cart-shopping")) {
      category = "products";
    }

    $("#old-task-editor").find("#task_name").text(taskTitle);
    $("#old-task-editor").find("option").each(function () {
      if ($(this).attr("selected") === "selected") {
        $(this).removeAttr("selected");
      }
      if ($(this).attr("value") === category) {
        $(this).attr("selected", "selected");
      }
    });
    $("#old-task-editor").find("#due_date").attr("value", convertDate(dueDate));

  });
};

/**
 * Takes in film object to return JustWatch URL
 * @param {{}} film
 */
const getJustWatchURL = (film) => {
  const regex = /[^A-Za-z0-9 \w]/g;
  const filmTitle = film.title.replace(regex, '');
  const titleArr = filmTitle.split(' ');
  const urlTitle = titleArr.join('-');

  return `https://www.justwatch.com/ca/movie/${urlTitle}`;
};
