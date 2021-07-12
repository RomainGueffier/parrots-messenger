/** Server to dispatch messages from parrots app */
const Redis = require('redis')
const io = require('socket.io')(80, {
    cors: {
        origin: "*"
    }
})

// database contains all messages not yet retrieved
const redis = Redis.createClient()
// default cache expiration to 24h
const redis_expiration = 3600*24
const connectedClients = []

io.on('connection', socket => {

    const id = socket.handshake.query.id
    // create room with id user value
    socket.join(id)
    // add id to connected clients list
    connectedClients[id] = true

    // send message event
    socket.on('send-message', ({ recipients, text }) => {
        recipients.forEach(recipient => {

            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id)

            // save message emitted
            storeMessage(recipient, newRecipients, id, text)
            
            // then send it to every connected client/user
            if (recipient in connectedClients && connectedClients[recipient] === true) {
                console.log(recipient + ' is retrieving his stored messages')
                broadcastMessages(recipient)
            }
        })
    })

    /**
     * Retrieve messages per id (recipient)
     * @param {string} recipient
     */
    const broadcastMessages = (recipient) => {
        // read database messages of user/ recipient
        // reverse to get old message first in history copy
        console.log(`${recipient} is retrieving messages from redis`)
        redis.lrange(recipient, 0, -1, (error, response) => {

            if (error) {
                console.log(error)
                return
            }

            const messages = response != null ? response : []
            // if messages stored, then parse from redis to serve on socket.io
            if (messages) {
                // Reverse to get older messages first
                messages.reverse().forEach((data) => {
                    const message = JSON.parse(data)
                    // send to user every messages stored in database for him
                    console.log(recipient, message)
                    socket.to(recipient).emit('receive-message', message)
                })
                // clear database after sending all messages
                redis.del(recipient)
            }
        })
        
    }

    /**
     * Store in Redis cache db
     * @param {Integer} recipient 
     * @param {Array} recipients 
     * @param {Integer} sender 
     * @param {String} text 
     */
    const storeMessage = (recipient, recipients, sender, text) => {
        // we push left the more recent messages
        data = JSON.stringify({
            recipients: recipients,
            sender: sender,
            text: text
        })
        console.log(`${sender} is writing messages to ${recipient} in redis`)
        redis.lpush(recipient, data, function(error, response) {
            if (error) console.log(error)
        })
    }

    // notification in chat when a user has left
    socket.on("disconnecting", (reason) => {
        console.log(id + ' is disconnected')
        // set id to false in connected clients list
        connectedClients[id] = false
        for (const room of socket.rooms) {
            socket.to(room).emit("leave-notification", socket.id)
        }
    })

    // notification when user enter chat
    for (const room of socket.rooms) {
        socket.to(room).emit("enter-notification", socket.id)
    }

    console.log(id + ' is connected')
    if (redis.exists(id)) {
        broadcastMessages(id)
    }

})