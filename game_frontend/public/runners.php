<?php
    $userId = rand(1,100);
?>
<html>
<header>
    <style>
        #canvas {
            width:100%;
            height: 500px;
        }
    </style>
    <script src="functions.js"></script>

</header>
<body>
    <div id="user_id"><?php echo $userId ?></div>
    <button onclick="setConnect()">connect</button>
    <canvas id="canvas"></canvas>
</body>
<script>
    function setConnect(){
        let prePlayer = new myCyrcle(100, 100, 50, 0)

        socket.send(
            JSON.stringify({
                command: 'createUser',
                userId: userId,
                user: prePlayer,
                location: 1
            })
        );
    }
    var socket = new WebSocket("ws://127.0.0.1:3030");
    var player,
        users = [],
        usersIds = []
    var userId = document.getElementById('user_id').innerHTML
    //console.log(userId)
    var serverId

    var serverUsers = [],
        serverUsersIds = []

    socket.onmessage = function(event) {
        let myObj = JSON.parse(event.data)
        let message = JSON.parse(myObj.message)
        message = JSON.parse(message)
        let user = message.user
        console.log(myObj)
        //console.log(user)

        if (message.command == "createUser"){
            serverId = myObj.serverId
            user.userId = Number(message.userId)
            user.serverId = myObj.serverId

            if (myObj.users){
                //console.log(myObj.users)
                let serverUsersObj = JSON.parse(myObj.users)
                serverUsersObj.filter(user => {
                    //if(!serverUsersIds.includes(user.userId) && user.serverId != serverId){
                        //serverUsersIds.push(user.id)
                        //serverUsers.push(user)
                    //}
                    if (!usersIds.includes(user.userId)){
                        usersIds.push(user.userId)
                        users.push(user)
                    }
                })
            }

            console.log('serverUsers : ')
            console.log(serverUsers)
            console.log('users : ')
            console.log(users)

            if (!usersIds.includes(user.userId)){
                usersIds.push(user.userId)
                users.push(user)
            }


            if (!player){
                users.filter(user=>{
                    if(user.userId == userId){
                        player = user
                        player.serverId = serverId
                        player.userId = Number(userId)
                    }
                })
                player = new myCyrcle(player.x, player.y, player.radius, 0)
                player.serverId = serverId
                player.userId = Number(userId)
            }
        } else if (message.command == "run"){
            users.filter(oldUser=>{
                if(oldUser.userId == message.userId){
                    oldUser.x = user.x
                    oldUser.y = user.y
                    oldUser.route = user.route
                    oldUser.serverId = serverId
                    return oldUser
                }
            })

            console.log('serverUsers : ')
            console.log(serverUsers)
            console.log('users : ')
            console.log(users)
        }


        //console.log('player: ')
        //console.log(player)


    };

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const mouse = {
        x: undefined,
        y: undefined
    };

    var pol = [{
        'x': 100,
        'y': 150
    }, {
        'x': 120,
        'y': 50
    }, {
        'x': 200,
        'y': 80
    }, {
        'x': 140,
        'y': 210
    }];

    var segments = [

        // Border
        {a:{x:0,y:0}, b:{x:640,y:0}},
        {a:{x:640,y:0}, b:{x:640,y:360}},
        {a:{x:640,y:360}, b:{x:0,y:360}},
        {a:{x:0,y:360}, b:{x:0,y:0}},

        // Polygon #1
        {a:{x:100,y:150}, b:{x:120,y:50}},
        {a:{x:120,y:50}, b:{x:200,y:80}},
        {a:{x:200,y:80}, b:{x:140,y:210}},
        {a:{x:140,y:210}, b:{x:100,y:150}},

        // Polygon #2
        {a:{x:100,y:200}, b:{x:120,y:250}},
        {a:{x:120,y:250}, b:{x:60,y:300}},
        {a:{x:60,y:300}, b:{x:100,y:200}},

        // Polygon #3
        {a:{x:200,y:260}, b:{x:220,y:150}},
        {a:{x:220,y:150}, b:{x:300,y:200}},
        {a:{x:300,y:200}, b:{x:350,y:320}},
        {a:{x:350,y:320}, b:{x:200,y:260}},

        // Polygon #4
        {a:{x:340,y:60}, b:{x:360,y:40}},
        {a:{x:360,y:40}, b:{x:370,y:70}},
        {a:{x:370,y:70}, b:{x:340,y:60}},

        // Polygon #5
        {a:{x:450,y:190}, b:{x:560,y:170}},
        {a:{x:560,y:170}, b:{x:540,y:270}},
        {a:{x:540,y:270}, b:{x:430,y:290}},
        {a:{x:430,y:290}, b:{x:450,y:190}},

        // Polygon #6
        {a:{x:400,y:95}, b:{x:580,y:50}},
        {a:{x:580,y:50}, b:{x:480,y:150}},
        {a:{x:480,y:150}, b:{x:400,y:95}}

    ]

    var myAngle = 0
    var myAngle2 = myAngle + 90

    var myUser = {
        x: 200,
        y: 100,
        vision: false
    }

    let theta;
    let theta2;

    var bullets = []

    window.addEventListener("mousemove", function (e) {
        mouse.x = e.clientX - canvas.getBoundingClientRect().left;
        mouse.y = e.clientY - canvas.getBoundingClientRect().top;
        //player.turret.targetAngle = Math.atan2(mouse.x - canvas.offsetLeft - player.posX*3/4, player.posY*3/4 + canvas.offsetTop - mouse.y);
    });

    document.onkeydown = function( e ) {
        //console.log(e.keyCode)

        if( e.keyCode == 39 ){
            //myChildren.setRoute(1)
            player.rotateToRight()
        }
        if( e.keyCode == 37 ){
            //myChildren.setRoute(1)
            player.rotateToLeft()
        }

        if (e.keyCode == 87){
            player.foward()
        }
        if (e.keyCode == 65){
            player.foleft()
        }
        if (e.keyCode == 83){
            player.foback()
        }
        if (e.keyCode == 68){
            player.foright()
        }

        if (e.keyCode == 32){
            player.fire()
        }
    }

    document.onkeyup = function( e ) {
        //console.log(e.keyCode)

        if (e.keyCode == 87){
            player.stopUp()
        }
        if (e.keyCode == 65){
            player.stopLeft()
        }
        if (e.keyCode == 83){
            player.stopBack()
        }
        if (e.keyCode == 68){
            player.stopRight()
        }

        if( e.keyCode == 39 ){
            //myChildren.setRoute(1)
            player.rotateStopRight()
        }
        if( e.keyCode == 37 ){
            //myChildren.setRoute(1)
            player.rotateStopLeft()
        }
    }

    let rand = Math.random()*100
    let obj = {}
    function draw() {
        ctx.clearRect(0,0, canvas.width, canvas.height)
        if(player) {
            player.draw()
        }
        //console.log(player)
        let myUsers = users.filter(user => {
            if (user.userId != userId){
                return user
            }
        })

        myUsers.filter(user=>{
            obj[user.userId] = new myCyrcle(user.x, user.y, user.radius, user.route)
            obj[user.userId].draw()
        })


        for(let i=0; i<bullets.length; i++){
            let bullet = bullets[i]
            if (bullet.alive){
                let radian = (Math.PI / 180) * bullet.rotation
                bullet.x += bullet.speed * Math.cos(radian)
                bullet.y += bullet.speed * Math.sin(radian)
            }
            if (bullet.x < 1 || bullet.x > 400 || pointInPolygon(bullet)){
                bullet.alive = false
            }
            if (bullet.y < 1 || bullet.y > 400){
                bullet.alive = false
            }
        }

        bullets.filter(bullet => {
            if (bullet.alive){
                ctx.beginPath();

                ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2, true);
                ctx.fillStyle = "rgb(0, 255, 0)";
                ctx.fill();
                ctx.closePath();
            }
        })

        ctx.strokeStyle = "#999";
        for(var i=0;i<segments.length;i++){
            var seg = segments[i];
            ctx.beginPath();
            ctx.moveTo(seg.a.x,seg.a.y);
            ctx.lineTo(seg.b.x,seg.b.y);
            ctx.stroke();
        }
    }

    class myBullet  {
        x = 0
        y = 0
        alive = true
        life = 0
        rotation  = 0
        speed = 2
        constructor(x, y, rotation, life){
            this.x = x
            this.y = y
            this.rotation = rotation
            this.life = life
        }
    }

    class myCyrcle {
        constructor(x, y, radius, route){
            this.x = x
            this.y = y
            this.radius = radius
            this.route = route

            this.positionA = {
                x : this.x,
                y : this.y,
                route : this.route
            }
        }
        setRoute() {
            this.route = this.route + 1
            if (this.route > 359) this.route = 0
        }

        body = []

        leftBlock = false
        rightBlock = false
        upBlock = false
        downBlock = false

        rotateLeftBlock = false
        rotateRightBlock = false

        moveLeft = false
        moveUp = false
        moveBack = false
        moveRight = false

        rotateLeft = false
        rotateRight = false

        upLeftShoulder = {
            x : this.x,
            y : this.y
        }

        upRightShoulder = {
            x : this.x,
            y : this.y
        }

        backLeftShoulder = {
            x : this.x,
            y : this.y
        }

        backRightShoulder = {
            x : this.x,
            y : this.y
        }

        bullets = []



        positionB = {
            x : this.x,
            y : this.y,
            route : this.route
        }

        rotateToRight(){
            this.rotateRight = true
        }
        rotateToLeft(){
            this.rotateLeft = true
        }


        rotateStopRight(){
            this.rotateRight = false
        }
        rotateStopLeft(){
            this.rotateLeft = false
        }

        foward(){
            this.moveUp = true
        }
        foback(){
            this.moveBack = true
        }
        foleft(){
            this.moveLeft = true
        }
        foright(){
            this.moveRight = true
        }


        stopUp(){
            this.moveUp = false
        }
        stopBack(){
            this.moveBack = false
        }
        stopLeft(){
            this.moveLeft = false
        }
        stopRight(){
            this.moveRight = false
        }

        fire(){
            let playerBullet = new myBullet(this.x, this.y, this.route, 1)
            bullets.push(playerBullet)
        }


        goUp(){
            if (!this.upBlock){
                this.y++
            }
        }
        goDown(){
            if (!this.downBlock){
                this.y--
            }
        }

        sendServer(){
            socket.send(
                JSON.stringify({
                    userId: userId,
                    rotation: this.route,
                    location: 1,
                    command: 'run',
                    serverId: serverId,
                    user: player,
                })
            );
        }

        draw() {

            let angleUpLeftShoulder = (this.route-60) * Math.PI/180;
            let angleUpRightShoulder = (this.route+60) * Math.PI/180;
            let angleBackLeftShoulder = (this.route-120) * Math.PI/180;
            let angleBackRightShoulder = (this.route+120) * Math.PI/180;

            let controlXUpLeftShoulder = (this.x) + Math.cos(angleUpLeftShoulder) * 30
            let controlYUpLeftShoulder = (this.y) + Math.sin(angleUpLeftShoulder) * 30
            let controlXBackLeftShoulder = (this.x) + Math.cos(angleBackLeftShoulder) * 30
            let controlYBackLeftShoulder = (this.y) + Math.sin(angleBackLeftShoulder) * 30

            let controlXUpRightShoulder = (this.x) + Math.cos(angleUpRightShoulder) * 30
            let controlYUpRightShoulder = this.y + Math.sin(angleUpRightShoulder) * 30
            let controlXBackRightShoulder = (this.x) + Math.cos(angleBackRightShoulder) * 30
            let controlYBackRightShoulder = this.y + Math.sin(angleBackRightShoulder) * 30

            this.upLeftShoulder = {
                x : controlXUpLeftShoulder,
                y : controlYUpLeftShoulder
            }

            this.upRightShoulder = {
                x : controlXUpRightShoulder,
                y : controlYUpRightShoulder
            }

            this.backLeftShoulder = {
                x : controlXBackLeftShoulder,
                y : controlYBackLeftShoulder
            }

            this.backRightShoulder = {
                x : controlXBackRightShoulder,
                y : controlYBackRightShoulder
            }

            this.body = [
                this.upLeftShoulder,
                this.backLeftShoulder,
                this.backRightShoulder,
                this.upRightShoulder
            ]

            if (this.rotateLeft){
                this.route = this.route - 1
                if (this.route < 0) this.route = 359
            }
            if (this.rotateRight){
                this.route = this.route + 1
                if (this.route > 359) this.route = 0
            }


            if (this.moveUp){

                let block = false
                segments.filter(segment => {
                    if (pointInBody(segment.a,this.body) == 1)
                        block = true
                })

                let myLeft = {x: controlXBackLeftShoulder, y: controlYBackLeftShoulder}
                let myRight = {x: controlXBackRightShoulder, y: controlYBackRightShoulder}

                if (
                    !pointInPolygon(this.upRightShoulder) &&
                    !pointInPolygon(this.upLeftShoulder) &&
                    !block
                ){
                    let radians = (( Math.PI / 180) * this.route)
                    this.x +=  1 * Math.cos(radians)
                    this.y += 1 * Math.sin(radians)
                }
            }
            if (this.moveLeft){
                let radians = (( Math.PI / 180) * (this.route - 90) )
                this.x +=  1 * Math.cos(radians)
                this.y += 1 * Math.sin(radians)
            }
            if (this.moveBack){
                let radians = (( Math.PI / 180) * this.route)
                this.x -=  1 * Math.cos(radians)
                this.y -= 1 * Math.sin(radians)
            }
            if (this.moveRight){
                let radians = (( Math.PI / 180) * (this.route - 90) )
                this.x -=  1 * Math.cos(radians)
                this.y -= 1 * Math.sin(radians)
            }

            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;

            let angle = this.route * Math.PI/180;

            let route2 = this.route + 30
            if (route2 > 389){
                route2 = 0
            }
            let angle2 = route2 * Math.PI/180;

            //рисуем круг
            //ctx.beginPath();
            //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            //ctx.fillStyle = "rgb(255, 255, 240)";
            //ctx.fill();
            //ctx.closePath();


            //рисуем линию направления
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.beginPath();
            ctx.moveTo(this.x,this.y);
            let controlX = this.x + Math.cos(angle)*this.radius
            let controlY = this.y + Math.sin(angle)*this.radius
            ctx.lineTo(controlX, controlY);
            ctx.stroke();

            //исуем вторую линию направления
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.beginPath();
            ctx.moveTo(this.x,this.y);
            let controlX3 = this.x + Math.cos(angle2)*this.radius
            let controlY3 = this.y + Math.sin(angle2)*this.radius
            ctx.lineTo(controlX3, controlY3);
            ctx.stroke();

            theta = Math.atan2(dy, dx);

            let radian = theta * 180 / Math.PI
            if (radian <= 0){
                let plus = radian * -1
                let minus = 360 - plus
                radian = minus
            }

            let border2 = route2
            if (border2 > 360){
                border2 = border2 - 360
            }

            let cos = Math.cos(theta),
                sin = Math.sin(theta)
            let controlX2 = this.x
            let controlY2 = this.y
            if ((radian < route2 && radian > this.route) || (radian < border2 && radian < this.route && route2 > 360)){
                ctx.fillStyle = "rgb(0, 0, 0)";
                ctx.beginPath();
                ctx.moveTo(this.x,this.y);
                controlX2 = this.x + cos * this.radius ;
                controlY2 = this.y + sin * this.radius ;
                ctx.lineTo(controlX2, controlY2);
                ctx.stroke();
            }

            //рисуем Юзверя
            ctx.beginPath();
            ctx.arc(myUser.x, myUser.y, 10, 0, Math.PI * 2, true);

            if (myUser.visible)
                ctx.fillStyle = "rgb(0, 0, 0)";
            else
                ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
            ctx.fill();
            ctx.closePath();


            let itemPointOne = {x: controlX3, y: controlY3}
            let itemPointTwo = {x: controlX, y:controlY}

            // 50 RAYS IN ALL DIRECTIONS
            var intersects = [];
            var myLines = [];

            for(var angleMass=this.route; angleMass < border2; angleMass+=10){

                // Calculate dx & dy from angle
                angle = angleMass * Math.PI/180;

                var dxMass = Math.cos(angle);
                var dyMass = Math.sin(angle);

                // Ray from center of screen to mouse
                var ray = {
                    a:{x:this.x, y:this.y},
                    b:{x:this.x + dxMass, y:this.y + dyMass}
                };

                // Find CLOSEST intersection
                var closestIntersect = null;
                for(var i=0; i<segments.length; i++){
                    var intersect = getIntersection(ray,segments[i], this.radius);
                    if(!intersect) continue;
                    if(!closestIntersect || intersect.param<closestIntersect.param){
                        intersect.Angle = angle
                        closestIntersect=intersect;
                    }
                }
                myLines.push(closestIntersect);
            }

            // DRAW ALL RAYS
            ctx.strokeStyle = "#dd3838";
            ctx.fillStyle = "#dd3838";



            for(var i=0;i<intersects.length;i++){
                var intersect = intersects[i];
                // Draw red laser
                ctx.beginPath();
                ctx.moveTo(this.x,this.y);
                ctx.lineTo(intersect.x,intersect.y);
                ctx.stroke();
            }



            // Get all unique points
            var points = (function(segments){
                var a = [];
                segments.forEach(function(seg){
                    a.push(seg.a,seg.b);
                });
                return a;
            })(segments);

            let THis = this

            var uniquePoints = (function(points){
                var set = {};
                return points.filter(function(p){
                    var key = p.x+","+p.y;
                    if(key in set){
                        return false;
                    }else{
                        set[key]=true;
                        return true;
                    }
                });
            })(points);

            // Get all angles
            var uniqueAngles = [];

            uniquePoints.push({
                start: 'one',
                x: controlX,
                y: controlY,
                Angle: Math.atan2(controlY+1,controlX+1)
            })

            uniquePoints.push({
                start : 'two',
                x: controlX3,
                y: controlY3,
                Angle: Math.atan2(controlY3,controlX3)
            })

            myLines.filter(myLine => {
                if (!uniquePoints.includes(myLine))
                    uniquePoints.push(myLine)
            })

            //test collision
            let leftBorder = {x:controlX, y:controlY}
            let rightBorder = {x:controlX3, y:controlY3}
            segments.filter(segment => {

                let newLine = myCollision(leftBorder, rightBorder, segment)
                if (newLine){
                    let newAngle = Math.atan2(newLine.y-this.y,newLine.x-this.x)
                    newLine.Angle=newAngle
                    uniquePoints.push(newLine)
                }
            })

            var reverse = false
            for(var j=0;j<uniquePoints.length;j++){

                var uniquePoint = uniquePoints[j];
                var Angle = Math.atan2(uniquePoint.y-this.y,uniquePoint.x-this.x);
                uniquePoint.Angle = Angle;

                let testAngle = (Math.atan2(uniquePoint.y-this.y,uniquePoint.x-this.x)) * 180 / Math.PI
                if (testAngle < 0){
                    let plus = testAngle * -1
                    let minus = 359 - plus
                    testAngle = minus
                }
                let testBorder1 = (Math.atan2(controlY-this.y,controlX-this.x)) * 180 / Math.PI
                if (testBorder1 < 0){
                    let plus = testBorder1 * -1
                    let minus = 359 - plus
                    testBorder1 = minus
                }
                let testBorder2 = (Math.atan2(controlY3-this.y,controlX3-this.x)) * 180 / Math.PI
                if (testBorder2 < 0){
                    let plus = testBorder2 * -1
                    let minus = 359 - plus
                    testBorder2 = minus
                }
                if (testAngle < testBorder2){
                    //uniqueAngles.push(Angle-0.00001,Angle,Angle+0.00001);
                    //uniqueAngles.push(Math.atan2(controlY-this.y,controlX-this.x)-0.00001,Math.atan2(controlY-this.y,controlX-this.x),Math.atan2(controlY-this.y,controlX-this.x)+0.00001);
                    //uniqueAngles.push(Math.atan2(controlY3-this.y,controlX3-this.x)-0.00001,Math.atan2(controlY3-this.y,controlX3-this.x),Math.atan2(controlY3-this.y,controlX3-this.x)+0.00001);
                }
                if (testAngle >= testBorder1 && testAngle >= testBorder2){
                    //uniqueAngles.push(Angle-0.00001,Angle,Angle+0.00001);
                    //uniqueAngles.push(Math.atan2(controlY-this.y,controlX-this.x)-0.00001,Math.atan2(controlY-this.y,controlX-this.x),Math.atan2(controlY-this.y,controlX-this.x)+0.00001);
                    //uniqueAngles.push(Math.atan2(controlY3-this.y,controlX3-this.x)-0.00001,Math.atan2(controlY3-this.y,controlX3-this.x),Math.atan2(controlY3-this.y,controlX3-this.x)+0.00001);
                }


                uniqueAngles.push(Angle-0.00001,Angle,Angle+0.00001);

                if (
                    Angle >= Math.atan2(controlY-this.y,controlX-this.x)
                )
                {
                    //uniqueAngles.push(Angle-0.00001,Angle,Angle+0.00001);
                } else if (
                    Angle <= Math.atan2(controlY3-this.y,controlX3-this.x)
                    && Math.atan2(controlY3-this.y,controlX3-this.x) < 0
                ){
                    //uniqueAngles.push(Angle-0.00001,Angle,Angle+0.00001);
                }

                if 	(
                    ((Angle >= Math.atan2(controlY-this.y,controlX-this.x))
                        && Angle <= Math.atan2(controlY3-this.y,controlX3-this.x))
                )
                {
                    //uniqueAngles.push(Angle-0.00001,Angle,Angle+0.00001);
                    reverse = false
                }
                if (
                    ((Angle <= Math.atan2(controlY-this.y,controlX-this.x)) &&
                        Angle >= Math.atan2(controlY3-this.y,controlX3-this.x)) /*&&
						uniquePoint.start*/
                )
                {
                    reverse = true
                }
            }

            // RAYS IN ALL DIRECTIONS
            myLines.filter(myLine => {
                //uniqueAngles.push(myLine.Angle-0.00001,myLine.Angle,myLine.Angle+0.00001)
            })




            for(var j=0;j<uniqueAngles.length;j++){
                var Angle = uniqueAngles[j];

                // Calculate dx & dy from angle
                var dX = Math.cos(Angle);
                var dY = Math.sin(Angle);

                let borderLeftDX = Math.cos(Math.atan2(controlY-this.y,controlX-this.x))
                let borderLeftDY = Math.sin(Math.atan2(controlY-this.y,controlX-this.x))
                let borderRightDX = Math.cos(Math.atan2(controlY3-this.y,controlX3-this.x))
                let borderRightDY = Math.sin(Math.atan2(controlY3-this.y,controlX3-this.x))

                // Ray from center of screen to mouse
                var ray = {
                    a:{x:this.x,y:this.y},
                    b:{x:this.x+dX,y:this.y+dY}
                };

                // Find CLOSEST intersection
                var closestIntersect = null;
                for(var i=0; i<segments.length; i++){
                    var intersect = getIntersection(ray,segments[i], this.radius);
                    if(!intersect) continue;
                    if(!closestIntersect || intersect.param<closestIntersect.param){
                        closestIntersect=intersect;
                    }
                }

                // Intersect angle
                if(!closestIntersect) continue;
                closestIntersect.Angle = Angle;



                // Add to list of intersects
                intersects.push(closestIntersect);
            }

            let mainIntersects = intersects.sort(function(a,b){
                return a.Angle-b.Angle;
            });

            // DRAW AS A GIANT POLYGON
            ctx.fillStyle = "rgba(0,0,250,0.2)";

            itemPointOne = {x: controlX3, y: controlY3}
            itemPointTwo = {x: controlX, y:controlY}

            ctx.fill();

            let borderRight = Math.atan2(controlY3 - this.y, controlX3-this.x),
                borderLeft = Math.atan2(controlY - this.y, controlX-this.x)

            let controlPoint = [],
                redPoint = [],
                greenPoint = []

            if (!reverse){
                ctx.beginPath();
                ctx.moveTo(this.x,this.y);
            }
            myUser.visible = false

            for(var i=0;i<mainIntersects.length;i++){
                var intersect = mainIntersects[i];

                if (reverse)
                    ctx.beginPath();

                if (borderRight <= 0 && borderLeft >= 0){
                    if ( intersect.Angle >= 0 &&
                        borderLeft >=0 &&
                        intersect.Angle >= borderLeft /*&&
						intersect.Angle <= borderRight*/
                    ){
                        //ctx.strokeStyle = "#f00";
                        ctx.moveTo(this.x,this.y);
                        ctx.lineTo(intersect.x,intersect.y);
                        ctx.stroke();

                        let newIntersect = {}
                        newIntersect.x = intersect.x
                        newIntersect.y = intersect.y
                        newIntersect.angle = intersect.Angle
                        newIntersect.color = "red"
                        controlPoint.push(newIntersect)
                        redPoint.push(intersect)

                        if (i>0){
                            let itemPointOne = {x:  mainIntersects[i-1].x, y:  mainIntersects[i-1].y}
                            let itemPointTwo = {x:  mainIntersects[i].x, y: mainIntersects[i].y}
                            if (detectVision(this, itemPointOne, itemPointTwo, myUser, this.radius)){
                                myUser.visible = true
                            }
                        }

                    } else if (
                        intersect.Angle <= 0 &&
                        borderRight <= 0 &&
                        intersect.Angle <= borderRight
                    ){

                        //ctx.strokeStyle = "#0f0";
                        ctx.moveTo(this.x,this.y);
                        ctx.lineTo(intersect.x,intersect.y);
                        ctx.stroke();

                        let newIntersect = {}
                        newIntersect.x = intersect.x
                        newIntersect.y = intersect.y
                        newIntersect.angle = intersect.Angle
                        newIntersect.color = "green"
                        controlPoint.push(newIntersect)
                        greenPoint.push(intersect)

                        if (i>0){
                            let itemPointOne = {x:  mainIntersects[i-1].x, y:  mainIntersects[i-1].y}
                            let itemPointTwo = {x:  mainIntersects[i].x, y: mainIntersects[i].y}
                            if (detectVision(this, itemPointOne, itemPointTwo, myUser, this.radius)){
                                myUser.visible = true
                            }
                        }
                    }
                } else {
                    if (
                        intersect.Angle >= borderLeft &&
                        intersect.Angle <= borderRight
                    )
                    {
                        ctx.lineTo(intersect.x,intersect.y);
                        if (i>0){
                            let itemPointOne = {x:  mainIntersects[i-1].x, y:  mainIntersects[i-1].y}
                            let itemPointTwo = {x:  mainIntersects[i].x, y: mainIntersects[i].y}
                            if (detectVision(this, itemPointOne, itemPointTwo, myUser, mainIntersects[i].param)){
                                myUser.visible = true
                            }
                        }
                    } else {

                    }
                }

                //}

            }
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(this.x,this.y);

            if (redPoint.length > 2){
                for(var i=0;i<redPoint.length;i++){
                    let intersect = redPoint[i];
                    ctx.lineTo(intersect.x,intersect.y);
                }
            }
            else if (redPoint.length==2){
                ctx.lineTo(redPoint[0].x,redPoint[0].y);
            }

            if (greenPoint.length > 2){
                for(var i=0;i<greenPoint.length;i++){
                    let intersect = greenPoint[i];
                    ctx.lineTo(intersect.x,intersect.y);
                }

            } else if (greenPoint.length==2){
                ctx.lineTo(greenPoint[0].x,greenPoint[0].y);
            }

            ctx.fill();
            ctx.closePath();

            // рисуем плечи

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.upLeftShoulder.x, this.upLeftShoulder.y);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.upRightShoulder.x, this.upRightShoulder.y);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.backLeftShoulder.x, this.backLeftShoulder.y);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.backRightShoulder.x, this.backRightShoulder.y);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(this.upLeftShoulder.x, this.upLeftShoulder.y);
            ctx.lineTo(this.backLeftShoulder.x, this.backLeftShoulder.y);
            ctx.lineTo(this.backRightShoulder.x, this.backRightShoulder.y);
            ctx.lineTo(this.upRightShoulder.x, this.upRightShoulder.y);
            ctx.closePath();
            ctx.stroke();

            this.positionB = {
                x : this.x,
                y : this.y,
                route : this.route
            }

            let stringPositionA = JSON.stringify(this.positionA)
            let stringPositionB = JSON.stringify(this.positionB)
            //console.log(stringPositionA + ' : ' + stringPositionB)
            if (stringPositionA !== stringPositionB){
                this.sendServer()
                console.log('go to server')
                this.positionA = {
                    x : this.x,
                    y : this.y,
                    route : this.route
                }
            }
        }
    }

    //let myChildren = new myCyrcle(100, 100, 50, 0)
    setInterval(() => {
        //animate(myChildren)
        draw()
    }, 20);

    //init(myChildren);

</script>
</html>
