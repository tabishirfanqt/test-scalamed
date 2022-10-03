class Video extends HTMLElement {
  constructor() {
    super();
    this.id;
    this.videoSrc;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
        .vid-containerbox{
            width:100%;
            height:100%;
            background-color:#333;
        }
        .vid-containerbox video{
            width:100%;
            height:100%;
        }
        </style>
        <div class="vid-containerbox">
            
        </div>
        `;
  }
  connectedCallback() {
    this.render();
  }
  async render() {
    if (this.hasAttribute("id")) {
      const test = document.querySelector("#alt-text");
      if (test) test.parentNode.removeChild(test);
      this.id = this.getAttribute("id");
      const response = await fetch(
        `http://localhost:5000/getVideoById/${this.id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      this.videoSrc = result.data.video;
    } else {
      console.log("else case");
    }

    const videotag = document.createElement("video");
    videotag.setAttribute("src", `http://localhost:5000/${this.videoSrc}`);
    videotag.autoplay = true;
    videotag.controls = true;
    videotag.muted = false;
    const container = this.shadowRoot.querySelector(".vid-containerbox");
    container.appendChild(videotag);
  }
  disconnectedCallback() {

  }
 
}
customElements.define("main-video", Video);

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
