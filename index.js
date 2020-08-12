const Koa = require("koa");
const Router = require("koa-router");
const Axios = require('axios');
const { RedditAgent } = require('./reddit');
const KoaBody = require('koa-body');
const logger = require('koa-logger');


require('dotenv').config();

const app = new Koa();
const router = new Router();



// setting up agent info
const userInfo = {};
userInfo.clientSecret = process.env.CLIENT_SECRET;
userInfo.clientId = process.env.CLIENT_ID;
userInfo.redditUser = process.env.REDDIT_USER;
userInfo.redditPass = process.env.REDDIT_PASS;
userInfo.botName = process.env.BOT_NAME;


const posts = []; // database but not really
//let reqNum = 0;  


app.context._agent = new RedditAgent(userInfo);

//set up middleware

app.use(logger());

// getting errors 
app.use(async (ctx, next) => {
    try{
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {
            status: `error ${ctx.status}`,
            json: { message: err.message }
        };
    }
});


// use koa-logger in place of this
// app.use(async (ctx, next) => {
//     let id = ++reqNum;
//     let start = Date.now();
//     console.log(`Type of Request: ${ctx.request.method}, From: ${ctx.request.ip}, Req ID: ${id}`); // logging each request
//     await next();
//     console.log(`Req ID: ${id}, Ended: ${Date.now() - start} ms`); // logging each request
// });

app.use(KoaBody()); // body parser

// setting up routes
router.get("/api/alive", async (ctx) => {
    ctx.body = "hello!";
});

router.get("/api/hot", async (ctx) => {
    let res = await ctx._agent.getHot();
    ctx.set('content-type', 'application/json');
    ctx.body = {
        status: ctx.status,
        json: res
    };
});

// posts
router.post("/api/post/new", async (ctx) => {
    if (ctx.request.headers['content-type'] !== 'application/json')
        ctx.throw(406, 'unsupported content-type');
    let post = ctx.request.body;
    if (!post.subredditName || !post.title)
        ctx.throw(400, 'subreddit name or title not specified');

    let submission = await ctx._agent.makePost(post);
    posts.push(submission);
    ctx.status = 201;
    ctx.body = {
        status: ctx.status,
        json: { id: posts.length - 1 }
    };

});

router.get("/api/post/:id", async (ctx) => {
    let id = ctx.params.id;
    if (id < 0 || id >= posts.length) ctx.throw(404, 'post with id not found');
    let post = await ctx._agent.getPost(posts[id]);
    ctx.body = {
        status: ctx.status,
        json: {
            id: id,
            title: post.title,
            subreddit: post.subreddit.display_name,
            description: post.selftext,
            ups: post.ups
        }
    };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(9000, () => console.log('I\'m listening on port 9000'));