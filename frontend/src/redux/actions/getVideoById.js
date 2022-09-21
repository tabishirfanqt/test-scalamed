import axios from 'axios'
export const getVideoById = (id) =>async (dispatch) =>{
   
    const response = await axios.get(`http://localhost:5000/getVideoById/${id}`); 
    dispatch({
        type:'GET_VIDEOS_BY_ID',
        payload:response.data
    })
}