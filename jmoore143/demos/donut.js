var buf = "";
var bufArr = [];
var colorArr = [];


var k;
var frames = 100;

function main() {
    var A = 0,
        B = 0,
        z, b;
    // buf += "\n";
    for (var asdasd = 0; asdasd < frames; asdasd++) {
        b = new Array(1760).fill(" ");
        z = new Array(7040).fill(0);
        colorArr = new Array(1760).fill(" ");
        for (var j = 0; j < 6.28; j += 0.07) {
            for (var i = 0; i < 6.28; i += 0.02) {
                var c = Math.sin(i);
                var d = Math.cos(j);
                var e = Math.sin(A);
                var f = Math.sin(j);
                var g = Math.cos(A);
                var h = d + 2;
                var D = 1 / (c * h * e + f * g + 5);
                var l = Math.cos(i);
                var m = Math.cos(B);
                var n = Math.sin(B);
                var t = c * h * g - f * e;
                var x = 0 | (40 + 30 * D * (l * h * m - t * n));
                var y = 0 | (12 + 15 * D * (l * h * n + t * m));
                var o = x + 80 * y;
                var N = 0 | (8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n));
                // if (22 > y && y > 0 && x > 0 && 80 > x && D > z[Math.floor(o)]) {
                if (N > 0) {
                    z[Math.floor(o)] = D;
//                     b[Math.floor(o)] = "%c#";
                    b[Math.floor(o)] = "%c" + ".,-~:;=!*#$@" [N > 0 ? Math.floor(N) : 0];
                    colorArr[Math.floor(o)] = (procCol(".,-~:;=!*#$@" [N > 0 ? Math.floor(N) : 0]));
                }
                //               break;
            }
        }
        for (k = 0; 1761 > k; k++) {
            buf += (((k % 80)) ? b[k] : "\n");
        }
        A += 0.04;
        B += 0.02;
//         console.log(colorArr);
//         console.log();
        colorArr = colorArr.filter((e)=>{
            return e.includes("color");
        });
        bufArr.push([buf, colorArr]);
        colorArr = [];
        buf = "";
    }
    display();
}

function display() {
    if (bufArr.length > 0) {
        var frame = bufArr.shift();
        frame[1].splice(frame[0].match(/(\.|\,|\-|\~|\:|\;|\=|\!|\*|\#|\$|\@)/g).length, frame[1].length);
        console.log(frame[0], ...frame[1]);
        console.log((frames - bufArr.length) + "/" + frames);
        setTimeout(display, 50);
    }
}

function procCol(char) {
    var col = ["ffffff", "e6e6e6", "cfcfcf", "b8b8b8", "a1a1a1", "8a8a8a", "737373", "5c5c5c", "454545", "2b2b2b", "141414", "000000"][".,-~:;=!*#$@".indexOf(char)];
    if (!col) {
        return "";
    }
    return "color: #" + col + ";";
}
main();
// console.log("%ctest", "color: #737373");