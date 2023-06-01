  document.addEventListener("DOMContentLoaded", function () {
    var taskList = document.getElementById("taskList");
    var addTaskForm = document.getElementById("addTaskForm");
    var taskInput = document.getElementById("taskInput");
    var userList = document.getElementById("userList");
    var userCount = 0;


    if (addTaskForm) {
      addTaskForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Предотвращаем отправку формы и перезагрузку страницы

        var taskText = taskInput.value.trim();
        if (taskText !== "") {
          var taskItem = document.createElement("li");
          taskItem.textContent = taskText;
          taskList.appendChild(taskItem);
          taskInput.value = ""; // Очищаем поле ввода
        }
      });
    }

    var cardContainer = document.getElementById("cardContainer");
    var calculateButton = document.getElementById("calculateButton");
    var averageResult = document.getElementById("averageResult");
    var selectedCards = [];

    if (cardContainer) {
      var cards = cardContainer.getElementsByClassName("card");
      for (var i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function (event) {
          var card = event.target;
          var value = card.dataset.value;

          if (card.classList.contains("selected")) {
            card.classList.remove("selected");
            selectedCards = selectedCards.filter(function (cardValue) {
              return cardValue !== value;
            });
          } else {
            card.classList.add("selected");
            selectedCards.push(value);
          }
        });
      }
    }

    if (calculateButton) {
      calculateButton.addEventListener("click", function () {
        if (selectedCards.length > 0) {
          var sum = selectedCards.reduce(function (total, value) {
            return total + parseInt(value);
          }, 0);
          var average = sum / selectedCards.length;
          averageResult.textContent = "Average rating: " + average.toFixed(2);
        } else {
          averageResult.textContent = "No ratings selected";
        }
      });
    }

    function addUser() {
      var userItem = document.createElement("li");
      userItem.textContent = "User " + (++userCount);
      userList.appendChild(userItem);
    }

    function removeUser() {
      if (userCount > 0) {
        userList.lastElementChild.remove();
        userCount--;
      }
    }

    addUser(); // Добавляем первого пользователя

    var roomInfo = document.getElementById("roomInfo");
    if (roomInfo) {
      roomInfo.textContent = "Users in the room: " + userCount;
    }

    var addUserButton = document.getElementById("addUserButton");
    if (addUserButton) {
      addUserButton.addEventListener("click", function () {
        addUser();
        roomInfo.textContent = "Users in the room: " + userCount;
      });
    }

    var removeUserButton = document.getElementById("removeUserButton");
    if (removeUserButton) {
      removeUserButton.addEventListener("click", function () {
        removeUser();
        roomInfo.textContent = "Users in the room: " + userCount;
      });
    }
    // Определение и инициализация WebSocket соединения
  var socket = io();

  // Обработчики событий открытия и закрытия соединения
  socket.addEventListener("connect", function (event) {
    console.log("WebSocket соединение установлено.");

    // Изменяем класс элемента индикатора для отображения соединения
    connectionIndicator.classList.add("connected");
  });

  socket.addEventListener("disconnect", function (event) {
    console.log("WebSocket соединение закрыто.");

    // Удаляем класс элемента индикатора для отображения отсутствия соединения
    connectionIndicator.classList.remove("connected");
  });
  });

