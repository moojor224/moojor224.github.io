function setPerspective(val, t) {
    t.nextElementSibling.innerHTML = val;
    document.querySelector(":root").style.setProperty("--perspective", val + "px");
}

Number.prototype.clamp = function (min, max) {
    return min < max ? Math.min(Math.max(this, min), max) : Math.min(Math.max(this, max), min);
};

Number.prototype.wrapRange = function (min, max) {
    if (max < min) [min, max] = [max, min];
    let val = this.valueOf();
    let count = 0;
    while (val < min && count < 10000) {
        val += (max - min);
        count++;
    }
    if (count >= 10000) {
        throw new Error("number out of bounds");
    }
    count = 0;
    while (val > max && count < 10000) {
        val -= (max - min);
        count++;
    }
    if (count >= 10000) {
        throw new Error("number out of bounds");
    }
    return val;
}

class Point {
    /**
     * Point constructor
     * @constructor
     * @param {Number} x x-coordinate
     * @param {Number} y y-coordinate
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

class Enemy {
    constructor(x, y) {

    }
}

let keys = {}, angleadjust = 270;
// w moves:
// 0: right
// 90: downI
// 180: left
// 270: up
function pick(line, point) {
    let { x: px, y: py } = point;
    let [{ x: x1, y: y1 }, { x: x2, y: y2 }] = line;
    let val;
    if (px.clamp(x1, x2) == px && py.clamp(y1, y2) == py) return point;
    if (x1 == x2) {
        if (y2 > y1) {
            if (py > y2) return new Point(x2, y2);
            if (py < y1) return new Point(x1, y1);
        }
        if (y2 < y1) {
            if (py > y1) return new Point(x1, y1);
            if (py < y2) return new Point(x2, y2);
        }
    }
    if (y1 == y2) {
        if (x2 > x1) {
            if (px > x2) return new Point(x2, y2);
            if (px < x1) return new Point(x1, y1);
        }
        if (x2 < x1) {
            if (px > x1) return new Point(x1, y1);
            if (px < x2) return new Point(x2, y2);
        }
    }
    if (x2 > x1) {
        if (px > x2) return new Point(x2, y2);
        if (px < x2) return new Point(x1, y1);
    }
}

function closestPointOnPolygon(point, poly) {
    let { x, y } = point;
    poly = JSON.parse(JSON.stringify(poly));
    poly.push(poly[0]);
    let distances = [];
    poly.forEach((p, i) => {
        if (i >= poly.length - 1) return;
        let { x: x1, y: y1 } = p;
        let { x: x2, y: y2 } = poly[i + 1];
        let { x: x3, y: y3 } = point;
        let m1 = (y2 - y1) / (x2 - x1);// slope of polygon side
        let b1 = y1 - (m1 * x1);
        let m2 = (x2 - x1) / (y2 - y1)//slope of closest line
        let b2 = y3 - (m2 * x3);
        // console.log(x1, y1, x2, y2, x3, y3);
        // console.log(m1, b1, m2, b2);

        if (x2 == x1) {
            distances.push([Math.abs(x1 - x3), pick([p, poly[i + 1]], new Point(x1, y3))]);
            return;
        }
        if (y2 == y1) {
            distances.push([Math.abs(y1 - y), pick([p, poly[i + 1]], new Point(x3, y1))]);
            return;
        }

        let closestPoint = new Point((b1 - b2) / (m2 - m1), (m1 * (b1 - b2) / (m2 - m1)) + b1);
        let distance = Math.abs(Math.sqrt(Math.pow(x3 - closestPoint.x, 2) + Math.pow(y3 - closestPoint.y, 2)));
        distances.push([distance, closestPoint]);
    });
    // debugger;
    let min = distances[0][0], index = 0;
    distances.forEach((d, i) => {
        if (d[0] < min) {
            min = d[0];
            index = i;
        }
    });
    // console.log(distances, index);
    return distances[index][1];
    // return [x, y];
}

function inside(point, poly) {
    let { x, y } = point;

    var inside = false;
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        var xi = poly[i].x, yi = poly[i].y;
        var xj = poly[j].x, yj = poly[j].y;

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}

/**
 * checks if a point is on a line
 * @param {Object[]} line array 2 points that represent a line
 * @param {Object} point point to test
 * @returns {boolean}
 */
function intersects(line, point) {
    let { x: px, y: py } = point;
    let [{ x: x1, y: y1 }, { x: x2, y: y2 }] = line;
    if (px.clamp(x1, x2) == px && px.clamp(y1, y2) == py) {
        if (((y1 - py) / (x1 - px)) == ((py - y2) / (px - x2))) {
            return true;
        }
    }
    return false;
}

let polygon = [
    new Point(640, 200),
    new Point(-4000, 200),
    new Point(-4000, -2800),
    new Point(640, -2800),
];
polygon = [
    new Point(-2, 2),
    new Point(-2, -2),
    new Point(2, -2),
    new Point(2, 10),
    new Point(0, 10),
    new Point(0, 11),
    new Point(2, 11),
    new Point(2, 12),
    new Point(0, 12),
    new Point(0, 13),
    new Point(2, 13),
    new Point(2, 16),
    new Point(-2, 16),
    new Point(-2, 19),
    new Point(1, 19),
    new Point(1, 18),
    new Point(-1, 18),
    new Point(-1, 17),
    new Point(2, 17),
    new Point(2, 20),
    new Point(-3, 20),
    new Point(-3, 16),
    new Point(-4, 16),
    new Point(-4, 20),
    new Point(),
    new Point(),
    new Point(),
    new Point(),
];
polygon = polygon.map(e => new Point(e.x * 1000, e.y * 1000));
// inside([ 1.5, 1.5 ], polygon);
let framerate = 60;
let ly = 0, lx = 0, lookamount = 2, dx = 0, dz = 0, moveamount = 30 * (60 / framerate), pointerlocked = false;
function moveForward(amount) {
    let x = Math.cos((lx + angleadjust) * Math.PI / 180) * amount;
    let y = Math.sin((lx + angleadjust) * Math.PI / 180) * amount;
    // console.log(dx, x, dz, y);
    if (inside(new Point(dx + x, dz + y), polygon)) {
        dx += x;
        dz += y;
        document.querySelector(':root').style.setProperty('--dx', dx + 'px');
        document.querySelector(':root').style.setProperty('--dz', dz + 'px');
    } else {
        let point = closestPointOnPolygon(new Point(dx + x, dz + y), polygon);
        // console.log(point);
        dx = point.x;
        dz = point.y;
        document.querySelector(':root').style.setProperty('--dx', dx + 'px');
        document.querySelector(':root').style.setProperty('--dz', dz + 'px');
    }
}

function moveLateral(amount) {
    let x = Math.cos((lx + 90 + angleadjust) * Math.PI / 180) * amount;
    let y = Math.sin((lx + 90 + angleadjust) * Math.PI / 180) * amount;
    if (inside(new Point(dx + x, dz + y), polygon)) {
        dx += x;
        dz += y;
        document.querySelector(':root').style.setProperty('--dx', dx + 'px');
        document.querySelector(':root').style.setProperty('--dz', dz + 'px');
    } else {
        let point = closestPointOnPolygon(new Point(dx + x, dz + y), polygon);
        dx = point.x;
        dz = point.y;
        document.querySelector(':root').style.setProperty('--dx', dx + 'px');
        document.querySelector(':root').style.setProperty('--dz', dz + 'px');
    }
}

// let keys = {};
document.body.addEventListener("keydown", function (event) {
    let key = event.key.toLowerCase();
    if (key.includes("arrow") || key == " ") {
        event.preventDefault();
    }
    keys[event.key.toLowerCase()] = true;
});

document.body.addEventListener("keyup", function (event) {
    let key = event.key.toLowerCase();
    if (key.includes("arrow") || key == " ") {
        event.preventDefault();
    }
    keys[event.key.toLowerCase()] = false;
});

window.setInterval(function () {
    if (!pointerlocked) return;
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
        moveForward(-moveamount * (keys["shift"] ? 2 : 1));
    }
    if (keys["s"]) {
        moveForward(moveamount * (keys["shift"] ? 2 : 1));
    }
    if (keys["d"]) {
        moveLateral(moveamount * (keys["shift"] ? 2 : 1));
    }
    if (keys["a"]) {
        moveLateral(-moveamount * (keys["shift"] ? 2 : 1));
    }
}, 1000 / framerate);

