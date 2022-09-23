import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
persona: persona = new persona("","","","","","");
per: persona = null;
nombre: string = '';
apellido: string = '';
acercaDe: string = '';
email: string = '';
titulo: string = '';
img: string = '';
editForm: FormGroup = null;


  constructor (
    public personaService: PersonaService,
    private tokenService: TokenService,
    private modalService: NgbModal,
    private fb: FormBuilder
    ){}

    isLogged = false
  
  ngOnInit(): void {
    this.personaService.getPersona().subscribe(data =>{this.persona = data})

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    this.editForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      acercaDe: [''],
      email: [''],
      titulo: [''],
      img: ['']
    });
  }

  onEdit(): void {
    console.log(this.editForm.value);
    this.personaService.editPersona(this.per.id, this.editForm.value).subscribe(
      data => {
        this.ngOnInit();
        this.modalService.dismissAll();
      }, err => {
        alert("Error al editar perfil");
        this.ngOnInit();
        this.modalService.dismissAll();
      }
    )
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

    //Abrir formulario para editar persona
    openEdit(targetModal: any, per: persona) {
      this.modalService.open(targetModal, {
        centered: true,
        backdrop: 'static',
        size: 'lg'
      });
  
      this.editForm.patchValue({
        nombre: per.nombre,
        apellido: per.apellido,
        acercaDe: per.acercaDe,
        email: per.email,
        titulo: per.titulo,
        img: per.img
      });
  
      this.personaService.getPersona().subscribe(
        data => {
          this.per = data;
        }
      )
      console.log(per.id);
    }

}
