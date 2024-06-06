"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
var Person = /** @class */ (function () {
    function Person(cccd, name) {
        this.cccd = cccd;
        this.name = name;
    }
    //phuong thuc
    Person.prototype.study = function () {
        console.log("phai hoc nodejs");
    };
    Person.prototype.exam = function () {
        console.log("thi het mon nodejs moi dc len lop");
    };
    return Person;
}());
exports.Person = Person;
