const Reducer = (state, action) => {
    switch (action.type) {
        case "START":
            return {
                ...state,
                start: true,
            };
        case "NOT_START":
            return {
                ...state,
                start: false,
            };
        default:
            return state;
    }
};

export default Reducer;
