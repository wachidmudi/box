function appInit() {
  // Set min due date in all date input
  $('input[name="due_date"]').each(function () {
    $(this).attr('min', setMinDate());
  });

  checkAuth();

  // Toastr config
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    onclick: undefined,
    showDuration: 300,
    hideDuration: 1_000,
    timeOut: 3_000,
    extendedTimeOut: 1_000,
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
  };

  // Remove d-none class from element
  $('#logout').removeClass('d-none');
  $('#list-todos').removeClass('d-none');
  $('#modalAddTodo').removeClass('d-none');
  $('#modalUpdateTodo').removeClass('d-none');
  $('#modalAddImage').removeClass('d-none');
}

$(appInit);

/**
 * App Functions
 */
// We use global Swal instead of local import
declare var Swal: typeof import('sweetalert2').default;

const baseUrl = process.env.VITE_API_URL || 'http://localhost:3000';
const usersUrl = baseUrl + '/users';
const todosUrl = baseUrl + '/todos';

const colors = [
  '#ffd1e3',
  '#b8e1ff',
  '#fcffdd',
  '#a9fff7',
  '#69ddff',
  '#ffffff',
] as const;
type Colors = (typeof colors)[number];
type Status = 'next' | 'progress' | 'done';

interface Todo {
  id: string;
  title: string;
  description: string;
  status: Status;
  due_date: string;
  color: Colors;
  image_url: string;
}

type Images = {
  src: {
    tiny: string;
    portrait: string;
  };
}[];

/**
 * @see https://stackoverflow.com/a/76605803
 */
interface HTMLFormControlsCollection extends HTMLCollectionBase {
  [item: string]: HTMLInputElement | RadioNodeList | HTMLButtonElement;
}

/**
 * Handle pending button element changes
 */
function createBtn(el: HTMLButtonElement, title: string) {
  let text = el.innerText;
  return {
    setLoading(value: boolean) {
      if (value) {
        el.innerHTML = title;
        el.disabled = true;
        el.classList.add('btn-disabled');
      } else {
        el.innerHTML = text;
        el.disabled = false;
        el.classList.remove('btn-disabled');
      }
    },
  };
}

function login(e: SubmitEvent) {
  e.preventDefault();
  const { email, password, submit } = (e.target as HTMLFormElement).elements;

  const submitBtn = createBtn(submit as HTMLButtonElement, 'Logging in...');

  submitBtn.setLoading(true);

  $.ajax({
    url: usersUrl + '/login',
    method: 'POST',
    data: { email: email.value, password: password.value },
  })
    .done(data => {
      setToken(data.token);
      checkAuth();
    })
    .fail(err => {
      console.log('err', err.responseJSON?.errors);
      toastr.error('Login Failed!', err.responseJSON?.errors.join(','));
    })
    .always(() => {
      submitBtn.setLoading(false);
      clearForm();
    });
}

function register(e: SubmitEvent) {
  e.preventDefault();
  const { name, email, password, submit } = (e.target as HTMLFormElement)
    .elements;

  const submitBtn = createBtn(submit as HTMLButtonElement, 'Logging in...');

  submitBtn.setLoading(true);

  $.ajax({
    url: usersUrl + '/register',
    method: 'POST',
    data: {
      name: name.value,
      email: email.value,
      password: password.value,
    },
  })
    .done(data => {
      console.log('data', data);
      Swal.fire(
        'Register Success',
        'Please login using registered account',
        'success'
      );
    })
    .fail(err => {
      console.log('err', err.responseJSON?.errors);
      toastr.error('Register Failed!', err.responseJSON?.errors.join(','));
    })
    .always(() => {
      submitBtn.setLoading(false);
      clearForm();
    });
}

function logout() {
  Swal.fire({
    title: 'Are you sure?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, logout!',
  }).then(result => {
    if (result.isConfirmed) {
      removeToken();
      onSignOut();
      checkAuth();
    }
  });
}

