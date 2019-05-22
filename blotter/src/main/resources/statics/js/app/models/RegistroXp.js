import { Cliente } from "./Cliente.js";

export class RegistroXp {
    
    constructor( id, ativo, tipo, quantidade, preco, data, operacao, cliente ) {

        this._id = id;
        this._ativo = ativo;
        this._tipo = tipo;
        this._quantidade = quantidade;
        this._preco = preco;
        this._data = data;
        this.operacao = operacao;
        this._cliente = new Cliente( cliente.codigo, cliente.nome );
    }

    get id() {

        return this._id;
    }

    get ativo() {

        return this._ativo;
    }

    get tipo() {

        return this._tipo;
    }

    get quantidade() {

        return this._quantidade;
    }

    get preco() {

        return this._preco;
    }

    get data() {

        return this._data;
    }

    get cliente() {

        return this._cliente;
    }

    toJson() {

        obj = {
            id: this._id,
            ativo: this._ativo,
            tipo: this._tipo,
            quantidade: this._quantidade,
            preco: this._preco,
            data: this._data,
            operacao: {
                id: this.operacao.id,
                nome: this.operacao.nome,
                estrategia: {
                    id: this.operacao.estrategia.id,
                    nome: this.operacao.estrategia.nome
                },
                dataInicio: this.operacao.dataInicio
            },
            cliente: {
                codigo: this.cliente.codigo,
                nome: this.cliente.nome
            }
        };

        return JSON.stringify( obj );
    }
}