export class ComponentLoader {

    constructor(component) {

        this.component = component;      
        this.init();
    }

    async init() {
        const component = new this.component();
        
    }
}