import {collect, trigger} from './manager';
let obId = 0;

export const observableValue = (target, key) => {
    key = key || `obId${++obId}`;
    let cache = target;
    return (...args) => {
        if (args.length === 0) {
            collect(key);
            return cache;
        } else if (args[0] !== cache) {
            cache = args[0];
            trigger(key);
        }
    };
};

const observableArrayFuncs = (target, key) => {
    const prototype = {};
    const arr = target();
    const methods = ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'];
    methods.forEach(method => {
        prototype[method] = (...args) => {
            arr[method].apply(arr, args);
            trigger(key);
            return arr;
        }
    });
    prototype.destory = () => {
        arr.length = 0;
        trigger(key);
        return arr;
    };
    return prototype;
};

export const observableArray = target => {
    const key = `obId${++obId}`;
    const obTarget = observableValue(target, key);
    const proto = observableArrayFuncs(obTarget, key);
    const {__proto__} = obTarget;
    if (__proto__) {
        obTarget.__proto__ = proto;
    } else {
        Object.assign(obTarget, proto);
    }
    return obTarget;
};

export default arg => {
    if (Array.isArray(arg)) {
        return observableArray(arg);
    } else {
        return observableValue(arg);
    }
};
