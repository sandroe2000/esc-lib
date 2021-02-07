import { HttpFetch } from './HttpFetch.js';
import { ComponentLoader } from './ComponentLoader.js';

export class ComponentFactory {

    constructor(data){
        this.data = data;
        this.init();
    }

    async init() {        
        for(const [i, content] of this.data.entries()){     
            let component = await import(content.path);
            new ComponentLoader(component[content.name]);
        }
    }
}