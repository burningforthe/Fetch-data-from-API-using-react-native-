const types = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
}

export const actionCreators = {
    loading: () => ({ type: types.LOADING }),
    failure: () => ({ type: types.FAILURE }),
    success: (posts) => ({ type: types.SUCCESS, payload: posts }),
}


export const initalState = {
    loading: true,
    error: false,
    posts: [],

}

export function reducer(state, action) {
    switch (action.type) {
        case types.LOADING:
            return { ...state, loading: true, error: false }
        case types.SUCCESS:
            return { loading: false, error: false, posts: action.payload }
        case types.FAILURE:

            return { ...state, loading: false, error: true }
    }
}
