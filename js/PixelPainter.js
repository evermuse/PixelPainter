//function to render functionality

document.addEventListener('DOMContentLoaded', function() {

  //function to create grids with a unique id, row #, & column #

  function PixelPainter( name, row, col ) {

    this.name = name;

    var grid = document.createElement('section');
    grid.id = name;
    var count = 0;

    for (var r = 0; r < row; r++) {

      var gridRow = grid.appendChild(document.createElement('div'));
      gridRow.id = name + 'Row_' + r;
      gridRow.className = name + 'Row';

      for (var c = 0; c < col; c++) {

        var gridCell = grid.appendChild(document.createElement('div'));
        gridCell.id = name + 'Cell_' + c;
        gridCell.className = name + 'Cell';

        //gridCell.addEventListener('click', (function())

      }

    }
    console.log(grid);
    document.getElementById('pixelPainter').appendChild(grid);

  }

  //intatiate two grids one for the color swatch and one for the canvas

  PixelPainter('swatch', 4, 4);
  PixelPainter('canvas', 10, 10);

  //function to set the 16 primary (named) colors to the swatch

  function setColor() {

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

  //get that color onto the swatch

  setColor();

});

