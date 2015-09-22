// create Module (can be within or without the above listener function)

var pixelPainterModule = (function() {

  var module = {

    makeGrid : _makeGrid,
    setSwatchColor : _setSwatchColor,
    init : _init

  };

  var currentColor = 'black';

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

  //sets currentColor to clicked cell

  function setColorClickEvent(e) {

    currentColor = this.style.backgroundColor;
    console.log(currentColor);

    console.log(this.id + ' was clicked');

  }

  //sets the clicked cell to currentColor

  function paintColorClickEvent(e) {

    console.log(currentColor);
    console.log(this.id + ' was clicked');
    this.style.backgroundColor = currentColor;

  }

  function _init() {

    //make two grids one for the color swatch and one for the canvas

    _makeGrid('swatch', 4, 4);
    _makeGrid('canvas', 16, 16);

    //give the swatch its color

    _setSwatchColor();

  }

  return module;

})();

//function to render functionality

document.addEventListener('DOMContentLoaded', function() {

  pixelPainterModule.init();

});
