import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Educacion } from 'src/app/model/educacion';
import { SEducacionService } from 'src/app/service/s-educacion.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  edu: Educacion[] = [];
  eduC: Educacion = null;
  nombreEd: string = '';
  startEd: string = '';
  endEd: string = '';
  descripcionEd: string = '';
  closeResult: string = '';
  editForm: FormGroup = null;

  constructor(
    private sEducacion: SEducacionService,
    private tokenService: TokenService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  isLogged = false

  ngOnInit(): void {

    this.editForm = this.fb.group({
      nombreEd: [''],
      startEd: [''],
      endEd: [''],
      descripcionEd: ['']
    });

    this.cargarEducacion();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

  }

  cargarEducacion(): void {
    this.sEducacion.lista().subscribe(
      data => { this.edu = data; })
  }

  onCreate(): void {
    const edu = new Educacion(this.nombreEd, this.startEd, this.endEd, this.descripcionEd);
    this.sEducacion.save(edu).subscribe(
      data => {
        this.ngOnInit();
      }, err => {
        alert("Error al crear educacion");
      }
    );
    this.modalService.dismissAll();
  }

  onDelete(id?: number) {
    if (id != undefined) {
      this.sEducacion.delete(id).subscribe(
        data => {
          this.cargarEducacion();
        }, err => {
          alert("No se pudo eliminar la educacion");
        }
      )
    }
  }

  onUpdate(): void {
    console.log(this.editForm.value);
    this.sEducacion.update(this.eduC.id, this.editForm.value).subscribe(
      data => {
        this.ngOnInit();
        this.modalService.dismissAll();
      }, err => {
        alert("Error al editar educacion");
        this.ngOnInit();
        this.modalService.dismissAll();
      }
    )
  }

  //Abrir formulario para crear educacion
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

  //Abrir formulario para editar educacion
  openEdit(targetModal: any, eduC: Educacion) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });

    this.editForm.patchValue({
      nombreEd: eduC.nombreEd,
      startEd: eduC.startEd,
      endEd: eduC.endEd,
      descripcionEd: eduC.descripcionEd
    });

    this.sEducacion.detail(eduC.id).subscribe(
      data => {
        this.eduC = data;
      }
    )
    console.log(eduC.id);
  }
}
