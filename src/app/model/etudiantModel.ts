export class EtudiantModel{
      id: number;
     name : string;
     mobile : string;
     email : string;
     gender : string;
     doj : string;
     adresse : string;
     status : boolean;

     constructor(){
         this.id = 0;
        this.name = "";
        this.mobile = "";
        this.email = "";
        this.gender = "";
        this.doj = "";
        this.adresse = "";
        this.status = false;
     }
}