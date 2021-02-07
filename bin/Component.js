import { HttpFetch } from './HttpFetch.js';

export class Component {

    constructor(){ 

        this.params = {};
        this.template();
    }

    async init(){ }

    async events(){ }
    
    async template(){
        
        await this.init();
        
        let template = null;
        let data = this.params.data;
        
        if(this.params.templateHtml){
            template = this.params.templateHtml;
        }else if(this.params.templateUrl){
            template = await new HttpFetch().getTemplate(this.params.templateUrl);
        }
        
        if(template){
            document.querySelector('index-body').insertAdjacentHTML("beforeend", await this.setData(data, template));
        }

        await this.events();
    }
    
    async setData(data, template){

        if(!data) return false;

        let objTempl = this.stringToHTML(template);
        let dataLoop = objTempl.querySelector("[data-loop]");
        let parent = dataLoop ? dataLoop.parentNode : null;
        let loop = dataLoop ? dataLoop.outerHTML : null;

        const regex = /\{\{.+\}\}/gm; //{{abcd...}}
        const subst = '';

        if(loop){
            parent.removeChild(dataLoop);
            for(let item of data){
                let clone = loop;
                for (let [key, value] of Object.entries(item)) {
                    if(loop.includes(`{{${key}}}`)){
                        clone = clone.replace(new RegExp(`{{${key}}}`, 'g'), value);
                    }
                }
                parent.insertAdjacentHTML('beforeEnd', clone);
            }
            return objTempl.outerHTML.replace(regex, subst).replace('data-loop=""', '');
        }

        if(!loop){

            for (let [key, value] of Object.entries(data[0])) {
                if(template.includes(`{{${key}}}`)){
                    template = template.replace(`{{${key}}}`, value);
                }
            }
            return template.replace(regex, subst);
        }  
    }

    stringToHTML(str){
        let parser = new DOMParser();
		let doc = parser.parseFromString(str, 'text/html');
        return doc.body.firstElementChild;
    }

    getObjectbyId(data, id) {
        return data.filter(obj => {
            return obj.id == id;
        });
    }
}