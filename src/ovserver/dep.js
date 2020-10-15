let id = 0

class Dep {
    constructor() {
        this.id = id++
    }
}

Dep.target = null;
const stake = [];

export function pushTarget(watcher) {
    Dep.target = watcher
    stake.push(watcher)
}

export function popTarget() {
    Dep.target = stake[stake.length-1]
    stake.pop()
}

export default Dep
