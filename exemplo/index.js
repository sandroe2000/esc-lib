import 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js';
import { ComponentFactory } from '/bin/ComponentFactory.js'; //-> '/node_modules/esc-lib/bin/ComponentFactory.js';

export class Index {

    constructor(){       
        this.init();
    }

    async init(){
        const data = [
            {
                "path": "/exemplo/secao/SecaoComponent.js",
                "name":  "SecaoComponent"
            } 
        ];
        const componentFactory = new ComponentFactory(data);
    }
}

document.onreadystatechange = function () {
    let index = new Index();
}