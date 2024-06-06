export class Person{
    //thuoc tinh
    cccd: number;
    name: string;
    clazz: string;
    country: string
    constructor(cccd: number,name: string){
        this.cccd = cccd;
        this.name = name;
    }
    //phuong thuc
    study(): void{
        console.log("phai hoc nodejs");
    }
    exam(): void{
        console.log("thi het mon nodejs moi dc len lop");
    }
}