var numbers = document.querySelectorAll(".number"),
  operations = document.querySelectorAll(".operation"),
  decimalBtn = document.getElementById("decimal"),
  clearBtns = document.querySelectorAll(".clear_btn"),
  resultBtn = document.getElementById("result"),
  howWorkBtn = document.getElementById("howWorkBtn"),
  display = document.getElementById("display"),
  MemoryCurrentNumber = 0,
  MemoryNewNumber = false,
  MemoryPendingOperation = "";

for (var i = 0; i < numbers.length; i++) {
  var number = numbers[i];
  number.addEventListener("click", function (e) {
    numberPress(e.target.textContent);
  });
}

for (var i = 0; i < operations.length; i++) {
  var operationBtn = operations[i];
  operationBtn.addEventListener("click", function (e) {
    operation(e.target.textContent);
  });
}

for (var i = 0; i < clearBtns.length; i++) {
  var clearBtn = clearBtns[i];
  clearBtn.addEventListener("click", function (e) {
    clear(e.srcElement.id);
  });
}

decimalBtn.addEventListener("click", decimal);

resultBtn.addEventListener("click", result);

howWorkBtn.addEventListener("click", howWork);

function numberPress(number) {
  if (MemoryNewNumber) {
    display.value = number;
    MemoryNewNumber = false;
  } else {
    if (display.value === "0") {
      display.value = number;
    } else {
      display.value += number;
    }
  }
}

function operation(op) {
  var localOperationMemory = parseFloat(display.value);

  if (MemoryNewNumber && MemoryPendingOperation !== "=") {
    // Если должен начаться ввод нового числа и имеется отложенная арифметическая операция,
    // то ничего вычислять не нужно, просто выходим из функции
    return;
  } else {
    // Предварительно уже было введено число
    MemoryNewNumber = true;
    if (MemoryPendingOperation === "+") {
      // Есть отложенная операция сложения - вычисляем новое значение MemoryCurrentNumber
      MemoryCurrentNumber += localOperationMemory;
    } else if (MemoryPendingOperation === "-") {
      // Есть отложенная операция вычитания - вычисляем новое значение MemoryCurrentNumber
      MemoryCurrentNumber -= localOperationMemory;
    } else if (MemoryPendingOperation === "*") {
      // Есть отложенная операция умножения - вычисляем новое значение MemoryCurrentNumber
      MemoryCurrentNumber *= localOperationMemory;
    } else if (MemoryPendingOperation === "/") {
      // Есть отложенная операция деления - вычисляем новое значение MemoryCurrentNumber
      MemoryCurrentNumber /= localOperationMemory;
    } else {
      // Нет отложенной арифметической операции, которую нужно вычислять
      MemoryCurrentNumber = localOperationMemory;
    }

    // Выводим на дисплей калькулятора текущее значение
    display.value = MemoryCurrentNumber;
    // Сохраняем новую отложенную операцию
    MemoryPendingOperation = op;
  }
  console.log("клик прошел по кнопке с операцией " + op + "");
}

function decimal() {
  console.log("клик по кнопке с десятичной дробью");
}

function clear(id) {
  console.log("клик по кнопке " + id + "");
}
/*
function result() {
    console.log('клик по кнопке результат')
}*/

function howWork() {
  console.log("клик по кнопке как работает");
}
