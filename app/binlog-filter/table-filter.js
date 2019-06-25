module.exports = function (tables) {

    this.tables = tables

    this.has = function (name) {
        if (typeof this.tables[name] === 'undefined'){
            return false;
        }
        return true;
    }
}

