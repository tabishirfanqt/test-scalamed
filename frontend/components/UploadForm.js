
class UploadForm extends HTMLElement {
  constructor() {
    super();
    this.title;
    this.image;
    this.video;
    this.errText;
    this.error;
    this.loading;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
        *{
            box-sizing: border-box;
        }
        form{
            width:100%;
        }
        form input{
            display: block;
            width: 100%;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            color: #212529;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border-radius: 0.25rem;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
            margin-bottom:15px;
            outline:none;
            margin-top:5px;
        }
        form input[type="button"]{
            background-color:#d92f2f;
            border:none;
            color:white;
            margin-top:5px;
            cursor:pointer;
        }
        form input[type="file"]{
          cursor:pointer;
      }
        #error p{
            color:#d92f2f;
            text-align:center;
            font-size:22px;
            font-weight:bold;
        }
        label{
          margin-top:10px;
        }
        .dark_btn{
          background-color: #d92f2f;
          border: none;
          color: white!important;
          margin-top: 5px;
          cursor: pointer;
          width: 100%;
          display: block;
          padding: 10px 20px;
          text-align: center;
        }
        </style>
        <div id="loading"></div>
            <form id="form">
            <label>Enter Title *</label>
            <input type="text" name="title" id="titleInput" placeholder="Enter title"/>
            <label>upload Image *</label>
            <input type="file" accept="image/*" name="image" id="file" >
            <label>upload Video *</label>
            <input type="file" accept="video/*" name="video" id="videoFile">
            <input type="button" value="submit"  id="submit"/>
            </form>
            <button-link link="./index.html" class="dark_btn">
            Return to home page
          </button-link>
      
            <div id="error"></div>
        `;
  }
  connectedCallback() {
    console.log("connected with form component");
    this.render();
  }
  render() {
    console.log("im in render function");
    this.shadowRoot.querySelector("#file").onchange = (e) =>
      this.handleImage(e);
    this.shadowRoot.querySelector("#titleInput").onchange = (e) =>
      this.handleTitle(e);
    this.shadowRoot.querySelector("#videoFile").onchange = (e) =>
      this.handleVideo(e);
    this.shadowRoot.querySelector("#submit").onclick = (e) =>
      this.handleSubmit(e);
  }
  handleImage(e) {
    this.image = e.target.files[0];
    console.log("image is: ", this.image);
  }
  handleVideo(e) {
    this.video = e.target.files[0];
    console.log("image is: ", this.video);
  }

  handleTitle(e) {
    this.title = e.target.value;
    console.log("title is: ", this.title);
  }
  async handleSubmit(e) {
    if (this.title === "" || this.image === "" || this.video === "") {
      var errorContainer = this.shadowRoot.querySelector("#error");
      if (errorContainer.hasChildNodes()) {
        return;
      }
      this.errText = document.createElement("p");
      this.errText.textContent = "Please fill all fields.";

      errorContainer.appendChild(this.errText);
    } else {
      if (this.errText) this.errText.remove();
      this.loading = true;
      if (this.loading === true) {
        const loadingDiv = document.createElement("site-loading");

        loadingDiv.setAttribute("id", "loading");
        document.body.appendChild(loadingDiv);
      }
      const form_data = new FormData();
      form_data.append("title", this.title);
      form_data.append("image", this.image);
      form_data.append("video", this.video);

      const rawResponse = await axios.post(
        "http://localhost:5000/videoUpload",
        form_data
      );

      if (rawResponse) {
        this.loading = false;
      }
      if (this.loading === false) {
        const err = document.getElementById("loading");
        err.remove();

        const modal = document.createElement("site-modal");
        if (rawResponse.data.status === false) {
          modal.setAttribute("status", "false");
          modal.textContent = "Something Went wrong";
        }
        if (rawResponse.data.status === true) {
          modal.setAttribute("status", "true");
          modal.textContent = "Uploaded successfully";
        }
        document.body.appendChild(modal);
      }

      console.log("result is", rawResponse);
    }
  }

  disconnectedCallback() {
    console.log("disconnected...");
  }
}
customElements.define("upload-form", UploadForm);
