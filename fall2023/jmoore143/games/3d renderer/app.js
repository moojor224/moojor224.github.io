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

let keys = {}, angleadjust = 270;
// w moves:
// 0: right
// 90: downI
// 180: left
// 270: up
function pick(line, point) {
    console.log("pick before", point);
    let [px, py] = point;
    let [[x1, y1], [x2, y2]] = line;
    if (px.clamp(x1, x2) == px && py.clamp(y1, y2) == py) return point;
    if (x1 == x2) {
        if (y2 > y1) {
            if (py > y2) return [x2, y2];
            if (py < y1) return [x1, y1];
        }
        if (y2 < y1) {
            if (py > y1) return [x1, y1];
            if (py < y2) return [x2, y2];
        }
    }
    if (y1 == y2) {
        if (x2 > x1) {
            if (px > x2) return [x2, y2];
            if (px < x1) return [x1, y1];
        }
        if (x2 < x1) {
            if (px > x1) return [x1, y1];
            if (px < x2) return [x2, y2];
        }
    }
    if (x2 > x1) {
        if (px > x2) return [x2, y2];
        if (px < x2) return [x1, y1];
    }
}
function closestPointOnPolygon(point, poly) {
    let [x, y] = point;
    poly = JSON.parse(JSON.stringify(poly));
    poly.push(poly[0]);
    let distances = [];
    poly.forEach((p, i) => {
        if (i >= poly.length - 1) return;
        let [x1, y1] = p;
        let [x2, y2] = poly[i + 1];
        let [x3, y3] = point;
        let m1 = (y2 - y1) / (x2 - x1);// slope of polygon side
        let b1 = y1 - (m1 * x1);
        let m2 = (x2 - x1) / (y2 - y1)//slope of closest line
        let b2 = y3 - (m2 * x3);

        if (x2 == x1) {
            distances.push([Math.abs(x1 - x3), pick([p, poly[i + 1]], [x1, y3])]);
            return;
        }
        if (y2 == y1) {
            distances.push([Math.abs(y1 - y), pick([p, poly[i + 1]], [x3, y1])]);
            return;
        }

        let closestPoint = [(b1 - b2) / (m2 - m1), (m1 * (b1 - b2) / (m2 - m1)) + b1];
        let distance = Math.abs(Math.sqrt(Math.pow(x3 - closestPoint[0], 2) + Math.pow(y3 - closestPoint[1], 2)));
        distances.push([distance, closestPoint]);
    });
    let min = distances[0][0], index = 0;
    distances.forEach((d, i) => {
        if (d[0] < min) {
            min = d[0];
            index = i;
        }
    });
    return distances[index][1];
    // return [x, y];
}
function inside(point, poly) {
    var x = point[0], y = point[1];

    var inside = false;
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        var xi = poly[i][0], yi = poly[i][1];
        var xj = poly[j][0], yj = poly[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}

function intersects(line, point) {
    let [px, py] = point;
    let [[x1, y1], [x2, y2]] = line;
    if (px.clamp(x1, x2) == px && px.clamp(y1, y2) == py) {
        if (((y1 - py) / (x1 - px)) == ((py - y2) / (px - x2))) {
            return true;
        }
    }
    return false;
}

let polygon = [[640, 200], [-2360, 200], [-2360, -2800], [640, -2800]];
// inside([ 1.5, 1.5 ], polygon);
let framerate = 60;
let ly = 0, lx = 0, lookamount = 2, dx = 0, dz = 0, moveamount = 10 * (60 / framerate), pointerlocked = false,
    playerthick = 2;
function moveForward(amount) {
    let x = Math.cos((lx + angleadjust) * Math.PI / 180) * amount;
    let y = Math.sin((lx + angleadjust) * Math.PI / 180) * amount;
    if (inside([dx + x, dz + y], polygon)) {
        dx += x;
        dz += y;
        document.querySelector(':root').style.setProperty('--dx', dx + 'px');
        document.querySelector(':root').style.setProperty('--dz', dz + 'px');
    } else {
        let point = closestPointOnPolygon([dx + x, dz + y], polygon);
        // if (intersects(point, polygon)) {
        //     console.log(point);
        //     return;
        // }
        console.log("old", [dx, dz], "new", point);
        [dx, dz] = point;
        document.querySelector(':root').style.setProperty('--dx', dx + 'px');
        document.querySelector(':root').style.setProperty('--dz', dz + 'px');
    }
}
function moveLateral(amount) {
    let x = Math.cos((lx + 90 + angleadjust) * Math.PI / 180) * amount;
    let y = Math.sin((lx + 90 + angleadjust) * Math.PI / 180) * amount;
    if (inside([dx + x, dz + y], polygon)) {
        dx += x;
        dz += y;
        document.querySelector(':root').style.setProperty('--dx', dx + 'px');
        document.querySelector(':root').style.setProperty('--dz', dz + 'px');
    } else {
        let point = closestPointOnPolygon([dx + x, dz + y], polygon);
        // if (intersects(point, polygon)) {
        //     console.log(point);
        //     return;
        // }
        [dx, dz] = point;
        document.querySelector(':root').style.setProperty('--dx', dx + 'px');
        document.querySelector(':root').style.setProperty('--dz', dz + 'px');
    }
}

// let keys = {};
document.body.addEventListener("keydown", function (event) {
    if (event.key.toLowerCase().includes("arrow")) {
        event.preventDefault();
    }
    keys[event.key.toLowerCase()] = true;
});
document.body.addEventListener("keyup", function (event) {
    if (event.key.toLowerCase().includes("arrow")) {
        event.preventDefault();
    }
    keys[event.key.toLowerCase()] = false;
});
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
        moveForward(-moveamount * (keys["shift"] ? 2 : 1));
    }
    if (keys["s"]) {
        moveForward(moveamount * (keys["shift"] ? 2 : 1));
    }
    if (keys["d"]) {
        moveLateral(-moveamount * (keys["shift"] ? 2 : 1));
    }
    if (keys["a"]) {
        moveLateral(moveamount * (keys["shift"] ? 2 : 1));
    }
}, 1000 / framerate);
document.querySelector("body").addEventListener("", function () {

});
let maxmouse = 15;
function readmouse(event) {
    // console.log(event.movementX, event.movementY);

    lx += (event.movementX / 4).clamp(-maxmouse, maxmouse);// horizontal look
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
    if (document.pointerLockElement == viewport && !pointerlocked) {
        console.log("add pointer reader");
        pointerlocked = true;
        window.addEventListener("mousemove", readmouse, false);
    } else {
        console.log("remove pointer reader");
        pointerlocked = false;
        window.removeEventListener("mousemove", readmouse, false);
    }
});
