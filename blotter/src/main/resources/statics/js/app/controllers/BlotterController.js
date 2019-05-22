import { Bind } from "../helpers/Bind.js";
import { ListaRegistroXp } from "../models/ListaRegistroXp.js";
import { ListaOperacoes } from "../models/ListaOperacoes.js";
import { RegistroXpService } from "../services/RegistroXpService.js";

export class BlotterController {

    constructor() {

        let select = document.querySelector.bind( document );

        this._btnClassificar = select( "#btn-classificar" );
        this._btnFiltro = select( "#btn-filtro" );
        this._btnImportar = select( "#btn-importar" );
        this._btnUpload = select( "#form_modal-import--upload-button" );
        this._btnSalvar = select( "#btn-salvar" );

        this._formUpload = select( "#form_modal-import" );
        this._inputFile = select( "#form_modal-import--input-file" );

        this._tbody = select( "#registroXpView" );
        this._dataList = select( "#table_input--list-operacoes" );

        this._formUpload.addEventListener( "submit", e => this._upload( e ) );

        this._registroXpService = new RegistroXpService();

        this._registrosXp = new Bind(
            new ListaRegistroXp(),
            new RegistroXpView( this._tbody ),
            "adiciona"
        );

        this._operacoes = new Bind(
            new ListaOperacoes(),
            new ListaOperacaoView( this._dataList ),
            "adiciona"
        );
    }

    /**
     * Método que faz upload do arquivo.
     * 
     * @param {event} event 
     */
    _upload( event ) {

        event.preventDefault();

        let formData = new FormData(), promise;

        this._btnUpload.innerText = "Enviando...";
        this._btnUpload.disabled = true;

        formData.append( "file", this._inputFile.files[0] );

        promise = this._registroXpService
            .uploadFile( formData )
            .then( res => {

                this._registroXpService.getNaoClassificados()
                    .then( registros => {
                        registros.forEach( registro => this._registrosXp.adiciona( registro ) );
                    } )
                    .catch( err => console.log( err ) );
            } )
            .catch( err => console.log( err ));
    }

    _salvarRegistros() {

    }
}