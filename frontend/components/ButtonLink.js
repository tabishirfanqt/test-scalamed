 class ButtonLink extends HTMLElement{
    constructor(){
        super();
        this.render;
        this.link;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML =`
        <style>
        a{
            text-decoration:none;
            color:white;
        }
        </style>
           <a id="link">
           <site-button theme="dark" size="medium">
              <slot></slot>
           </site-button>
           </a>
        `;
        }
    connectedCallback(){
            this.render();
    }
    render(){
        if(this.hasAttribute("link")){
            this.link = this.getAttribute("link");
            const anchorTag = this.shadowRoot.querySelector("#link");
            anchorTag.setAttribute("href", this.link);

        }
    }
    disconnectedCallback(){

    }
 }
 customElements.define("button-link", ButtonLink)