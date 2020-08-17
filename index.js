const Koa = require("koa");
const Router = require("koa-router");
const { RedditAgent } = require('./reddit-agent');
const koaBody = require('koa-body');
const logger = require('koa-logger');

require('dotenv').config();

const app = new Koa();
const router = new Router();



// Setting up agent info
const userInfo = {};
userInfo.clientSecret = process.env.CLIENT_SECRET;
userInfo.clientId = process.env.CLIENT_ID;
userInfo.redditUser = process.env.REDDIT_USER;
userInfo.redditPass = process.env.REDDIT_PASS;
userInfo.botName = process.env.BOT_NAME;

// Global variables
const posts = []; // "database" 
const agent = new RedditAgent(userInfo);
app.context._agent = agent;



// Setting up middleware

// // Logger for demonstartive purposes
// app.use(async (ctx, next) => {
//     let id = ++reqNum;
//     let start = Date.now();
//     console.log(`Type of Request: ${ctx.request.method}, From: ${ctx.request.ip}, Req ID: ${id}`); // logging each request
//     await next();
//     console.log(`Req ID: ${id}, Ended: ${Date.now() - start} ms`); // logging each request
// });
app.use(logger());
app.use(async (ctx, next) => {
    try{
        await next();
    } catch (err) {
        // handling errors
        ctx.status = err.status || 500;
        ctx.body = {
            message: err.message
        };
    }
});
app.use(koaBody()); // body parser


// Setting up routes
router.get("/api/alive", async (ctx) => {
    ctx.body = "hello!";
});

router.get("/api/hot", async (ctx) => {
    let res = await ctx._agent.getHot();
    ctx.set('content-type', 'application/json');
    ctx.body = res;
});

router.post("/api/post/new", async (ctx) => {
    let post = ctx.request.body;
    if (!post.subredditName || !post.title)
        ctx.throw(400, 'subreddit name or title not specified');
    let submission = await ctx._agent.makePost(post);
    posts.push(submission);
    ctx.status = 201;
    ctx.body = {
        id: posts.length - 1
    };
});

router.get("/api/post/:id", async (ctx) => {
    let id = ctx.params.id;
    if (id < 0 || id >= posts.length) ctx.throw(404, 'post with id not found');
    let post = await ctx._agent.getPost(posts[id]);
    ctx.body = {
        // displaying limited information
        id: id,
        title: post.title,
        subreddit: post.subreddit.display_name,
        description: post.selftext,
        ups: post.ups,
        link: post.url
    };
});

router.put('/api/reply', (ctx) => {
    let reqBody = ctx.request.body;
    if (!reqBody.updatedMessage) ctx.throw(400, 'updated message not specified');
    ctx._agent.changeMessage(reqBody.updatedMessage);
    ctx.status = 200;
});

app.use(router.routes());
app.use(router.allowedMethods());


// starting bot activity
agent.startReplies(5000); // rate limit is 5 seconds


app.listen(9000, () => console.log('I\'m listening on port 9000'));