import {beginCollect, trigger, collect, endCollect} from './manager';

export default (fn, context) => {
    beginCollect(fn, context);
    fn.result = fn.call(context);
    endCollect();
    return () => {
        const {result} = fn;
        if (result) {
            return result;
        }
        return fn.call(fn.context);
    };
};
