Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};

Number.prototype.wrapRange = function (min, max) {
    let val = this.valueOf();
    while (val < min) {
        val += (max - min);
    }
    while (val > max) {
        val -= (max - min);
    }
    return val;
}
/*
let angle = 0, dx = 0, dy = 0, keys = {}, lookamount = 5, moveamount = 5, angleadjust = 270;
// w moves:
// 0: right
// 90: down
// 180: left
// 270: up
function moveForward(amount) {
    let x = Math.cos((angle + angleadjust) * Math.PI / 180) * amount;
    let y = Math.sin((angle + angleadjust) * Math.PI / 180) * amount;
    dx += x;
    dy += y;
    document.querySelector(':root').style.setProperty('--dx', dx + 'px');
    document.querySelector(':root').style.setProperty('--dy', dy + 'px');
}
function moveLateral(amount) {
    let x = Math.cos((angle + 90 + angleadjust) * Math.PI / 180) * amount;
    let y = Math.sin((angle + 90 + angleadjust) * Math.PI / 180) * amount;
    dx += x;
    dy += y;
    document.querySelector(':root').style.setProperty('--dx', dx + 'px');
    document.querySelector(':root').style.setProperty('--dy', dy + 'px');
}
document.body.addEventListener("keydown", function (event) {
    event.preventDefault();
    keys[event.key.toLowerCase()] = true;
});
document.body.addEventListener("keyup", function (event) {
    event.preventDefault();
    keys[event.key.toLowerCase()] = false;
});
window.setInterval(function () {
    if (keys["arrowleft"]) {
        angle -= lookamount;
    }
    if (keys["arrowright"]) {
        angle += lookamount;
    }
    document.querySelector(':root').style.setProperty('--angle', angle + 'deg');

    if (keys["w"]) {
        moveForward(moveamount * (keys["shift"] ? 2 : 1));
    }
    if (keys["s"]) {
        moveForward(-moveamount * (keys["shift"] ? 2 : 1));
    }
    if (keys["d"]) {
        moveLateral(moveamount * (keys["shift"] ? 2 : 1));
    }
    if (keys["a"]) {
        moveLateral(-moveamount * (keys["shift"] ? 2 : 1));
    }
}, 1000 / 60);
*/
let keys = {};
document.body.addEventListener("keydown", function (event) {
    event.preventDefault();
    keys[event.key.toLowerCase()] = true;
});
document.body.addEventListener("keyup", function (event) {
    event.preventDefault();
    keys[event.key.toLowerCase()] = false;
});
let ly = 0, lx = 0, lookamount = 2, dx = 0, dz = 0, moveamount = 10;
window.setInterval(function () {
    if (keys["arrowup"]) {
        ly += lookamount;
    }
    if (keys["arrowdown"]) {
        ly -= lookamount;
    }
    ly = ly.clamp(-90, 90);
    if (keys["arrowleft"]) {
        lx -= lookamount;
    }
    if (keys["arrowright"]) {
        lx += lookamount;
    }
    lx = lx.wrapRange(0, 360);
    document.querySelector(':root').style.setProperty('--rx', ly + 'deg');
    document.querySelector(':root').style.setProperty('--ry', lx + 'deg');

    if (keys["w"]) {
        dz += moveamount * (keys["shift"] ? 2 : 1);
    }
    if (keys["a"]) {
        dx += moveamount * (keys["shift"] ? 2 : 1);
    }
    if (keys["s"]) {
        dz -= moveamount * (keys["shift"] ? 2 : 1);
    }
    if (keys["d"]) {
        dx -= moveamount * (keys["shift"] ? 2 : 1);
    }
    document.querySelector(':root').style.setProperty('--dz', dz + 'px');
    document.querySelector(':root').style.setProperty('--dx', dx + 'px');
}, 1000 / 60);
