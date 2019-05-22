export class ListaRegistroXp {

    constructor() {

        this._registros = [];
    }

    adiciona( registro ) {

        this._registros.push( registro );
    }

    get registros() {

        return [].concat( this._registros );
    }
}