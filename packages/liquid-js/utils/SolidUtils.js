export const clearState = (state) => Object.keys(state).reduce((state, key) => ({ ...state, [key]: undefined }), {})
