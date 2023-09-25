<?php
    echo "Ok";
?>
<form name="publish">
    <input type="text" name="message">
    <input type="submit" value="Отправить">
</form>

<!-- здесь будут появляться входящие сообщения -->
<div id="subscribe"></div>
<script src="https://cdn.socket.io/4.5.0/socket.io.min.js" integrity="sha384-7EyYLQZgWBi67fBtVxw60/OWl1kjsfrPFcaU0pp0nAh+i8FD068QogUvg85Ewy1k" crossorigin="anonymous"></script>
</script>
<script>
    // создать подключение
    var socket = new WebSocket("ws://127.0.0.1:3030");

    // отправить сообщение из формы publish
    document.forms.publish.onsubmit = function() {
        var outgoingMessage = this.message.value;

        socket.send(outgoingMessage);
        return false;
    };

    // обработчик входящих сообщений
    socket.onmessage = function(event) {
        var incomingMessage = event.data;
        console.log(event.data)
        let myObj = JSON.parse(event.data)
        console.log(myObj)
        showMessage(myObj.message);
    };

    // показать сообщение в div#subscribe
    function showMessage(message) {
        var messageElem = document.createElement('div');
        messageElem.appendChild(document.createTextNode(message));
        document.getElementById('subscribe').appendChild(messageElem);
    }

</script>
