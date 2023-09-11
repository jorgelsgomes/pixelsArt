const quadro = document.getElementById('pixel-board');
// Função que gera cores aleadorias.
function createColor() {
  const r = Math.floor(Math.random() * 254);
  const g = Math.floor(Math.random() * 254);
  const b = Math.floor(Math.random() * 254);
  return `rgb(${r}, ${g}, ${b})`;
}
// Função que capitura as paletas e coloca a cor.
function paintPalette() {
  const colorDiv = document.querySelectorAll('.color');
  for (let index = 1; index < colorDiv.length; index += 1) {
    colorDiv[index].style.backgroundColor = createColor();
  }
}
// Cor fixa da paleta de cores
document.querySelectorAll('.color')[0].style.backgroundColor = 'black';
// Salva paleta de cores
function savePalette() {
  const arrayCores = [];
  const color = document.querySelectorAll('.color');
  for (let index = 1; index < color.length; index += 1) {
    arrayCores[index] = color[index].style.backgroundColor;
  }
  localStorage.setItem('colorPalette', JSON.stringify(arrayCores));
}
// Botão de cores aleatorias
const btnCores = document.getElementById('button-random-color');
btnCores.addEventListener('click', () => {
  paintPalette();
  savePalette();
});
// Adiciona quadro de pixels
function createBoard(number) {
  quadro.style.width = `${number * 45}px`;
  for (let linha = 0; linha < number; linha += 1) {
    for (let coluna = 0; coluna < number; coluna += 1) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel');
      quadro.appendChild(pixel);
      quadro.lastChild.style.backgroundColor = 'white';
    }
  }
}
// Seleciona cor da paleta
function selectCor(event) {
  const selecionaClass = document.querySelector('.selected');
  selecionaClass.classList.remove('selected');
  event.target.classList.add('selected');
}
// Salva desenho de quadro de pixels
function saveBoard() {
  localStorage.setItem('pixelBoard', quadro.innerHTML);
}
// pinta quadro com a paleta de cores
function printBoard() {
  const quadrob = document.querySelectorAll('.pixel');
  for (let index = 0; index < quadrob.length; index += 1) {
    quadrob[index].addEventListener('click', () => {
      const selecionaClass = document.querySelector('.selected').style.backgroundColor;
      quadrob[index].style.setProperty('background-color', selecionaClass);
      saveBoard();
    });
  }
}
// Carregar desenho no quadro
function loadDesenho() {
  quadro.innerHTML = localStorage.getItem('pixelBoard');
  printBoard();
}
// Limpar quadro de pixels
function clearBoard() {
  const quadroC = document.querySelectorAll('.pixel');
  for (let index = 0; index < quadroC.length; index += 1) {
    quadroC[index].style.backgroundColor = 'white';
  }
}
// localStorage
function localStorageSave() {
  if (localStorage.getItem('colorPalette') === null) {
    paintPalette();
  } else {
    const corSalva = JSON.parse(localStorage.getItem('colorPalette'));
    const color = document.querySelectorAll('.color');
    for (let index = 1; index < color.length; index += 1) {
      color[index].style.backgroundColor = corSalva[index];
    }
  }
}
// Limpa quadro
function limpa() {
  const pixelBoard = document.getElementById('pixel-board');
  pixelBoard.innerHTML = '';
}
// Altera o temanho do quadro
function tamanhoNovo() {
  document.getElementById('generate-board').addEventListener('click', () => {
    limpa();
    const boardSize = document.getElementById('board-size').value;
    let number = 0;
    if (boardSize === '') {
      alert('Board inválido!');
    } else if (boardSize < 5) {
      number = 5;
      createBoard(number);
    } else if (boardSize > 50) {
      number = 50;
      createBoard(number);
    } else {
      number = boardSize;
      createBoard(number);
    }
    printBoard();
  });
}
// Evento de selecionar cor
const cor = document.getElementsByClassName('color');
for (let index = 0; index < cor.length; index += 1) {
  cor[index].addEventListener('click', selectCor);
}
// Iniciar pagina
window.onload = () => {
  // Tamanho de quadro
  tamanhoNovo();
  // Salva quadro
  localStorageSave();
  // Criando quadro com 25 pixels
  createBoard(25);
  // Pintar quadro
  printBoard();
  // evento de click impar quadro
  const btn = document.getElementById('clear-board');
  btn.addEventListener('click', clearBoard);
  // Verificar desenho salvo
  const pixelBoard = localStorage.getItem('pixelBoard');
  if (pixelBoard) {
    loadDesenho();
  }
};
