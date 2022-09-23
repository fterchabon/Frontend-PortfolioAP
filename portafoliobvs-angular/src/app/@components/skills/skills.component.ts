import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Skill } from 'src/app/model/skill';
import { SSkillService } from 'src/app/service/s-skill.service';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  sk: Skill[] = [];
  skI: Skill = null;
  nombreS: string = '';
  imgS: string = '';
  porcentajeS: number = null;
  softS: string = '';
  closeResult: string = '';
  editForm: FormGroup = null;

  constructor(
    private sSkill: SSkillService,
    private tokenService: TokenService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  isLogged = false

  ngOnInit(): void {

    this.editForm = this.fb.group({
      nombreS: [''],
      imgS: [''],
      porcentajeS: [''],
      softS: [''],
    });

    this.cargarSkill();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarSkill(): void {
    this.sSkill.lista().subscribe(
      data => { this.sk = data; })
  }

  onCreate(): void {
    const sk = new Skill(this.nombreS, this.imgS, this.porcentajeS, this.softS);
    this.sSkill.save(sk).subscribe(
      data => {
        this.ngOnInit();
      }, err => {
        alert("Error al crear skill");
      }
    );
    this.modalService.dismissAll();
  }

  onDelete(id?: number) {
    if (id != undefined) {
      this.sSkill.delete(id).subscribe(
        data => {
          this.cargarSkill();
        }, err => {
          alert("No se pudo eliminar la skill");
        }
      )
    }
  }

  onUpdate(): void {
    console.log(this.editForm.value);
    this.sSkill.update(this.skI.id, this.editForm.value).subscribe(
      data => {
        this.ngOnInit();
        this.modalService.dismissAll();
      }, err => {
        alert("Error al editar skill");
        this.ngOnInit();
        this.modalService.dismissAll();
      }
    )
  }

    //Abrir formulario para crear skill
    open(content: any) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, backdrop: 'static', size: 'md' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
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
  
    //Abrir formulario para editar skill
    openEdit(targetModal: any, skI: Skill) {
      this.modalService.open(targetModal, {
        centered: true,
        backdrop: 'static',
        size: 'md'
      });
  
      this.editForm.patchValue({
        nombreS: skI.nombreS,
        imgS: skI.imgS,
        porcentajeS: skI.porcentajeS,
        softS: skI.softS
      });
  
      this.sSkill.detail(skI.id).subscribe(
        data => {
          this.skI = data;
        }
      )
      console.log(skI.id);
    }
}
