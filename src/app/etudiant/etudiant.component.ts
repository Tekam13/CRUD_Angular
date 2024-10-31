import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EtudiantModel } from '../model/etudiantModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-etudiant',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './etudiant.component.html',
  styleUrl: './etudiant.component.css'
})
export class EtudiantComponent implements OnInit{

  etudiants = new EtudiantModel();
  etudiantList : EtudiantModel[] = [];

  @ViewChild('myModal') model : ElementRef | undefined

  ngOnInit(): void {
    this.getEtudiantList();
  }
  openModel() {
    const etdModel = document.getElementById('myModal')
    if (etdModel != null) {
      etdModel.style.display = 'block';
    }
  }
  closeMedel(){
    this.etudiants = new EtudiantModel();
    if(this.model != null){
      this.model.nativeElement.style.display = 'none'
    }
  }
  onSaveForm(){

    debugger;
    const localData = localStorage.getItem('etudiantdata')
    if(localData != null){

      const etdData = JSON.parse(localData);
      this.etudiants.id = etdData.length + 1;
      etdData.push(this.etudiants);
      localStorage.setItem('etudiantdata', JSON.stringify(etdData) )

    }else{

      const newEtudiant = [];
      newEtudiant.push(this.etudiants)
      this.etudiants.id = 1;
      localStorage.setItem('etudiantdata', JSON.stringify(newEtudiant))

    }
    this.closeMedel();
    this.getEtudiantList();
  }

  onUpdateForm(){
    const currentEtudiant = this.etudiantList.find(e => e.id === this.etudiants.id)
    if(currentEtudiant != undefined){
      currentEtudiant.name = this.etudiants.name;
      currentEtudiant.mobile = this.etudiants.mobile;
      currentEtudiant.gender = this.etudiants.gender;
      currentEtudiant.doj = this.etudiants.doj;
      currentEtudiant.adresse = this.etudiants.adresse;
      currentEtudiant.status = this.etudiants.status;
    }
    localStorage.setItem('etudiantdata', JSON.stringify(this.etudiantList))
    this.closeMedel();
    this.getEtudiantList();
  }

  onDeleteEtudiant(data : EtudiantModel){
    const isConfirm = confirm('Voulez-vous vraiment supprimer un etudiant ?...')
    if(isConfirm){
      const currentEtudiant = this.etudiantList.findIndex(e => e.id === this.etudiants.id)
      this.etudiantList.splice(currentEtudiant, 1);
      localStorage.setItem('etudiantdata', JSON.stringify(this.etudiantList))
    }
  }

  onEditEtudiant(etudiantData : EtudiantModel){
    this.etudiants = etudiantData;
    this.openModel();
  }

  getEtudiantList(){
    const localData = localStorage.getItem('etudiantdata');
    if(localData != null){
      this.etudiantList = JSON.parse(localData)
    }
  }
}
