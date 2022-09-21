import axios from 'axios'
export const UploadForm = (formDatas) =>async (dispatch) =>{
   
    const response = await axios.post("http://localhost:5000/videoUpload/",formDatas,{
        headers: {
          "Content-Type": "application/json",
        },
      });
    dispatch({
        type:'UPLOAD_FORM',
        payload:response.data
    })
}