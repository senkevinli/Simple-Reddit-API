const EventEmitter = require('events');

/**
 * General purpose class to `stream-ify' Snoowrap functions (i.e getNewComments, getNew, etc...)
 * Better implementation already exists with Snoostorm
 */
class RedditStream extends EventEmitter{

    /**
     * Creates new RedditStream that executes specified task at a given interval (using nested timeouts).
     * Emits 'new' event when unique ID appears.
     * Should only be used with tasks that poll for Submissions, Private Messages, Comments, any content with ID
     * 
     * @param {function} task - task to execute at the specified interval,
     * should poll Reddit API using Snoostorm 
     * @param {number} interval - ms 
     */
    constructor(pollTask, interval){
        super();
        this._seen = new Set();
        this._interval = interval;
        this._timer = null;
        this._func = async() => {
            try {
                let newEntries = [];
                let result = await pollTask();
                for (let entry of result){
                    if(!this._seen.has(entry.id)){
                        newEntries.push(entry);
                        this._seen.add(entry.id);
                    }
                }
                // set continues unique content IDs, emit 'new'
                if (newEntries.length > 0) this.emit('new', newEntries);
                this._timer = setTimeout(this._func, interval);
            } catch(e){
                this.emit('error', e);
            }
        }
    }

    // starting interval task
    startIntervalTask(){
        this.emit('starting');
        this._timer = setTimeout(this._func, this._interval);
    }

    // stop interval tasks
    stopIntervalTask(){
        this.emit('stopping');
        clearInterval(this._timer);
        this._timer = null;
        this._seen.clear();
    }
}

module.exports = { RedditStream };