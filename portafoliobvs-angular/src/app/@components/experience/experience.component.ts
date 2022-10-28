import { Component, Input, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia';
import { SExperienciaService } from 'src/app/service/s-experiencia.service';
import { TokenService } from 'src/app/service/token.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  expe: Experiencia[] = [];
  expLab: Experiencia = null;
  nombreE: string = '';
  lugarE: string = '';
  startE: string = '';
  endE: string = '';
  descripcionE: string = '';
  closeResult: string = '';
  editForm: FormGroup = null;

  constructor(
    private sExperiencia: SExperienciaService,
    private tokenService: TokenService,
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  isLogged = false

  ngOnInit(): void {

    this.cargarExperiencia();

    this.editForm = this.fb.group({
      nombreE: [''],
      lugarE: [''],
      startE: [''],
      endE: [''],
      descripcionE: ['']
    });

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarExperiencia(): void {
    this.sExperiencia.lista().subscribe(
      data => { this.expe = data; })
  }

  onCreate(): void {
    const expe = new Experiencia(this.nombreE, this.lugarE, this.startE, this.endE, this.descripcionE);
    this.sExperiencia.save(expe).subscribe(
      data => {
        this.ngOnInit();
        this.modalService.dismissAll();
      }, err => {
        alert("Falló");
      }
    );
    this.modalService.dismissAll();
  }

  onDelete(id?: number) {
    if (id != undefined) {
      this.sExperiencia.delete(id).subscribe(
        data => {
          this.cargarExperiencia();
        }, err => {
          alert("No se pudo borrar la experiencia");
        }
      )
    }
  }

  onUpdate(): void {
    this.sExperiencia.update(this.expLab.id, this.editForm.value).subscribe(
      data => {
        window.location.reload();
        this.modalService.dismissAll();
      }, err => {
        alert("Error al modificar experiencia");
        this.ngOnInit();
        this.modalService.dismissAll();
      }
    )
  }

  //Abrir formulario para crear experiencia
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, backdrop: 'static', size: 'lg' }).result.then((result) => {
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

  //Abrir formulario para editar experiencia
  openEdit(targetModal: any, expLab: Experiencia) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });

    this.editForm.patchValue({
      nombreE: expLab.nombreE,
      lugarE: expLab.lugarE,
      startE: expLab.startE,
      endE: expLab.endE,
      descripcionE: expLab.descripcionE
    });

    this.sExperiencia.detail(expLab.id).subscribe(
      data => {
        this.expLab = data;
      }
    )
  }
}
