import axios from 'axios'
export const getVideosList = () =>async (dispatch) =>{
   
    const response = await axios.get("http://localhost:5000/videos");
    dispatch({
        type:'GET_VIDEOS',
        payload:response.data
    })
}