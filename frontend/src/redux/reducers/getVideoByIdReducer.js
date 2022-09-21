export const getVideoByIdReducer = (state= {Singlevideo:[]}, action) => {
    switch(action.type){
        case 'GET_VIDEOS_BY_ID':
            return{
                Singlevideo :action.payload
            }
            default:
                return state                        
    }
} 