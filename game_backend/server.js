var WebSocketServer = new require('ws');

// подключённые клиенты
var clients = {},
    locations = [
        1,2,3
    ],
    Clients = [],
    ClientsIds = [],
    Users = [],
    UsersIds = []

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({
    port: 3000
});

webSocketServer.on('connection', function(ws) {

    var id = Math.random();
    clients[id] = ws;
    console.log("новое соединение " + id);

    let location
    if (id >= 0 && id < 0.2)
        location = 1
    else if (id >= 0.2 && id <= 0.6)
        location = 2
    else
        location = 3

    let client = {
        id : id,
        ws : ws,
        location : location
    }

    if (!ClientsIds.includes(client.id)){
        ClientsIds.push(client.id)
        Clients.push(client)
    }


    ws.on('message', function(message) {
        //console.log('получено сообщение ' + message);
        let oMessage = JSON.parse(message)
        if (oMessage.user) {
            if (oMessage.user.serverId){
                if (!UsersIds.includes(oMessage.user.serverId)){
                    UsersIds.push(oMessage.user.serverId)
                    Users.push(oMessage.user)
                } else {
                    Users.filter(getUser => {
                        if(getUser.serverId == oMessage.user.serverId){
                            getUser.x = oMessage.user.x
                            getUser.y = oMessage.user.y
                            getUser.route = oMessage.user.route
                            return getUser
                        }
                    })
                }
            }
        }
        let newMessage

        for (var key in clients) {
            //newMessage = JSON.stringify({key:key, message:message})
            //client
            // s[key].send(newMessage);
        }

        for (let i=0; i<Clients.length; i++){
            let client = Clients[i]
            //if (messObj.location == client.location){
                //message['serverId']=client.id
                let mess = JSON.stringify(message)
                let users = JSON.stringify(Users)
                newMessage = JSON.stringify({key:key, serverId:client.id, message:mess, users:users})
                let wsUser = client.ws
                wsUser.send(newMessage)
            //}
        }

    });

    ws.on('close', function() {
        console.log('соединение закрыто ' + id);
        delete clients[id];
        Clients = Clients.filter(client => {
            if (client.id != id) return client
        })
        Users = Users.filter(user => {
            if (user.id != id) return user
        })
    });

});