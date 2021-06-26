# Reddit bot (?) using Reddit API
## Info  
- Responds when username is mentioned with specified message. Also can make text-only posts.
- .env file must be configured with Reddit user login credentials including client secret, client ID, username, password, and bot name 
- User must have more than ~40 karma (for a 5 sec rate limit on bot replies) or else rate limit will be 10 minutes.

## To Start
``
  node index.js
``
