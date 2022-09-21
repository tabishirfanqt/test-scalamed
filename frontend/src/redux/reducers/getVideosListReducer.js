export const getVideosListReducer = (state= {videos:[]}, action) => {
    switch(action.type){
        case 'GET_VIDEOS':
            return{
                videos :action.payload
            }
            default:
                return state                        
    }
} 