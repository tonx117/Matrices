let matrix1, matrix2; // Definir las variables fuera de la función

document
  .getElementById("matrixForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);
    createMatrices(rows, cols);
  });

function createMatrices(rows, cols) {
  const matrixDiv = document.getElementById("matrices");
  matrixDiv.innerHTML = ""; //Limpiar el contenido anterior

  matrix1 = createMatrix(rows, cols, "matrix1"); // Asignar a las variables globales
  matrix2 = createMatrix(rows, cols, "matrix2"); // Asignar a las variables globales

  matrixDiv.appendChild(matrix1);
  matrixDiv.appendChild(document.createTextNode("+"));
  matrixDiv.appendChild(matrix2);
  matrixDiv.appendChild(document.createTextNode("="));

  const resultMatrix = document.createElement("div");
  resultMatrix.id = "resultMatrix";
  matrixDiv.appendChild(resultMatrix);

  const sumButton = document.createElement("button");
  sumButton.textContent = "Sumar";
  sumButton.addEventListener("click", function () {
    sumMatrices(rows, cols);
  });
  matrixDiv.appendChild(sumButton);
}

function createMatrix(rows, cols, idPrefix) {
  const matrix = document.createElement("div");
  matrix.classList.add("matrix");

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.pattern = "[0-9]*";
      input.maxLength = "2";
      input.classList.add("matrix-input");
      input.id = `${idPrefix}-${i}-${j}`;
      input.addEventListener("input", function (event) {
        if (!/^\d+$/.test(event.target.value)) {
          event.target.value = "";
        }
      });
      input.addEventListener("blur", function (event) {
        if (event.target.value.trim() === "") {
          event.target.value = "0";
        }
      });
      matrix.appendChild(input);
    }
    matrix.appendChild(document.createElement("br"));
  }

  return matrix;
}

function sumMatrices(rows, cols) {
  const resultMatrix = document.getElementById("resultMatrix");
  resultMatrix.innerHTML = ""; // Limpiar el contenido anterior

  const result = [];
  for (let i = 0; i < rows; i++) {
    result[i] = [];
    for (let j = 0; j < cols; j++) {
      const val1 =
        parseInt(document.getElementById(`matrix1-${i}-${j}`).value) || 0;
      const val2 =
        parseInt(document.getElementById(`matrix2-${i}-${j}`).value) || 0;
      result[i][j] = val1 + val2;
    }
  }

  // Mostrar el resultado en la página
  const resultTable = document.createElement("table");
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("td");
      cell.textContent = result[i][j];
      row.appendChild(cell);
    }
    resultTable.appendChild(row);
  }
  resultMatrix.appendChild(resultTable);
}
