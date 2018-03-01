const IS_FETCHING = 'IS_FETCHING'

export const updateIsFetching = isFetching => ({ type: IS_FETCHING, isFetching });

export default function reducer(isFetching = false, action) {
    switch (action.type) {
        case IS_FETCHING:
            return action.isFetching;
        
        default:
            return isFetching;
    }
}
