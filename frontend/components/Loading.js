class Loading extends HTMLElement{
    constructor(){
       super();
       this.attachShadow({mode : 'open'})
       this.shadowRoot.innerHTML =`
       <style>
       .loading{
        width:100%;
        height:100vh;
        background-color:rgba(0,0,0,0.7);
        position:fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index:100;
       }
       
#loading-bar-spinner.spinner {
    left: 50%;
    margin-left: -20px;
    top: 50%;
    margin-top: -20px;
    position: absolute;
    z-index: 19 !important;
    animation: loading-bar-spinner 400ms linear infinite;
  }
  
  #loading-bar-spinner.spinner .spinner-icon {
    width: 40px;
    height: 40px;
    border: solid 4px transparent;
    border-top-color: var(--redcolor) !important;
    border-left-color: var(--redcolor) !important;
    border-radius: 50%;
  }
  
  @keyframes loading-bar-spinner {
    0% {
      transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
       </style>
       <div class="loading">
       <div id="loading-bar-spinner" class="spinner">
       <div class="spinner-icon"></div>
     </div></div>
       `
    }
    connectedCallback(){

    }
    disconnectedCallback(){

    }
}
customElements.define("site-loading", Loading)