document.querySelector("body").addEventListener("", function () {

});

let maxmouse = 15;
function readmouse(event) {
    lx -= (event.movementX / 4).clamp(-maxmouse, maxmouse);// horizontal look
    ly -= (event.movementY / 4).clamp(-maxmouse, maxmouse);// vertical look

    lx = lx.wrapRange(0, 360);
    ly = ly.clamp(-90, 90);

    document.querySelector(':root').style.setProperty('--rx', ly + 'deg');
    document.querySelector(':root').style.setProperty('--ry', lx + 'deg');
}

let viewport = document.querySelector("viewport");
viewport.addEventListener("click", function () {
    viewport.requestPointerLock({
        unadjustedMovement: true,
    });
});

window.addEventListener("pointerlockchange", function () {
    if (document.pointerLockElement == viewport) {
        console.log("add pointer reader");
        pointerlocked = true;
        window.addEventListener("mousemove", readmouse, false);
    } else {
        console.log("remove pointer reader");
        pointerlocked = false;
        window.removeEventListener("mousemove", readmouse, false);
        document.querySelector('viewport menu').classList.remove('hidden')
    }
});

(function () {
    return;
    const times = [];
    let fps;

    function refreshLoop() {
        window.requestAnimationFrame(() => {
            const now = performance.now();
            while (times.length > 0 && times[0] <= now - 1000) {
                times.shift();
            }
            times.push(now);
            fps = times.length;
            document.querySelector("fps").innerHTML = fps + " fps";
            refreshLoop();
        });
    }

    refreshLoop();
})();

function parsePolygon(poly) {
    let maxx = poly[0].x;
    let maxy = poly[0].y;
    let minx = maxx;
    let miny = maxy;
    poly.forEach(p => {
        if (p.x < minx) minx = p.x;
        if (p.x > maxx) maxx = p.x;
        if (p.y < miny) miny = p.y;
        if (p.y > maxy) maxy = p.y;
    });
    // console.log(minx, miny);
    // console.log(poly.map(e => `${e.x - minx}px ${e.y - miny}px`).join(", "));
    return {
        width: ((maxx - minx)) + "px",
        height: ((maxy - miny)) + "px",
        // transform: `rotateZ(180deg) translateY(${-maxy + 8000}px) translateX(calc(-100% + ${maxx + minx + 1440}px))`,
        transform: `rotateZ(180deg) translateY(${miny}px) translateX(${minx}px)`,
        clipPath: `polygon(${poly.map(e => `${(e.x - minx)}px ${(e.y - miny)}px`).join(", ")})`,
    }
}

let polyData = parsePolygon(polygon);
let floor = createElement("floor", {
    style: {
        clipPath: polyData.clipPath,
        backgroundColor: "orange",
        transformOrigin: "top left",
        width: polyData.width,
        height: polyData.height,
        transform: polyData.transform,
    }
});
document.querySelector("level").add(floor);