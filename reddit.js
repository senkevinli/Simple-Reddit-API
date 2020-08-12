const Snoowrap = require('snoowrap');
const { RedditStream } = require('./utility');

class RedditAgent {
    constructor(userInfo){
        this._r = new Snoowrap({
            userAgent: userInfo.botName,
            clientId: userInfo.clientId,
            clientSecret: userInfo.clientSecret,
            username: userInfo.redditUser,
            password: userInfo.redditPass
        });
        this._newPostInterval = null;
    }
    async getHot(){
       return await this._r.getHot();
    }
    async makePost(post){
        // parameters: subredditname, title, text 
        return await (this._r.submitSelfpost(post).id);
    }
    async getPost(postId){
        return await (await this._r.getSubmission(postId).fetch());
    }
    startNewPosts(subName, interval=2000){
        let postStream = new RedditStream(this._r.getNew.bind(this._r), interval);
        postStream.startIntervalTask();

        let newPosts = [];
        postStream.on('new', (res) => {
            res.forEach((item) => console.log(item));
        }); 
    }
}

module.exports = { RedditAgent };