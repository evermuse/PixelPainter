//create Module

var pixelPainterModule = (function() {

  var module = {

    makeGrid : _makeGrid,
    setSwatchColor : _setSwatchColor,
    init : _init,
    optionPanel : _optionPanel,
    erase : _erase,
    clear : _clear

  };

  //globals

  var currentColor = 'black';
  var currentColorDisplay;
  var eraseButton;

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

        } else {

          gridCell.addEventListener('click', paintColorClickEvent);

        }

      }

    }

    document.getElementById('pixelPainter').appendChild(grid);

  }

  //function to set the 16 primary (named) colors to the swatch

  function _setSwatchColor() {

    colorArray = [

      'black',
      'gray',
      'silver',
      'white',
      'maroon',
      'red',
      'olive',
      'yellow',
      'green',
      'lime',
      'teal',
      'aqua',
      'navy',
      'blue',
      'purple',
      'fuchsia'

    ];

    var swatchList = document.querySelectorAll('.swatchCell');

    for (var i = 0; i < swatchList.length; i++) {

      swatchList[i].style.backgroundColor = colorArray[i];

    }

  }

  //create option panel w/ buttons and current color headsUp display

  function _optionPanel() {

    //display for currentColor

    currentColorDisplay = document.createElement('div');
    currentColorDisplay.id = 'currentColorDisplay';
    swatch.appendChild(currentColorDisplay);

    //erase button

    eraseButton = document.createElement('button');
    eraseButton.className = 'button';
    eraseButton.value = 'off';
    eraseButton.addEventListener('click', _erase);
    eraseButton.innerHTML = 'Erase';
    swatch.appendChild(eraseButton);

    //clear button

    var clearButton = document.createElement('button');
    clearButton.className = 'button';
    clearButton.addEventListener('click', _clear);
    clearButton.innerHTML = 'Clear';
    swatch.appendChild(clearButton);

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

    }

  }

  //function to initialize the interface

  function _init() {

    //make swatch grid

    _makeGrid('swatch', 4, 4);

    //make canvas grid

    _makeGrid('canvas', 25, 25);

    //give the swatch its color

    _setSwatchColor();

    //render option panel w/ buttons and current color headsUp display

    _optionPanel();

  }

  return module;

})();

//function to render functionality

document.addEventListener('DOMContentLoaded', function() {

  pixelPainterModule.init();

});
