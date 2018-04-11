var game_img_dir = "images/";
var game_texts = [];
game_texts['win1'] = 'Win ';
game_texts['win2'] = '!';
game_texts['playing'] = '...';
game_texts['start'] = 'Begin game!';

var game_field = [];

function create_field(w, h) {
    game_field = new Array(w);
    for (var i = 0; i < w; i++) {
        game_field[i] = new Array(h);
    }

    var hT = "<table cellpadding='0' cellspacing='0'>";
    for (var j = 0; j < h; j++) {
        hT += "<tr>";
        for (i = 0; i < w; i++) {
            hT += "<td>";
            hT += "<img id='c" + i + "_" + j + "' src='" + game_img_dir + "empty_cell.png' alt=' ' onclick='on_cell_click(" + i + "," + j + ")'>";
            hT += "</td>";
        }
        hT += "</tr>";
    }
    document.getElementById('game').innerHTML = hT + "</table>";
    document.getElementById('game_info').innerText = game_texts['start'];
}

function set_cell(x, y, t) {
    game_field[x][y] = t;
    var imgsrc = game_img_dir + 'empty_cell.png';
    if (t == 'x') {
        imgsrc = game_img_dir + 'x.png';
    }
    if (t == 'o') {
        imgsrc = game_img_dir + 'o.png';
    }
    var oName = "c" + x + "_" + y;
    document.getElementById(oName).src = imgsrc;
    if (t != null) {
        document.getElementById(oName).alt = t;
    }
}

function is_win() {
    for (var stX = 0; stX <= game_field.length - 3; stX++) {
        for (var stY = 0; stY <= game_field[0].length - 3; stY++) {
            var line_cell = game_field[stX][stY];
            if (line_cell != null) {
                for (var i = 0; i < 3; i++) {
                    if (game_field[i + stX][i + stY] != line_cell) {
                        line_cell = null;
                    }
                }
            }
            if (line_cell != null) {
                return line_cell;
            }
            line_cell = game_field[2 + stX][stY];
            if (line_cell != null) {
                for (var i = 0; i < 3; i++) {
                    if (game_field[2 - i + stX][i + stY] != line_cell) {
                        line_cell = null;
                    }
                }
            }
            if (line_cell != null) {
                return line_cell;
            }

            for (var i = 0; i < 3; i++) {
                line_cell = game_field[stX + i][stY];
                if (line_cell != null) {
                    for (var j = 0; j < 3; j++) {
                        if (game_field[i + stX][j + stY] != line_cell) {
                            line_cell = null;
                        }
                    }
                }
                if (line_cell != null) {
                    return line_cell;
                }
            }
            for (var j = 0; j < 3; j++) {
                line_cell = game_field[stX][stY + j];
                if (line_cell != null) {
                    for (var i = 0; i < 3; i++) {
                        if (game_field[i + stX][j + stY] != line_cell) {
                            line_cell = null;
                        }
                    }
                }
                if (line_cell != null) {
                    return line_cell;
                }
            }
        }
    }

    return false;
}

function computer_player() {
    var tx = null,
        ty = null;
    var stX = 0,
        stY = 0;
    for (stX = 0; stX < game_field.length; stX++)
        for (stY = 0; stY < game_field[0].length; stY++) {
            var line_cell = game_field[stX][stY];
            if ((line_cell != 'x') && (line_cell != 'o')) {
                tx = stX;
                ty = stY;
            }
        }
    if ((tx != null) && (ty != null)) {
        set_cell(tx, ty, 'o');
    }
}

function on_cell_click(x, y) {
    if (game_field[x][y] == null) {
        var win = is_win();
        if (!win) {
            set_cell(x, y, 'x');
        }
        win = is_win();
        if (!win) {
            computer_player();
            win = is_win();
        }
        if (!win) {
            game_info.innerText = game_texts['playing'];
        } else {
            var message = game_texts['win1'] + win + game_texts['win2'];
            alert(message);
            game_info.innerText = message;
        }
    }
}

function click_game_button() {
    if (isNaN(start_game_form.n_cells.value)) {
        alert("Enter the number of cells.");
        return;
    }
    if (start_game_form.n_cells.value > 40) {
        alert("Maximum allowed number of cells is 40");
        return;
    }
    var n = parseInt(start_game_form.n_cells.value);
    create_field(n, n);
}

function init_game() {
    game_texts['win1'] = 'Won "';
    game_texts['win2'] = '" !';
    game_texts['start'] = 'Beginning of the game. Your turn';
    create_field(3, 3);
}