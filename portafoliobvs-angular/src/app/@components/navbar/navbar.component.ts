import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  persona: persona = new persona("", "", "", "", "", "");
  per: persona = null;
  nombre: string = '';
  apellido: string = '';
  titulo: string = '';
  email: string = '';
  acercaDe: string = '';
  img: string = '';
  closeResult: string = '';
  isLogged = false;
  isLogginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj!: string;
  editForm: FormGroup = null;


  constructor(
    private router: Router,
    private tokenService: TokenService,
    private personaService: PersonaService,
    private modalService: NgbModal,
    private authService: AuthService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.personaService.getPersona().subscribe(data => { this.persona = data })

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }

    this.editForm = this.fb.group({
      nombre: [''],
      apellido: [''],
      titulo: [''],
      email: [''],
      acercaDe: [''],
      img: ['']
    });
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(data => {
      this.isLogged = true;
      this.isLogginFail = false;
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      this.router.navigate([''])
      window.location.reload();
    }, err => {
      this.isLogged = false;
      this.isLogginFail = true;
      this.errMsj = err.error.mensaje;
      console.log(this.errMsj);

    })
  }

  onEdit(): void {
    console.log(this.editForm.value);
    this.personaService.editPersona(this.per.id, this.editForm.value).subscribe(
      data => {
        this.ngOnInit();
        this.modalService.dismissAll();
      }, err => {
        alert("Error al editar img");
        this.ngOnInit();
        this.modalService.dismissAll();
      }
    )
  }

  open(modalLoginForm: any) {
    this.modalService.open(modalLoginForm, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  //Abrir formulario para editar persona
  imgEdit(targetModal: any, per: persona) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });

    this.editForm.patchValue({
      nombre: per.nombre,
      apellido: per.apellido,
      titulo: per.titulo,
      email: per.titulo,
      acercaDe: per.acercaDe,
      img: per.img
    });

    this.personaService.getPersona().subscribe(
      data => {
        this.per = data;
      }
    )
    console.log(per.id);
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
}
