import { HttpFetch } from '/bin/HttpFetch.js';  //-> '/node_modules/esc-lib/bin/HttpFetch.js';
import { DataBind } from '/bin/DataBind.js'     //-> '/node_modules/esc-lib/bin/DataBind.js'
import { Component } from '/bin/Component.js';  //-> '/node_modules/esc-lib/bin/Component.js';

export class SecaoComponent extends Component {

    constructor() {

        super();
        this.params = {};
        this.item = null;
    }

    async init() {

        this.params = {
            templateUrl: '/exemplo/secao/Secao.html',
            data: await new HttpFetch().getData('/exemplo/mock/data.json')
        };
    }

    async events() {

        let that = this;
        
        document.querySelectorAll('#icoEditarUsuario').forEach(icon => {
            icon.addEventListener('click', (event) => {

                let id = event.target.closest('tr').getAttribute('id');
                let item = that.getObjectbyId(that.params.data, id);
                let editarUsuariosModal = document.querySelector('#editarUsuariosModal');
                let modal = new bootstrap.Modal(editarUsuariosModal, { keyboard: false, backdrop: 'static' });
                modal.show();
                editarUsuariosModal.addEventListener('shown.bs.modal', function (event) {
                    that.item = item[0];
                    new DataBind('editarUsuariosForm', that.item, that);
                });
            }, false);
        });

        document.querySelectorAll('#icoRemoverUsuario').forEach(icon => {
            icon.addEventListener('click', (event) => {

                let id = event.target.closest('tr').getAttribute('id');
                let removerToast = document.querySelector('#removerToast')
                let tost = new bootstrap.Toast(removerToast, { delay: 3000 });
                
                //--> await removerRegistro(id);
                
                document.querySelector('.toast-body').innerHTML = `Registro removido com sucesso!`;
                tost.show();
            }, false);
        });

        document.querySelector('#editarUsuariosModalSave').addEventListener('click', (event) => {
            console.log(this.item);
        }, false);
    }
}