class Button extends HTMLElement{
    constructor(){
        super();
        this.theme;
        this.size;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
        <style>
        :host button{
            color:white;
            border:none;
            outline:none;
            border-radius:.3rem;
            font-size:18px;
            padding:6px 25px;
            cursor:pointer;
        }
        </style>
        <button>
        <slot></slot>
        </button>
        `
    }
    connectedCallback(){
        if(this.hasAttribute("theme")){
                this.theme = this.getAttribute("theme");
                if(this.theme === "dark"){
                    this.shadowRoot.querySelector("button").style.background="#d92f2f";
                }
                else if(this.theme === "light"){
                    this.shadowRoot.querySelector("button").style.background="#fff";
                    this.shadowRoot.querySelector("button").style.color="#d92f2f";
                }
        }
        else if(this.hasAttribute("size")){
            if(this.size === "medium"){
                this.shadowRoot.querySelector("button").style.background="#d92f2f";
            }
        }
    }
    disconnectedCallback(){

    }
}
customElements.define("site-button", Button)