function showTodos() {
  $.ajax({
    url: todosUrl,
    method: 'GET',
    headers: {
      token: getToken(),
    },
  })
    .done(res => {
      const next = $('#next-todo');
      const progress = $('#progress-todo');
      const done = $('#done-todo');

      next.empty();
      progress.empty();
      done.empty();

      (res.data as Todo[]).forEach(todo => {
        let updateButton = $('<button />', {
          type: 'button',
          text: 'Update',
          class: 'btn text-primary',
          'data-toggle': 'modal',
          'data-target': '#modalUpdateTodo',
          click: () => updateTodoForm(todo),
        });

        let todoElem = $(`
        <div class="card mb-4" style="background-color: ${todo.color};">
          <div class="row no-gutters">
            <div class="col-md-3" style="max-height: 160px; overflow: hidden; display: ${todo.image_url ? 'flex' : 'none'};">
              <img id="todo-${todo.id}" src="${todo.image_url}" class="card-img" style="position: absolute; top: -50%;" alt="thumbnail">
            </div>
            <div class="${todo.image_url ? 'col-md-9' : 'col-md-12'}">
              <div class="card-body">
                <h5 class="card-title">${todo.title}</h5>
                <p class="card-text">${todo.description}</p>
                <div class="action text-right">
                  <button onclick="deleteTodo(${todo.id})" class="btn text-danger">Delete</button>
                </div>
              </div>
              <span class="btn btn-image" onclick="showModalAddImage(${todo.id})">
                <svg width="13" viewBox="0 0 32 32" fill="#666666"><g><path d="M 17.228,11.688A2.782,2.782 1080 1 0 22.792,11.688A2.782,2.782 1080 1 0 17.228,11.688zM 26,28L 28,28L 28,26L 28,22L 28,16L 20,22L 10,14L 4,20L 4,22L 4,26L 4,28L 6,28 zM 30,4L 2,4 C 0.896,4,0,4.896,0,6l0,24 c0,1.104, 0.896,2, 2,2l 28,0 c 1.104,0, 2-0.896, 2-2L 32,6 C 32,4.896, 31.104,4, 30,4z M 30,30L 2,30 L 2,6 l 28,0 L 30,30 z"></path></g></svg>
              </span>
              <span id="btn-color-${todo.id}" class="btn btn-color" onclick="setTodoId(${todo.id})">
                <img src="https://1001freedownloads.s3.amazonaws.com/icon/thumb/350648/Editing-Paint-Palette-icon.png" style="width: 12px" alt="color">
              </span>
            </div>
          </div>
        </div>
      `);

        // Prepend updateButton with data todo (insert elem from first).
        todoElem.find('.action').prepend(updateButton);

        if (todo.status === 'next') {
          next.append(todoElem);
        }
        if (todo.status === 'progress') {
          progress.append(todoElem);
        }
        if (todo.status === 'done') {
          done.append(todoElem);
        }

        initPicker(`btn-color-${todo.id}`, todo.color || '#ffffff');
        initDragAndDrop();
      });
    })
    .fail(err => {
      console.log(err.responseJSON.errors);
      toastr.error(err.responseJSON.errors, 'Unable to show todo list');
    });
}

function showModalAddImage(id: string) {
  $('#modalAddImage').modal('show');
  setTodoId(id);
}

function setTodoId(id: string) {
  $('#todo-id').val(id);
}

function initPicker(elementId: string, color: string) {
  ($(`#${elementId}`) as any).colorPick({
    paletteLabel: 'Pick color',
    initialColor: color,
    allowRecent: false,
    palette: colors,
    onColorSelected: function () {
      // console.log("The user has selected the color: " + this.color)
      this.element.closest('.card').css({ backgroundColor: this.color });
      updateColor(this.color);
    },
  });
}

function initDragAndDrop() {
  $('.card').draggable({
    stack: '#list-todos',
    scroll: false,
    revert: 'invalid',
    cursor: 'pointer',
  });

  $('#next-todo').droppable({
    accept: '.card',
    drop: function (_e, ui) {
      handleDrop(this, ui, 'next');
    },
  });
  $('#progress-todo').droppable({
    accept: '.card',
    drop: function (_e, ui) {
      handleDrop(this, ui, 'progress');
    },
  });
  $('#done-todo').droppable({
    accept: '.card',
    drop: function (_e, ui) {
      handleDrop(this, ui, 'done');
    },
  });

  function handleDrop(
    dropElem: JQueryUI.DroppableOptions,
    ui: JQueryUI.DroppableEventUIParam,
    status: Status
  ) {
    let $item = ui.draggable;
    let id = $item.find('img').attr('id')?.split('-')[1] ?? '';
    let color = $item.css('backgroundColor');
    // console.log('id', id)

    updateStatus(id, status);

    // Remove style from jquery ui draggable then add current todo color
    $item.removeAttr('style').css('backgroundColor', color);
    $(dropElem).append($item);
  }
}

