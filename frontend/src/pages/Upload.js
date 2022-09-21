import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UploadForm } from "../redux/actions/UploadForm";
import Loading from "../components/Loading";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [video, setVideo] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [isUpload, setIsUpload] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log(file);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title === null || file === null || video === null) {
      setValidationError(true);
    } else {
      setValidationError(false);
      setLoading(true);
    }
    let formDatas = new FormData();
    formDatas.append("title", title);
    formDatas.append("image", file);
    formDatas.append("video", video);

    dispatch(UploadForm(formDatas));
  };
  const response = useSelector((state) => state.uploadForm.uploadForm);
  console.log("response is:", response);
  useEffect(() => {
    if (response.message === "success") {
      console.log("successfully uploaded");
      setIsUpload(true);
      setLoading(false);
    } else if (response.status === false) {
      setIsUpload(false);
    } else {
      console.log("not uploaded");
      setIsUpload(null);
    }
  }, [response]);

  function closeAlert() {
    setIsUpload(null);
  }

  return (
    <>
      {loading && <Loading />}
      <div className="upload-page-wrapper">
        <div className="upload-section shadow">
          <h1>Upload Video</h1>
          <div className="upload-form-wrapper">
            {validationError === true && (
              <p className="error">Please Fill all the fields</p>
            )}

            <form action="">
              <label htmlFor="">Enter Title</label>
              <input
                type="text"
                onChange={handleChange}
                className="form-control mb-3"
                placeholder="Enter Title"
              />
              <label htmlFor="">Upload Image</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="form-control  mb-3"
                id=""
              />
              <label htmlFor="">Upload Video</label>
              <input
                type="file"
                name="video"
                onChange={handleVideoChange}
                className="form-control  mb-3"
                id=""
              />
              <input
                type="submit"
                value="Upload"
                className="submit-btn"
                onClick={handleSubmit}
              />
              <Link to="/" className="dark-btn">
                Return to Home page
              </Link>
            </form>
            {console.log("uplaod is", isUpload)}
            {isUpload === true && (
              <div className="alertbox-wrapper">
                <p>Video is uploaded successfully</p>
                <p onClick={closeAlert}>x</p>
              </div>
            )}
            {isUpload === false && (
              <div className="alertbox-wrapper">
                <p>Something went wrong</p>
                <p onClick={closeAlert}>x</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Upload;
