function drawMyLine(x,y,angleDeg,length){//Угол в градусах
    var angle = angleDeg * Math.PI/180;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x + Math.cos(angle)*length, y + Math.sin(angle)*length);
    ctx.stroke();
}

function myCollision(leftBorder, rightBorder, segment){
    // x1 - leftBorder.x
    // x2 - rightBorder.x
    // x3 - segment.a.x
    // x4 - segment.b.x
    let x=((leftBorder.x*rightBorder.y-leftBorder.y*rightBorder.x)*(segment.a.x-segment.b.x)-(leftBorder.x-rightBorder.x)*(segment.a.x*segment.b.y-segment.a.y*segment.b.x))/((leftBorder.x-rightBorder.x)*(segment.a.y-segment.b.y)-(leftBorder.y-rightBorder.y)*(segment.a.x-segment.b.x));
    let y=((leftBorder.x*rightBorder.y-leftBorder.y*rightBorder.x)*(segment.a.y-segment.b.y)-(leftBorder.y-rightBorder.y)*(segment.a.x*segment.b.y-segment.a.y*segment.b.x))/((leftBorder.x-rightBorder.x)*(segment.a.y-segment.b.y)-(leftBorder.y-rightBorder.y)*(segment.a.x-segment.b.x));
    if (isNaN(x)||isNaN(y)) {
        return false;
    } else {
        if (leftBorder.x>=rightBorder.x) {
            if (!(rightBorder.x<=x&&x<=leftBorder.x)) {return false;}
        } else {
            if (!(leftBorder.x<=x&&x<=rightBorder.x)) {return false;}
        }
        if (leftBorder.y>=rightBorder.y) {
            if (!(rightBorder.y<=y&&y<=leftBorder.y)) {return false;}
        } else {
            if (!(leftBorder.y<=y&&y<=rightBorder.y)) {return false;}
        }
        if (segment.a.x>=segment.b.x) {
            if (!(segment.b.x<=x&&x<=segment.a.x)) {return false;}
        } else {
            if (!(segment.a.x<=x&&x<=segment.b.x)) {return false;}
        }
        if (segment.a.y>=segment.b.y) {
            if (!(segment.b.y<=y&&y<=segment.a.y)) {return false;}
        } else {
            if (!(segment.a.y<=y&&y<=segment.b.y)) {return false;}
        }
    }
    //return true;
    let result = {
        x: x,
        y: y
    }
    return result
}

function getIntersection(ray, segment, length){

    // RAY in parametric: Point + Direction*T1
    var r_px = ray.a.x;
    var r_py = ray.a.y;
    var r_dx = ray.b.x-ray.a.x;
    var r_dy = ray.b.y-ray.a.y;

    var s_px = segment.a.x;
    var s_py = segment.a.y;
    var s_dx = segment.b.x-segment.a.x;
    var s_dy = segment.b.y-segment.a.y;

    // Are they parallel? If so, no intersect
    var r_mag = Math.sqrt(r_dx*r_dx+r_dy*r_dy);
    var s_mag = Math.sqrt(s_dx*s_dx+s_dy*s_dy);
    if(r_dx/r_mag==s_dx/s_mag && r_dy/r_mag==s_dy/s_mag){ // Directions are the same.
        return null;
    }

    var T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx);
    var T1 = (s_px+s_dx*T2-r_px)/r_dx;


    // Must be within parametic whatevers for RAY/SEGMENT
    if(T1<0) return null;
    if(T2<0 || T2>1) return null;

    if (T1 > length) T1 = length



    let myX = r_px+r_dx*(T1)
    let myY = r_py+r_dy*(T1)

    let dx = r_dx;
    let dy = r_dy;
    let theta = Math.atan2(dy, dx);


    let cos = Math.cos(theta);
    let sin = Math.sin(theta);

    let newX = r_px + cos * length ;
    let newY = r_py + sin * length ;




    /*if (myX > newX && myY > newY) {
        myX = newX
        myY = newY
    }*/
    //if(myY > newY) myY = newY

    let start
    if (segment.start) start=segment.start

    return {
        x: myX,
        y: myY,
        start: start,
        //x: newX,
        //y: newY,
        param: T1
    };
}

function detectVision(player, itemPoint1, itemPoint2, enemy, length){
    let x1 = itemPoint1.x - player.x
    let	y1 = itemPoint1.y - player.y
    let	x2 = itemPoint2.x - player.x
    let	y2 = itemPoint2.y - player.y
    let	xa = enemy.x - player.x
    let	ya = enemy.y - player.y

    let	s12 = Math.sign(x1 * y2 - y1 * x2)
    let	s1a = Math.sign(x1 * ya - y1 * xa)
    let	sa2 = Math.sign(xa * y2 - ya * x2)

    if (Math.sqrt(Math.pow(player.x - enemy.x,2) + Math.pow(player.y - enemy.y,2)) <= length) {
        //console.log('nice')
        if (s12 == s1a && s1a == sa2 ){
            /*console.log('----')
            console.log(s12)
            console.log(s1a)
            console.log(sa2)*/
            //console.log('super')
            return enemy
        }
    }
}

