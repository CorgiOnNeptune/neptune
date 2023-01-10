/* global loadTasks editTaskStatus */

const escape = (str) => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const loadTasksByCategory = function () {
  $('.menu-category').click(function () {
    $('#tasks-ul').empty();

    if ($(this).hasClass('all-tasks')) {
      loadTasks();
      $('#header-text').text('All');
    }

    if ($(this).hasClass('incomplete-tasks')) {
      $('#header-text').text('Incomplete');
      loadTasks('incomplete');
    }

    if ($(this).hasClass('completed-tasks')) {
      $('#header-text').text('Completed');
      loadTasks('completed');
    }

    if ($(this).hasClass('watch-tasks')) {
      $('#header-text').text('Watch');
      loadTasks('films');
    }

    if ($(this).hasClass('read-tasks')) {
      $('#header-text').text('Read');
      loadTasks('books');
    }

    if ($(this).hasClass('eat-tasks')) {
      $('#header-text').text('Eat');
      loadTasks('restaurants');
    }

    if ($(this).hasClass('shop-tasks')) {
      $('#header-text').text('Shop');
      loadTasks('products');
    }

    if ($(this).hasClass('others-tasks')) {
      $('#header-text').text('Others');
      loadTasks('others');
    }
  });
};

const completeStatusAnimation = function () {
  $('.complete-status').click(function () {
    $(this)
      .fadeOut(180, function () {
        let taskId;
        let status;
        if ($(this).attr('src') === 'images/not-completed.png') {
          $(this).attr('src', 'images/completed.png');
          $(this).removeClass('not-completed');
          $(this).addClass('completed');
          taskId = $(this).closest('li').attr('id').slice(8);
          status = true;
        } else {
          $(this).attr('src', 'images/not-completed.png');
          $(this).removeClass('completed');
          $(this).addClass('not-completed');
          taskId = $(this).closest('li').attr('id').slice(8);
          status = false;
        }

        const task = { id: taskId, status };
        editTaskStatus(task);
      })
      .fadeIn(180);
  });
};

const setDefaultValue = function () {
  $('.edit-button').click(function () {
    const li = $(this).closest('li');
    const taskTitle = li.find('.task-title').text();
    const dueDate = li.find('.due-date').text().slice(4);
    const icon = li.find('.category-icon');
    let category = 'others';
    if (icon.hasClass('fa-video')) {
      category = 'films';
    }
    if (icon.hasClass('fa-book-open')) {
      category = 'books';
    }
    if (icon.hasClass('fa-utensils')) {
      category = 'restaurants';
    }
    if (icon.hasClass('fa-cart-shopping')) {
      category = 'products';
    }

    $('#old-task-editor').find('#task_name').text(taskTitle);
    $('#old-task-editor')
      .find('option')
      .each(function () {
        if ($(this).attr('selected') === 'selected') {
          $(this).removeAttr('selected');
        }
        if ($(this).attr('value') === category) {
          $(this).attr('selected', 'selected');
        }
      });
    $('#old-task-editor').find('#due_date').attr('value', convertDate(dueDate));
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
  let type = $('#shovie-type').text().toLowerCase();
  if (type === 'series') {
    type = 'tv-show';
  }
  return `https://www.justwatch.com/ca/${type}/${urlTitle}`;
};

/**
 * Takes in a date string "YYYY-MM-DD" converts it to 'Month DD, YYYY'
 * @param {string} date
 */
const formatDate = (date) => {
  if (!date) return;

  const dateArr = date.split('-');
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let month = dateArr[1];

  months.forEach((val, index) => {
    if (index + 1 === Number(month)) {
      month = months[index];
    }
  });

  return `${month} ${dateArr[2]}, ${dateArr[0]}`;
};

const setDefaultDate = () => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }

  const today = year + '-' + month + '-' + day;
  $('#due_date').attr('value', today);
};

const convertDate = (date) => {
  let newDate = '';
  let month;
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  for (let i in months) {
    if (date.slice(0, 3) === months[i]) {
      month = Number(i) + 1;
    }
  }

  if (month < 10) {
    month = '0' + month;
  }

  newDate += `${date.slice(8)}-${month}-${date.slice(4, 6)}`;
  return newDate;
};
