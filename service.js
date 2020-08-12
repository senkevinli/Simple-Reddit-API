const Koa = require('koa');

class Service{
    constructor(userInfo, interval){
        this._r = new Snoowrap({
            userAgent: userInfo.botName,
            clientId: userInfo.clientId,
            clientSecret: userInfo.clientSecret,
            username: userInfo.redditUser,
            password: userInfo.redditPass
        });
    }
}