function rayCollision(ray, segment){

    // RAY in parametric: Point + Direction*T1
    var r_px = ray.a.x;
    var r_py = ray.a.y;
    var r_dx = ray.b.x-ray.a.x;
    var r_dy = ray.b.y-ray.a.y;

    var s_px = segment.a.x;
    var s_py = segment.a.y;
    var s_dx = segment.b.x-segment.a.x;
    var s_dy = segment.b.y-segment.a.y;

    // Are they parallel? If so, no intersect
    var r_mag = Math.sqrt(r_dx*r_dx+r_dy*r_dy);
    var s_mag = Math.sqrt(s_dx*s_dx+s_dy*s_dy);
    if(r_dx/r_mag==s_dx/s_mag && r_dy/r_mag==s_dy/s_mag){ // Directions are the same.
        return null;
    }

    var T2 = (r_dx*(s_py-r_py) + r_dy*(r_px-s_px))/(s_dx*r_dy - s_dy*r_dx);
    var T1 = (s_px+s_dx*T2-r_px)/r_dx;


    // Must be within parametic whatevers for RAY/SEGMENT
    if(T1<0) return null;
    if(T2<0 || T2>1) return null;

    let myX = r_px+r_dx*(T1)
    let myY = r_py+r_dy*(T1)

    let x1 = segment.a.x,
        y1 = segment.a.y,
        x2 = segment.b.x,
        y2 = segment.b.y,
        x3 = ray.a.x,
        y3 = ray.a.y,
        dx1 = x2 - x1,
        dy1 = y2 - y1,
        dx = x3 - x1,
        dy = y3 - y1,
        s = dx1 * dy - dx * dy1

    let test = s

    return {
        x: myX,
        y: myY,
        param: T1,
        test: s
    };
}

// проверяем расположение точки (слева от вектора, справа от вектора, или принадлежит вектору)
function classify(vector, x1, y1) {
    var pr = (vector.x2 - vector.x1) * (y1 - vector.y1) - (vector.y2 - vector.y1) * (x1 - vector.x1);
    if (pr > 0)
        return 1;
    if (pr < 0)
        return -1;
    return 0;
}

// классифицируем ребро (Касается, пересекает или безразлично)
function edgeType(vector, a) {
    switch (classify(vector, a.x, a.y)) {
        case 1:
            return ( (vector.y1 < a.y) && (a.y <= vector.y2) ) ? 1 : 2;
            break;
        case -1:
            return ((vector.y2 < a.y) && (a.y <= vector.y1)) ? 1 : 2;
            break;
        case 0:
            return 0;
            break;
    }
}

function pointInPolygon(player) {
    parity = 0;
    for (var i = 0; i < pol.length - 1; i++) {
        v = {
            'x1': pol[i].x,
            'y1': pol[i].y,
            'x2': pol[i + 1].x,
            'y2': pol[i + 1].y
        }
        switch (edgeType(v, player)) {
            case 0:
                return 2;
                break;
            case 1:
                parity = 1 - parity;
                break;
        }
    }
    v = {
        'x1': pol[pol.length - 1].x,
        'y1': pol[pol.length - 1].y,
        'x2': pol[0].x,
        'y2': pol[0].y
    }
    switch (edgeType(v, player)) {
        case 0:
            return 2;
            break;
        case 1:
            parity = 1 - parity;
            break;
    }
    return parity;
}

const TWO_PI = 2 * Math.PI;
function normalizeRot(rot) {// converts angle to its equivalent from interval [-pi; pi]
    return rot - TWO_PI * Math.floor((rot + Math.PI) / TWO_PI);
}

function doSmth(a) {
    for (var q=1, i=1; q<a.length; ++q) {
        if (a[q] !== a[q-1]) {
            a[i++] = a[q];
        }
    }

    a.length = i;
    return a;
}


function pointInBody(item, body) {
    let parity = 0;
    let pol = body
    for (let i = 0; i < pol.length - 1; i++) {
        v = {
            'x1': pol[i].x,
            'y1': pol[i].y,
            'x2': pol[i + 1].x,
            'y2': pol[i + 1].y
        }
        switch (edgeType(v, item)) {
            case 0:
                return 2;
                break;
            case 1:
                parity = 1 - parity;
                break;
        }
    }
    v = {
        'x1': pol[pol.length - 1].x,
        'y1': pol[pol.length - 1].y,
        'x2': pol[0].x,
        'y2': pol[0].y
    }
    switch (edgeType(v, item)) {
        case 0:
            return 2;
            break;
        case 1:
            parity = 1 - parity;
            break;
    }
    return parity;
}


function normalizeRot(rot) {// converts angle to its equivalent from interval [-pi; pi]
    const TWO_PI = 2 * Math.PI;
    return rot - TWO_PI * Math.floor((rot + Math.PI) / TWO_PI);
}

function doSmth(a) {
    for (var q=1, i=1; q<a.length; ++q) {
        if (a[q] !== a[q-1]) {
            a[i++] = a[q];
        }
    }

    a.length = i;
    return a;
}

var drawing = function (my) {
    "use strict";
    my.draw()

};

function init(my) {
    my.draw()
}

function animate(my) {
    drawing(my)
}