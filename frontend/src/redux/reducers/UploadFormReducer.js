export const UploadFormReducer = (state = { uploadForm: [] }, action) => {
  switch (action.type) {
    case "UPLOAD_FORM":
      return {
        uploadForm: action.payload,
      };
    default:
      return state;
  }
};