function addTodo(e: SubmitEvent) {
  e.preventDefault();
  let title = $('#addTitle').val();
  let description = $('#addDescription').val();
  let status = $('#addStatus').val();
  let due_date = $('#addDueDate').val();

  $.ajax({
    url: todosUrl,
    method: 'POST',
    headers: {
      token: getToken(),
    },
    data: {
      title,
      description,
      status,
      due_date,
    },
  })
    .done(data => {
      console.log('data', data);
      toastr.success('Todo has been added!');
      showTodos();
      clearTodoForm();
    })
    .fail(err => {
      console.log('err', err.responseJSON.errors);
      toastr.error(err.responseJSON.errors, 'Unable to add todo');
      clearTodoForm();
    })
    .always(() => {
      $('#modalAddTodo').modal('hide');
    });
}

function updateTodo(e: SubmitEvent) {
  e.preventDefault();
  let id = $('#todoId').val();
  let title = $('#updateTitle').val();
  let description = $('#updateDescription').val();
  let status = $('#updateStatus').val();
  let due_date = $('#updateDueDate').val();

  $.ajax({
    url: `${todosUrl}/${id}`,
    method: 'PUT',
    headers: {
      token: getToken(),
    },
    data: {
      title,
      description,
      status,
      due_date,
    },
  })
    .done(data => {
      console.log('data', data);
      toastr.success('Todo successfully updated');
      showTodos();
      clearTodoForm();
    })
    .fail(err => {
      console.log('err', err.responseJSON.errors);
      toastr.error(err.responseJSON.errors, 'Unable to update todo');
      clearTodoForm();
    })
    .always(() => {
      $('#modalUpdateTodo').modal('hide');
    });
}

function updateTodoForm(data: Todo) {
  const { id, title, description, status, due_date } = data;
  $('#todoId').val(id);
  $('#updateTitle').val(title);
  $('#updateDescription').val(description);
  $('#updateStatus').val(status);
  $('#updateDueDate').val(formatDate(new Date(due_date)));
}

function deleteTodo(id: string) {
  Swal.fire({
    title: 'Are you sure want to delete this todo?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then(result => {
    if (result.isConfirmed) {
      $.ajax({
        url: `${todosUrl}/${id}`,
        method: 'DELETE',
        headers: {
          token: getToken(),
        },
      })
        .done(() => {
          // console.log('data', data)
          Swal.fire(
            'Deleted!',
            'Todo has been successfully deleted',
            'success'
          );
          showTodos();
        })
        .fail(err => {
          // console.log('err', err.responseJSON.errors)
          Swal.fire('Error', err.responseJSON.errors, 'error');
        });
    }
  });
}

function addImage(e: SubmitEvent) {
  e.preventDefault();

  const search = $('#search-input').val();

  const spinner = `
    <div class="spinner-grow text-primary mx-auto my-5" style="width: 4rem; height: 4rem;" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  `;
  const container = $('#images').find('.row');
  container.empty();

  container.append(spinner);

  $.ajax({
    url: `${todosUrl}/images`,
    method: 'GET',
    headers: {
      token: getToken(),
    },
    data: { search },
  })
    .done(res => {
      container.empty();

      (res.images as Images).forEach(image => {
        container.append(`
          <div class="col-3 mb-4">
            <div class="card bg-dark text-white">
              <img src="${image.src.tiny}" class="card-img" alt="thumbnail">
              <div class="card-img-overlay p-1">
                <input
                  class="radio"
                  type="radio"
                  name="image"
                  value="${image.src.portrait.replace('1200', '600').replace('800', '200')}"
                >
              </div>
            </div>
          </div>
        `);
      });

      container.append(`
        <button
          class="btn btn-primary mx-auto"
          type="button"
          onclick="updateImage()"
        >
          Submit Image
        </button>
      `);
    })
    .fail(err => {
      console.log('err', err.responseJSON.errors);
      toastr.error(err.responseJSON.errors, 'Unable to add image');
    });
}

