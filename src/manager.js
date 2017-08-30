const store = {};
let curObserver;
let observerCollecter = [];

export const observerCollect = key => {
    observerCollecter.push(key);
};

const clearObserverCollecter = () => {
    observerCollecter = [];
};

export const beginCollect = (fn, context) => {
    curObserver = fn;
    fn.context = context;
};

export const endCollect = () => {
    curObserver = null;
};

export const collect = key => {
    store[key] = store[key] || [];
    const stack = store[key];
    if (curObserver && !stack.includes(curObserver)) {
        stack.push(curObserver);
        curObserver.key = key;
    }
};

export const dispose = (key, fn) => {
    const stack = store[key];
    if (!stack.includes(fn)) return;
    const index = stack.indexOf(fn);
    stack.splice(index, 1);
};

export const triggerObserver = () => {
    if (!observerCollecter.length) return;
    const filterRepeatAction = Array.from(new Set(observerCollecter));
    const observers = filterRepeatAction.reduce((arr, key) => {
        return arr.concat(store[key]);
    }, []);
    const filterObservers = Array.from(new Set(observers));
    filterObservers.forEach(fn => {
        const {context} = fn;
        fn.result = fn.call(context);
    });
    clearObserverCollecter();
};

export const trigger = key => {
    observerCollect(key);
    setTimeout(triggerObserver, 0);
};
