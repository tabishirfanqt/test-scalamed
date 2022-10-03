class Listing extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.con;
    this.shadowRoot.innerHTML = `
        <style>
        .listing-parent{
            width:100%;
            height:auto;
        }
        .card-wrapper{
            width:100%;
            height:130px;
            display:flex;
            margin-bottom:20px;
            overflow:hidden;
            border-radius:.5rem;
            background-color:#333;
            overflow:hidden;
            cursor:pointer;
        }
        .image-area{
            width:100%;
            height:100%;
            background-color:#555;
            position:relative;
        }
        .image-area img{
            width:100%;
            height:100%;
            object-fit:cover;
        }
        .layer{
          position:absolute;
          top:0;left:0;right:0;bottom:0;z-index:10;
          background-color:rgba(0,0,0,0.5);
          display:flex;
          align-items:center;
          justify-content:center;
          opacity:0;
          transition:.5s;
        }
        .layer p{
          font-size:18px;
        }
        .image-area:hover .layer{
          opacity: 1;
          transition:.5s;
        }
        </style>
        <div class="listing-parent">
   
        </div>
        `;
  }
  connectedCallback() {
    this.render();
  }

  render() {
    fetch("http://localhost:5000/videos")
      .then((data) => data.json())
      .then((json) => this.takeData(json));
    console.log("testing")
  }

  takeData(val) {
    const container = this.shadowRoot.querySelector(".listing-parent");
    val.data.forEach((element) => {
      container.innerHTML += `
            <div class="card-wrapper" onclick="mainVideo('${element._id}');">
            <div class="image-area">
            <img src='http://localhost:5000/${element.image}'/>
            <div class="layer">
            <p>${element.title}</p>
            </div>
            </div>

          
            </div>
            `;
    });
  }
  disconnectedCallback() {
    console.log("disconnected..");
  }
}

customElements.define("my-listing", Listing);

async function mainVideo(id) {
  const test = document.querySelector("main-video");
  if (test) test.parentNode.removeChild(test);

  const videoparent = document.querySelector(".video-wrapper");
  const vid = document.createElement("main-video");
  vid.setAttribute("id", id);
  videoparent.appendChild(vid);

  var a = new Listing();
  // a.render();
}
