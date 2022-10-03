class Modal extends HTMLElement {
  constructor() {
    super();
    this.status;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <style>
            .modal-container{
                width:100%;
                max-width:400px;
                height:70px;
                background-color:white;
                border-radius:1rem;
                position:fixed;
                left:50%;
                margin-left:-200px;
                top:10%;
                display:flex;
                align-items:center;
                justify-content:center;
                box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
                text-align:center;
                font-weight:bold;
                font-size:22px;
                transition:. 5s ease-in-out;
            }
            .modal-container p{
                text-align:center;
                color: #188351;
                font-weight:bold;
                font-size:22px;
            }
            </style>
            <div class="modal-container">
           <slot></slot>
            </div>
        `;
  }
  connectedCallback() {
    console.log("modal connected");
    if(this.hasAttribute("status")){
      this.status = this.getAttribute("status");
      if(this.status === "true"){
        this.shadowRoot.querySelector(".modal-container").style.color="#188351";
      }
      if(this.status === "false"){
        this.shadowRoot.querySelector(".modal-container").style.color="#d92f2f";
      }
    }
    setTimeout(() => {
      this.disconnectedCallback();
    }, 2000);
  }
  disconnectedCallback() {
    this.remove();
  }
}
customElements.define("site-modal", Modal);
