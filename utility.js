const EventEmitter = require('events');

class RedditStream extends EventEmitter{
    constructor(task, interval){
        super();
        this._seen = new Set();
        this._interval = interval;
        this._timer = null;
        this._func = async() => {
            try {
                let newEntries = [];
                let result = await task('pics');
                for (let entry of result){
                    if(!this._seen.has(entry.id)){
                        newEntries.push(entry);
                        this._seen.add(entry.id);
                    }
                }
                if (newEntries.length > 0) this.emit('new', newEntries);
                this._timer = setTimeout(this._func, interval);
            } catch(e){
                this.emit('error', e);
            }
        }
    }
    startIntervalTask(){
        this.emit('starting');
        this._timer = setTimeout(this._func, this._interval);
    }
    stopIntervalTask(){
        this.emit('stopping');
        clearInterval(this._timer);
        this._timer = null;
        this._seen.clear();
    }
}

module.exports = { RedditStream };