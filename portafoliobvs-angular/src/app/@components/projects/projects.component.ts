import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/model/proyecto';
import { SProyectoService } from 'src/app/service/s-proyecto.service';
import { TokenService } from 'src/app/service/token.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  pro: Proyecto[] = [];
  proT: Proyecto = null;
  nombreP: string = '';
  imgP: string = '';
  descripcionP: string = '';
  closeResult: string = '';
  editForm: FormGroup = null;

  constructor(
    private sProyecto: SProyectoService,
    private tokenService: TokenService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  isLogged = false

  ngOnInit(): void {

    this.cargarProyecto();

    this.editForm = this.fb.group({
      nombreP: [''],
      imgP: [''],
      descripcionP: ['']
    });

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  cargarProyecto(): void {
    this.sProyecto.lista().subscribe(
      data => { this.pro = data; })
  }

  onCreate(): void {
    const pro = new Proyecto(this.nombreP, this.imgP, this.descripcionP);
    this.sProyecto.save(pro).subscribe(
      data => {
        this.ngOnInit();
      }, err => {
        alert("Error al crear proyecto");
      }
    );
    this.modalService.dismissAll();
  }

  onDelete(id?: number) {
    if (id != undefined) {
      this.sProyecto.delete(id).subscribe(
        data => {
          this.cargarProyecto();
        }, err => {
          alert("No se pudo eliminar el proyecto");
        }
      )
    }
  }

  onUpdate(): void {
    this.sProyecto.update(this.proT.id, this.editForm.value).subscribe(
      data => {
        window.location.reload();
        this.modalService.dismissAll();
      }, err => {
        alert("Error al editar proyecto");
        this.ngOnInit();
        this.modalService.dismissAll();
      }
    )
  }

  //Abrir formulario para crear proyecto
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

  //Abrir formulario para editar proyecto
  openEdit(targetModal: any, proT: Proyecto) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });

    this.editForm.patchValue({
      nombreP: proT.nombreP,
      imgP: proT.imgP,
      descripcionP: proT.descripcionP
    });

    this.sProyecto.detail(proT.id).subscribe(
      data => {
        this.proT = data;
      }
    )
  }

}
