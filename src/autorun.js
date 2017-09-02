import {beginCollect, endCollect, dispose} from './manager';

export default (fn, context) => {
    beginCollect(fn, context);
    fn.call(context);
    endCollect();
    return () => {
        const {keys} = fn;
        keys.forEach(key => {
            dispose(key, fn);
        });
    };
};
