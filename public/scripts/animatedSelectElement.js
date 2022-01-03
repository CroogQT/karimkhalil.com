const template = document.createElement('template')
template.innerHTML = `
<div id="wrapper" style="padding: 1em">
<slot/>
</div>
`;

function isElementAnimateable(element){

    const animateableElements = ['H1', 'H2', 'H3', 'H4', 'H5'];
    if (animateableElements.includes(element.tagName)){

        return true;

    }

    return false;

}

function animateElement(){



}

function getRandomElementFromArray(elementArray, usedElements){

    const randomIndex = Math.floor(Math.random() * elementArray.length);
    let randomElement = elementArray[randomIndex];

    usedElements.push(randomElement);
    elementArray.splice(randomIndex, 1)

    return randomElement;

}

class AnimatedSelect extends HTMLElement{

    constructor(){

        super();

        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.slots = this.shadowRoot.querySelectorAll('slot');
        this.wrapper = this.shadowRoot.getElementById('wrapper');
        this.optionElements = [];
        this.usedElements = [];
        this.backgroundColor = "#eee";
        this.isAnimated = true;
        this.slots.forEach(slot => {
           
            slot.assignedElements().forEach( element => {

                if(isElementAnimateable(element)){

                    element.style.display = 'none'
                    this.optionElements.push(element);

                }

            });

        });

        const animationInterval = setInterval(() => {
        
            if(this.optionElements.length === 0){

                this.optionElements = this.usedElements;
                this.usedElements.length = 0;

            }

            let randomElement = getRandomElementFromArray(this.optionElements, this.usedElements)

            console.log(this.usedElementsk)
            this.usedElements.push(randomElement)

            this.wrapper.innerHTML = '';
            randomElement.style.display = 'block'
            this.wrapper.appendChild(randomElement);

        }, 800);

    }

}

window.customElements.define('animated-select', AnimatedSelect)