/*jslint browser: true */
'use strict';

//create Module

var pixelPainterModule = (function() {

  var module = {

    makeSwatchSection : _makeSwatchSection,
    makeCanvasSection : _makeCanvasSection,
    makeGrid : _makeGrid,
    setSwatchColor : _setSwatchColor,
    init : _init,
    draw : _draw,
    erase : _erase,
    clear : _clear,
    undo : _undo

  };

  //globals

  var currentColor = 'black';
  var currentColorDisplay;
  var eraseButton;
  var paintHistory = [];
  var isMouseDown = false;

  //where the grids get made

  function _makeGrid( name, row, col ) {

    var grid = document.createElement('section');
    grid.id = name;
    var count = 0;

    for (var r = 0; r < row; r++) {

      var gridRow = grid.appendChild(document.createElement('div'));
      gridRow.id = name + 'Row_' + r;
      gridRow.className = name + 'Row';

      for (var c = 0; c < col; c++) {

        var gridCell = grid.appendChild(document.createElement('div'));
        count++;
        gridCell.id = name + 'Cell_' + count;
        gridCell.className = name + 'Cell';

        if (name === 'swatch') {

          gridCell.addEventListener('click', setColorClickEvent);

          document.getElementById('swatchSection').appendChild(grid);

        } else {

          gridCell.addEventListener('click', paintColorClickEvent);
          gridCell.addEventListener('mouseenter', paintColorDragEvent);

          grid.addEventListener('mousedown', _draw);
          grid.addEventListener('mouseup', _draw);

          document.getElementById('canvasSection').appendChild(grid);

        }

      }

    }

  }

  function _makeSwatchSection() {

    //create swatch section

    var swatchSection = document.createElement('section');
    swatchSection.id = 'swatchSection';
    document.body.appendChild(swatchSection);

    //swatch section header

    var swatchHeader = document.createElement('header');
    swatchHeader.id = 'swatchHeader';
    swatchSection.appendChild(swatchHeader);

    //logo

    var logo = document.createElement('img');
    logo.id = 'logo';
    logo.src = './img/logo.svg';
    swatchHeader.appendChild(logo);

    //title heading

    var titleHeading = document.createElement('h1');
    titleHeading.id = 'titleHeading';
    titleHeading.innerHTML = 'PIXEL PAINTER';
    swatchHeader.appendChild(titleHeading);

    //clear button

    var clearButton = document.createElement('button');
    clearButton.className = 'button';
    clearButton.id = 'clearButton';
    clearButton.addEventListener('click', _clear);
    clearButton.innerHTML = 'Start Fresh';
    swatchSection.appendChild(clearButton);

    //make and place swatch grid

    _makeGrid('swatch', 6, 6);

    //options container

    var optionDiv = document.createElement('div');
    optionDiv.id = 'optionDiv';
    swatchSection.appendChild(optionDiv);

    //erase button

    eraseButton = document.createElement('button');
    eraseButton.className = 'button';
    eraseButton.id = 'eraseButton';
    eraseButton.value = 'off';
    eraseButton.addEventListener('click', _erase);
    optionDiv.appendChild(eraseButton);

    //display for currentColor

    currentColorDisplay = document.createElement('div');
    currentColorDisplay.id = 'currentColorDisplay';
    optionDiv.appendChild(currentColorDisplay);

    //undo button

    var undoButton = document.createElement('undo');
    undoButton.className = 'button';
    undoButton.id = 'undoButton';
    undoButton.addEventListener('click', _undo);
    undoButton.textContent = 'UNDO';
    optionDiv.appendChild(undoButton);

  }

  //function to set the 16 primary (named) colors to the swatch

  function _setSwatchColor() {

    var colorArray = [

      '#8D722B',
      '#D0EDFC',
      '#84C8CB',
      '#225667',
      '#2E2B1F',
      '#F16822',
      '#14AABA',
      '#BABB89',
      '#EE3824',
      '#655534',
      '#225667',
      '#B66D2F',
      '#050709',
      '#2B4321',
      '#FBA91A',
      '#F26822',
      '#3EB86B',
      '#777755',
      '#5F8E40',
      '#B7BF78',
      '#777755',
      '#AFBECF',
      '#225667',
      '#DEDFBE',
      '#777755',
      '#476569',
      '#14212F',
      '#57682E',
      '#ACAF39',
      '#57504B',
      '#225667',
      '#7F8835',
      '#B66D2F',
      '#57504B',
      '#B75478',
      '#BABB89'

    ];

    var swatchList = document.querySelectorAll('.swatchCell');

    for (var i = 0; i < swatchList.length; i++) {

      swatchList[i].style.backgroundColor = colorArray[i];

    }

  }

  function _makeCanvasSection() {

    //create canvas section

    var canvasSection = document.createElement('section');
    canvasSection.id = 'canvasSection';
    document.body.appendChild(canvasSection);

    //make and place canvas grid

    _makeGrid('canvas', 30, 30);

  }

  //draw functionality derived from current mouse status on the canvas

  function _draw(e) {

    //var startCell = e.target;

    if (!isMouseDown) {

      isMouseDown = true;
      console.log('the mouse is down', isMouseDown);
      return;

    } else {

      isMouseDown = false;
      console.log('the mouse is up', isMouseDown);
      return;

    }

  }

  //erases the current cell

  function _erase() {

    if (eraseButton.value === 'off') {

      eraseButton.value = 'on';
      currentColorDisplay.style.backgroundColor = 'white';
      currentColorDisplay.innerHTML = 'Erase';

    } else if (eraseButton.value === 'on') {

      eraseButton.value = 'off';
      currentColorDisplay.innerHTML = '';

    }

  }

  //clears the canvas

  function _clear() {

    var canvasCells = document.querySelectorAll('.canvasCell');

    for (var i = 0; i < canvasCells.length; i++) {

      canvasCells[i].style.backgroundColor = 'white';

    }

    currentColorDisplay.style.backgroundColor = '#252117';

  }

  //undo functionality

  function _undo(target) {

    if (paintHistory.length === 0) {

      alert('Nothing to Undo!');

    }

    var lastPixelPainted = paintHistory.pop();
    lastPixelPainted.style.backgroundColor = 'white';

  }

  //sets currentColor to clicked cell

  function setColorClickEvent() {

    currentColor = this.style.backgroundColor;
    console.log(currentColor);
    currentColorDisplay.style.backgroundColor = currentColor;

    console.log(this.id + ' was clicked');

  }

  //sets the clicked cell to currentColor

  function paintColorClickEvent(e) {

    console.log(this.id + ' was clicked');

    if (eraseButton.value === 'on') {

      this.style.backgroundColor = 'white';
      console.log(currentColor + ' erased');

    } else {

      this.style.backgroundColor = currentColor;
      console.log(currentColor);
      paintHistory.push(e.target);

    }

  }

  function paintColorDragEvent(e) {

    console.log(this.id + ' was clicked');

    if (eraseButton.value === 'on') {

      this.style.backgroundColor = 'white';
      console.log(currentColor + ' erased');

    } else if (isMouseDown) {

      this.style.backgroundColor = currentColor;
      console.log(currentColor);
      paintHistory.push(e.target);

    }

  }

  //function to initialize the interface

  function _init() {

    //make swatch section

    _makeSwatchSection();

    //make canvas section

    _makeCanvasSection();

    //give the swatch its color

    _setSwatchColor();

  }

  return module;

})();

//function to render functionality

document.addEventListener('DOMContentLoaded', function() {

  pixelPainterModule.init();

});