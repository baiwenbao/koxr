import autorun from './autorun';

export default (condition, effect) => {
    if (typeof condition !== 'function' || typeof effect !== 'function') {
        throw new Error('condition or effect is not function');
    }
    const dispose = autorun(() => {
        if (condition()) {
            effect();
        }
    });
    return () => {
        dispose();
    };
};