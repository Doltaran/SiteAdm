document.addEventListener("DOMContentLoaded", function () {
  var roomForm = document.getElementById("roomForm");

  if (roomForm) {
    roomForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Предотвращаем отправку формы

      // Получаем введенное имя пользователя
      var usernameInput = document.getElementById("username");
      var username = usernameInput.value;

      // Генерируем случайный идентификатор комнаты
      var roomId = generateRoomId();

      // Подключаемся к WebSocket серверу
      var socket = io.connect('http://localhost:5000');


      // Обработчик события открытия соединения
      socket.addEventListener("open", function (event) {
        console.log("WebSocket соединение установлено.");
      });

      // Обработчик события получения сообщения от сервера
      socket.addEventListener("message", function (event) {
        var data = JSON.parse(event.data);

        // Обновляем данные на странице в соответствии с полученными данными
        // Например, обновляем список задач или пользователей
        updateTasks(data.tasks);
        updateUsers(data.users);
      });

      // Обработчик события закрытия соединения
      socket.addEventListener("close", function (event) {
        console.log("WebSocket соединение закрыто.");
      });

      // Функция для отправки сообщений на сервер через WebSocket
      function sendMessage(message) {
        if (socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(message));
        }
      }

      // Генерируем случайный идентификатор комнаты
      function generateRoomId() {
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var roomId = "";
        for (var i = 0; i < 6; i++) {
          roomId += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return roomId;
      }

      // Функции для обновления данных на странице
      function updateTasks(tasks) {
        var taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        tasks.forEach(function (task) {
          var taskItem = document.createElement("li");
          taskItem.textContent = task;
          taskList.appendChild(taskItem);
        });
      }

      function updateUsers(users) {
        var userList = document.getElementById("userList");
        userList.innerHTML = "";

        users.forEach(function (user) {
          var userItem = document.createElement("li");
          userItem.textContent = user;
          userList.appendChild(userItem);
        });
      }
    });
  }
});
