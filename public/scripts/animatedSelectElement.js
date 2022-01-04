const template = document.createElement('template')

template.innerHTML = `
<slot style="padding: 1em"/>
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

function getRandomArrayIndex(array){

    const randomIndex = Math.floor(Math.random() * array.length);

    return randomIndex;


}

function getRandomElementFromArray(elementArray, usedElements){

    const randomIndex = getRandomArrayIndex(elementArray);
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
        this.wrapper = this
        this.unusedElements = [];
        this.usedElements = [];
        this.backgroundColor = "#eee";
        this.displayedElementClass = 'incoming';
        this.isAnimated = true;
        this.isOneElementDisplayed = false
        this.animationDurationMS = 1800;
        this.style.padding = '.7em'
    
        this.slots.forEach(slot => {
           
            slot.assignedElements().forEach( element => {

                if(isElementAnimateable(element)){

                    if(!this.isOneElementDisplayed){

                        element.classList.add(this.displayedElementClass)
                        this.isOneElementDisplayed = true;

                    }

                    this.unusedElements.push(element);                  

                }

            });

        });

        const animationInterval = setInterval(() => {

            this.#swapElementArraysWhenUnusedEmpty()

            const randomElement = getRandomElementFromArray(this.unusedElements, this.usedElements);
            const currentElement = this.querySelector('.incoming');
            randomElement.classList.add('incoming');

            if(currentElement){

                currentElement.classList.remove('incoming')
            
            }


        }, this.animationDurationMS);

    }

    #swapElementArraysWhenUnusedEmpty() {

        if(this.unusedElements.length === 0){

            this.unusedElements = this.usedElements;
            this.usedElements = [];

        }

    }

}

window.customElements.define('animated-select', AnimatedSelect)