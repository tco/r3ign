export default (map, initialState) => {
    return (state = initialState, action) => {
        const reducer = map[action.type];
        if (typeof reducer === 'function') return reducer(state, action);
        return state;
    };
};
