const Snoowrap = require('snoowrap');
const { RedditStream } = require('./reddit-stream');
/**
 * Wrapper class for snoowrap functions.
 * 
 * Can get make posts and get posts based on ID. Can get most popular (hot) posts
 * on specified subreddit. Once replies started, whenever, the bot is mentioned by name
 * it will reply to the comment with a specified message.
 */
class RedditAgent {
    /**
     * Create a new Reddit agent
     * 
     * @param {Object} userInfo 
     */
    constructor(userInfo){
        this._r = new Snoowrap({
            userAgent: userInfo.botName,
            clientId: userInfo.clientId,
            clientSecret: userInfo.clientSecret,
            username: userInfo.redditUser,
            password: userInfo.redditPass
        });
        this._inboxStream = null;
        this._message = `Hello I am ${userInfo.botName}!`;
    }
    /**
     * Returns Snoowrap Listing of 'hot' posts on specified subreddit
     * 
     * @param {string} subreddit 
     * @param {Object} options - can specify limit here
     */
    async getHot(subreddit='all', options={}){
       return await this._r.getHot(subreddit, options);
    }

    /**
     * Makes a self post and returns the ID (6 digit alphanumeric)
     * 
     * @param {Object} post - must include subredditName {string}, title{string}
     * optional properties include: text {string}, sendReplies {boolean}, captchaIden{string},
     * captchaResponse{btring} 
     */
    async makePost(post){
        return await (this._r.submitSelfpost(post).id);
    }
    /**
     * Returns a Snoowrap fetched Submission of post with specified ID
     * 
     * @param {number} postId - 6 digit alphanumeric
     */
    async getPost(postId){
        return await (await this._r.getSubmission(postId).fetch());
    }

    /**
     * Everytime username is mentioned, will send a reply with currently specified message.
     * 
     * @param {number} interval - ms between to poll, minimum Reddit rate limit is 2s 
     */
    startReplies(interval=2000){
        const inboxStream = new RedditStream(this._r.getUnreadMessages.bind(this._r), interval);
        this._inboxStream = inboxStream;
        inboxStream.on('new',async (res) => {
            try{
                for (let message of res){
                if (message.type == 'username_mention'){
                        await message.reply(this._message);
                        console.log(`Replied to ${message.id} from ${message.author.name}!`);
                    }
                }
                await this._r.markMessagesAsRead(res);
            } catch(e){
                console.log(e);
                console.log('terminating replies')
                this.stopReplies();
            }
        });

        inboxStream.once('error', e => {
            console.log(e);
            console.log('terminating replies')
            this.stopReplies();
        })
        inboxStream.startIntervalTask();
    }

    //stopping replies
    stopReplies(){
        if (this._inboxStream){
            this._inboxStream.stopIntervalTask();
            this._inboxStream = null;
            
        }
    }

    // changing message 
    changeMessage(newMessage){
        this._message = newMessage;
    }

}

module.exports = { RedditAgent };