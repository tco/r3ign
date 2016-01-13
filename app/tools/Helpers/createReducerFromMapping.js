export default (map) => {
    return (state, action) => {
        const reducer = map[action.type];
        if (typeof reducer === 'function') return reducer(state, action);
        return state;
    };
};
