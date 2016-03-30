export const ping = store => next => action => {
    console.log('ping');
    return next(action)
};

/* es5
var ping = function ping(store) {
    return function (next) {
        return function (action) {
            console.log('ping');
            return next(action);
        };
    };
};
*/