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
    erase : _erase,
    clear : _clear,
    undo : _undo

  };

  //globals

  var currentColor = 'black';
  var currentColorDisplay;
  var eraseButton;
  var paintHistory = [];

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

          document.getElementById('canvasSection').appendChild(grid);

        }

      }

    }

  }

  function _makeSwatchSection() {

    //create swatch section

    var swatchSection = document.createElement('swatchSection');
    swatchSection.id = 'swatchSection';
    document.body.appendChild(swatchSection);

    //title heading

    var titleHeading = document.createElement('h1');
    titleHeading.id = 'titleHeading';
    titleHeading.innerHTML = 'PIXEL PAINTER';
    swatchSection.appendChild(titleHeading);

    //clear button

    var clearButton = document.createElement('button');
    clearButton.className = 'button';
    clearButton.id = 'clearButton';
    clearButton.addEventListener('click', _clear);
    clearButton.innerHTML = 'Start Fresh';
    swatchSection.appendChild(clearButton);

    //make and place swatch grid

    _makeGrid('swatch', 6, 6);

    //display for currentColor

    currentColorDisplay = document.createElement('div');
    currentColorDisplay.id = 'currentColorDisplay';
    swatchSection.appendChild(currentColorDisplay);

    //erase button

    eraseButton = document.createElement('button');
    eraseButton.className = 'button';
    eraseButton.value = 'off';
    eraseButton.addEventListener('click', _erase);
    eraseButton.innerHTML = 'Erase';
    swatchSection.appendChild(eraseButton);

    //undo button

    var undoButton = document.createElement('undo');
    undoButton.className = 'button';
    undoButton.addEventListener('click', _undo);
    undoButton.innerHTML = 'Undo';
    swatchSection.appendChild(undoButton);

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

  //erases the current cell

  function _erase() {

    if (eraseButton.value === 'off') {

      eraseButton.value = 'on';
      currentColorDisplay.style.backgroundColor = 'white';
      currentColorDisplay.innerHTML = 'Erase Mode';

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

  }

  //undo functionality

  function _undo(target) {

    var lastPixelPainted = paintHistory.pop();
    lastPixelPainted.style.backgroundColor = 'white';

  }

  //sets currentColor to clicked cell

  function setColorClickEvent(e) {

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