// import {beginAction, endAction, actionStore, actionTriggerObservers} from './manager';
// let id = 0;

// export default fn => {
//     const actionId = `actionId${++id}`;
//     return () => {
//         const actionObservers = actionStore[actionId];
//         if (actionObservers) {
//             actionTriggerObservers(actionObservers);
//         } else {
//             beginAction(actionId);
//             fn();
//             endAction();
//         }
//     };
// };