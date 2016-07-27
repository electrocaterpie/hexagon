function createDiv(_id, _class, _parent) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", _id);
    newDiv.setAttribute("class", _class);
    if (_parent != "") {
        document.getElementById(_parent).appendChild(newDiv);
    }
    return newDiv;
}

function createHexagon(_hid, _text = "", _value="") {
    console.log("ENTER--createHexagon");

    var colr = "#"+((1<<24)*Math.random()|0).toString(16);
    //var colr = "#6C6";

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

function generateHexagons(W, H, valueArray) {

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
            currTop += 2*diffTop;
        }
        cells.push({
            cy: y,
            cx: x,
            cost: valueArray[i]
        });

        var hexaId = y + "_" + x;
        var hexaCord = "(" + y + "," + x + ")";

        var elemHexa = createHexagon(hexaId, hexaCord, valueArray[i]);


        if (x % 2 == 0) {
            //uppar
            var cTop = currTop;
            var cLeft = x * diffLeft;

            elemHexa.style.top = cTop+"px";
            elemHexa.style.left = cLeft+"px";
        } else {
            //neeche
            var cTop = currTop + diffTop;
            var cLeft = x * diffLeft;
            elemHexa.style.top = cTop+"px";
            elemHexa.style.left = cLeft+"px";
        }
    }
}

generateHexagons(5, 3, [1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15])
    //generateHexagons(5,3,[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])

//createHexagon("0_0","(0,0)");
//createHexagon("0_1","(0,1)");
//createHexagon("0_2","(0,2)");
