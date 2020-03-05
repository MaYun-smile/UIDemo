class BackHandler {
    events = [];
    addPreEventListener(fn) {
        this.events.unshift(fn);
        return () => {
            const index = this.events.indexOf(fn);
            if (index >= 0) {
                this.events.splice(index, 1);
            }
        };
    }
    addEventListener(fn) {
        this.events.push(fn);
        return () => {
            const index = this.events.indexOf(fn);
            if (index >= 0) {
                this.events.splice(index, 1);
            }
        };
    }
    trigger() {
        for (let i = 0; i < this.events.length; i++) {
            if (i > this.events.length) {
                break;
            }
            const event = this.events[i];
            const result = event();
            if (!result) {
                break;
            }
        }
    }
}

export default new BackHandler();
