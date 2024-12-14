const jwt = require('jsonwebtoken'); // create and verify JWTs

const JWT_SECRET = 'hYp3rS3cr3t'; // secret for JWT (change later, don't hardcode in production lol)

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', ''); // get token from Authorization header
        req.user = jwt.verify(token, JWT_SECRET); // verify token against secret
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' }); // send error if token is invalid
    }
}

module.exports = {
    auth,
    JWT_SECRET
}