function updateImage() {
  const imageUrl = $('input[name="image"]:checked').val();

  if (typeof imageUrl !== 'string') {
    return;
  }

  const id = $('#todo-id').val();

  $('#modalAddImage').modal('hide');
  // Change todo image in card element
  $(`#todo-${id}`).attr('src', imageUrl);

  $.ajax({
    url: todosUrl + '/update-image/' + id,
    method: 'PUT',
    data: { imageUrl },
    headers: {
      token: getToken(),
    },
  })
    .done(data => {
      console.log('data', data);
      showTodos();
      toastr['success']('', 'Image updated!');
      $('#modalAddImage').modal('hide');
    })
    .fail(err => {
      console.log('err', err);
      toastr.error(err.responseJSON.errors, 'Unable to update image');
    });
}

function updateColor(color: Colors) {
  const id = $('#todo-id').val();

  $.ajax({
    url: todosUrl + '/update-color/' + id,
    method: 'PUT',
    data: { color },
    headers: {
      token: getToken(),
    },
  })
    .done(data => {
      console.log('data', data);
      toastr.success('Color successfully updated!');
    })
    .fail(err => {
      console.log('err', err);
      toastr.error(err.responseJSON.errors, 'Unable to update color');
    });
}

function updateStatus(id: string, status: string) {
  $.ajax({
    url: todosUrl + '/update-status/' + id,
    method: 'PUT',
    data: { status },
    headers: {
      token: getToken(),
    },
  })
    .done(data => {
      console.log('data', data);
      toastr.success('Status successfully updated');
    })
    .fail(err => {
      console.log('err', err);
      toastr.error('Unable to update status');
    });
}

type GoogleUser = ReturnType<gapi.auth2.GoogleAuth['currentUser']['get']>;

/**
 * Utils
 */
function onSignIn(googleUser: GoogleUser) {
  const googleToken = googleUser.getAuthResponse().id_token;

  $.ajax({
    url: usersUrl + '/google-sign-in',
    method: 'POST',
    data: { googleToken },
  })
    .done(data => {
      setToken(data.token);
      checkAuth();
      toastr.success('You have successfully logged in');
    })
    .fail(err => {
      console.log('err', err);
      toastr.error('Failed to sign in with google');
    });
}

function onSignOut() {
  const auth2 = gapi.auth2.getAuthInstance();

  auth2.signOut().then(() => {
    toastr.success('You have successfully logged out.');
  });
}

function checkAuth() {
  if (getToken()) {
    $('#main-page').hide();

    $('#logout').show();
    $('#list-todos').show();
    showTodos();
  } else {
    $('#main-page').show();

    $('#logout').hide();
    $('#list-todos').hide();
  }
}

function clearForm() {
  $('#loginEmail').val('');
  $('#loginPassword').val('');
  $('#registerName').val('');
  $('#registerEmail').val('');
  $('#registerPassword').val('');
}

function clearTodoForm() {
  $('#addTitle').val('');
  $('#addDescription').val('');
  $('#addStatus').val('');
  $('#addDueDate').val('');

  $('#updateTitle').val('');
  $('#updateDescription').val('');
  $('#updateStatus').val('');
  $('#updateDueDate').val('');
}

function setToken(token: string) {
  localStorage.setItem('token', token);
}

function getToken() {
  return localStorage.getItem('token');
}

function removeToken() {
  localStorage.removeItem('token');
}

function formatDate(date: Date) {
  let month = '' + (date.getMonth() + 1),
    day = '' + date.getDate(),
    year = date.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
}

function setMinDate() {
  let ms = new Date().getTime() + 86400000;
  let tomorrow = new Date(ms);
  return formatDate(tomorrow);
}

function goToRegister() {
  $('nav > a[href="#pills-register"]').trigger('click');
}

/**
 * The following functions somehow not compiled into dist output
 * Need to manually make it global
 */
window.createBtn = createBtn;
window.login = login;
window.register = register;
window.logout = logout;
window.showModalAddImage = showModalAddImage;
window.setTodoId = setTodoId;
window.addTodo = addTodo;
window.updateTodo = updateTodo;
window.deleteTodo = deleteTodo;
window.addImage = addImage;
window.updateImage = updateImage;
window.clearForm = clearForm;
window.clearTodoForm = clearTodoForm;
window.onSignIn = onSignIn;
window.onSignOut = onSignOut;
window.removeToken = removeToken;
window.goToRegister = goToRegister;

/*
function hex2rgb(c) {
  if (c[0] === '#') {
    c = c.substr(1);
  }
  let r = parseInt(c.slice(0, 2), 16),
    g = parseInt(c.slice(2, 4), 16),
    b = parseInt(c.slice(4, 6), 16);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}
*/
