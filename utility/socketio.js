var socketIo = require('socket.io');
module.exports = {
    startService: function (server) {
        io = socketIo(server);
        io.on('connection', function (socket) {
            socketid= socket.id;
       socket.on('start', function (lp) { 
             console.log(lp)
           socket.broadcast.emit('newuser',"new user registered");
          
           }); 
         
         
       
           socket.on('disconnect',function(){
              console.log('disconnected');
           })
       });
        return io;
    }
};