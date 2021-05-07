export const loadImages = (payload) => {
    console.log('LOAD_IMG');
    return {
        type: "LOAD_IMAGES",
        payload: payload
    }
}