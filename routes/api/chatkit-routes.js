const Chatkit = require('pusher-chatkit-server')

const chatkit = new Chatkit.default({
    instanceLocator: "v1:us1:bf8def9e-a084-4d5d-b55c-018e22b58449",
    key: "e4ca655d-422d-4c06-852f-3ead9e2cd075:INafeTcxNJXMZ1VD7nkxQOLTmPnhfizwRZtcrhKjt0w=" ,
    url: `https://us1.pusherplatform.io/services/chatkit_token_provider/v1/bf8def9e-a084-4d5d-b55c-018e22b58449/token`
  })

module.exports = function(router) {

    router.post('/chat/users', (req, res) => {
        const { username } = req.body
        chatkit
        .createUser({
            id: username,
            name: username
        })
        .then(() => res.sendStatus(201))
        .catch(error => {
            if (error.error === 'services/chatkit/user_already_exists') {
            res.sendStatus(200)
            } else {
            res.status(error.status).json(error)
            }
        })
    })
    
    router.post('/chat/authenticate', (req, res) => {
        const authData = chatkit.authenticate({ userId: req.query.user_id })
        res.status(authData.status).send(authData.body)
    })

};

