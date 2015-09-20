document.addEventListener('DOMContentLoaded', function() {

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
  PixelPainter('swatch', 5, 5);
  PixelPainter('canvas', 10, 10);

});

