function itDoesNothing() {
    setHexaColor(2, 3, "#FF00FF");;
}

var defaultColor = "#888";

function createDiv(_id, _class, _parent) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", _id);
    newDiv.setAttribute("class", _class);
    if (_parent != "") {
        document.getElementById(_parent).appendChild(newDiv);
    }
    return newDiv;
}

function createHexagon(_hid, _text = "", _value = "") {
    console.log("ENTER--createHexagon");

    //var colr = "#"+((1<<24)*Math.random()|0).toString(16);
    var colr = defaultColor;

    var hexagon = createDiv("hexa_" + _hid, "hexagon", "mainDiv");

    var top = createDiv("top_" + _hid, "hexa_top", "hexa_" + _hid);
    top.style.borderRightColor = colr;

    var middle = createDiv("mid_" + _hid, "hexa_middle", "hexa_" + _hid);
    middle.style.backgroundColor = colr;

    middle.innerHTML = _text + " " + _value;

    var bottom = createDiv("btm_" + _hid, "hexa_bottom", "hexa_" + _hid);
    bottom.style.borderLeftColor = colr;

    console.log("EXIT--createHexagon");
    return hexagon;
}

/*functioning code here */

var cells = [];

function setHexaColor(y, x, colorStr = "#FFF") {
    var hexId = "hexa_" + y + "_" + x;
    var topId = "top_" + y + "_" + x;
    var midId = "mid_" + y + "_" + x;
    var btmId = "btm_" + y + "_" + x;

    document.getElementById(topId).style.borderRightColor = colorStr;
    document.getElementById(midId).style.backgroundColor = colorStr;
    document.getElementById(btmId).style.borderLeftColor = colorStr;
}

function generateHexagons(W, H, valueArray) {

    console.log("generateHexagons called with W: " + W + " H: " + H + " valueArray: " + valueArray);

    var startTop = -8;
    var diffTop = 54; //for eachrow

    var startLeft = -8;
    var diffLeft = 94;

    var currTop = startTop;
    var currLeft = startLeft;

    for (i = 0, y = 0, x = 0; i < (W * H); i++, x++) {
        if (x == W) {
            y++;
            x = 0;
            currTop += 2 * diffTop;
        }
        cells.push({
            index: i,
            cy: y,
            cx: x,
            cost: valueArray[i],
            visited: false
        });

        var hexaId = y + "_" + x;
        var hexaCord = "(" + y + "," + x + ")";

        var elemHexa = createHexagon(hexaId, hexaCord, valueArray[i]);


        if (x % 2 == 0) {
            //uppar
            var cTop = currTop;
            var cLeft = x * diffLeft;

            elemHexa.style.top = cTop + "px";
            elemHexa.style.left = cLeft + "px";
        } else {
            //neeche
            var cTop = currTop + diffTop;
            var cLeft = x * diffLeft;
            elemHexa.style.top = cTop + "px";
            elemHexa.style.left = cLeft + "px";
        }
    }
}

//generateHexagons(5,3,[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])

//createHexagon("0_0","(0,0)");
//createHexagon("0_1","(0,1)");
//createHexagon("0_2","(0,2)");

//--------------------------------------------

var odd_oy = [-1, 0, 1, 1, 1, 1];
var odd_ox = [0, 1, 1, 0, -1, -1];

var even_oy = [-1, -1, 0, 1, 0, -1];
var even_ox = [0, 1, 1, 0, -1, -1];

var W = 5;
var H = 3;
var costArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var gMaxCost = 0;

function isSafeCord(cy, cx) {
    if (cy < 0 || cy >= W || cx < 0 || cx >= H) return false;
    return true;
}

function findCordIndex(cy,cx) {
    for(i=0;i<(W*H);i++) {
        if(cells[i].cy == cy && cells[i].cx == cx) return true;
    }
    return false;
}

function startAlgo(index, cost, depth) {

    cost += cells[index].cost;

    if (depth = 4 && cost > gMaxCost) {
        gMaxCost = cost;
        return;
    }

    var sy = cells[index].cy;
    var sx = cells[index].cx;

    cells[index].visited = true;

    //sx even colm index
    if (sx % 2 == 0) {
        for (k = 0; k < 6; k++) {
            var ty = sy + even_oy[k];
            var tx = sx + even_ox[k];
            var tIndex = findCordIndex(ty, tx);
            startAlgo(tIndex, cost, depth + 1);
        }

    } else {
        for (k = 0; k < 6; k++) {
            var ty = sy + odd_oy[k];
            var tx = sx + odd_ox[k];
            var tIndex = findCordIndex(ty, tx);
            startAlgo(tIndex, cost, depth + 1);
        }

    }
    cells[index].visited = false;
}

function mainProg() {

    generateHexagons(W, H, costArray);
    //input done....

    setHexaColor(2, 3, "#FF0000");
   // setTimeout(itDoesNothing,2000);

        for (i = 0; i < (W * H); i++) {
           setHexaColor(cells[i].cy, cells[i].cx, "#00FF00");
            startAlgo(i, 0, 1);
            setHexaColor(cells[i].cy, cells[i].cx, defaultColor);
        }


    alert("Max Possible Cost : " + gMaxCost)
}

mainProg();
