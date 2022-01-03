const template = document.createElement('template')
template.innerHTML = `
<div id="wrapper" style="padding: 1em">
<slot/>
</div>
`;

function isElementAnimateable(element){

    const animateableElements = ['H2'];
    if (animateableElements.includes(element.tagName)){

        return true;

    }

    return false;

}

class AnimatedSelect extends HTMLElement{

    constructor(){

        super();

        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.slots = this.shadowRoot.querySelectorAll('slot');
        this.wrapper = this.shadowRoot.getElementById('wrapper');
        this.optionElements = [];
        this.backgroundColor = "#eee";
        this.slots.forEach(slot => {
           
            slot.assignedElements().forEach( element => {

                if(isElementAnimateable(element)){

                    element.remove()
                    this.optionElements.push(element)

                }

            });

        });

        this.appendChild(this.optionElements[1])
        

    }

}

window.customElements.define('animated-select', AnimatedSelect)