/**
 * 轮询操作类封装.
 */
export class Poll {

    interval = 5000; // 轮询间隔5s

    start(callback) {

        if (!_.isFunction(callback)) {
            throw new Error('轮询回调函数未传递!');
            return;
        }

        if (this.pollRef) {
            throw new Error('当前轮询实例已经启动!');
            return;
        }

        this.pollRef = setInterval(() => { callback() }, this.interval);

    }

    stop() {
        if (this.pollRef) {
            clearInterval(this.pollRef);
            this.pollRef = null;
        }
    }

}

export default new Poll();
