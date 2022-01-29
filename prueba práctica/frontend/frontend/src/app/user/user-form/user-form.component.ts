import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


const CREATE_USER = gql`
  mutation createUser($nombre: String!, $apellidoPaterno: String!, $apellidoMaterno: String!, 
  $telefono: String!, $calle: String!, $codigoPostal: String!, $ciudad: String!, $pais: String!) {
    createUser(userInput: { nombre: $nombre, apellidoPaterno: $apellidoPaterno,apellidoMaterno:$apellidoMaterno,
    telefono:$telefono,calle:$calle, codigoPostal:$codigoPostal,ciudad:$ciudad,pais:$pais}) {
      _id
      nombre
      apellidoPaterno
      apellidoMaterno
      telefono
      calle
      codigoPostal
      ciudad
      pais
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($id: ID!,$nombre: String!, $apellidoPaterno: String!, $apellidoMaterno: String!, 
  $telefono: String!, $calle: String!, $codigoPostal: String!, $ciudad: String!, $pais: String!) {
    updateUser(id: $id, userInput: { nombre: $nombre, apellidoPaterno: $apellidoPaterno,apellidoMaterno:$apellidoMaterno,
    telefono:$telefono,calle:$calle, codigoPostal:$codigoPostal,ciudad:$ciudad,pais:$pais}) {
      _id
      nombre
      apellidoPaterno
      apellidoMaterno
      telefono
      calle
      codigoPostal
      ciudad
      pais
    }
  }
`;

@Component({
  selector: 'prueba-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  currentUserId: string;
  editmode = false;

  constructor(
    private apollo: Apollo,
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
  }

  private _initUserForm() {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      telefono: ['', Validators.required],
      calle: ['',Validators.required],
      codigoPostal: ['',Validators.required],
      ciudad: ['',Validators.required],
      pais: ['',Validators.required]
    });
  }

  private _checkEditMode() {
    this.route.params
    .pipe(takeUntil(this.endsubs$))
    .subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentUserId = params.id;
        this.usersService.getUser(params.id)
    .pipe(takeUntil(this.endsubs$))
        .subscribe((user) => {
          this.userForm.name.setValue(user.name);
          this.userForm.email.setValue(user.email);
          this.userForm.phone.setValue(user.phone);
          this.userForm.isAdmin.setValue(user.isAdmin);
          this.userForm.street.setValue(user.street);
          this.userForm.apartment.setValue(user.apartment);
          this.userForm.zip.setValue(user.zip);
          this.userForm.city.setValue(user.city);
          this.userForm.country.setValue(user.country);

          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        });
      }
    });
  }

  createUser(nombre: string, apellidoPaterno: string, apellidoMaterno: string, 
    telefono: string, calle: string, codigoPostal: string, ciudad: string, pais: string) {
    this.apollo
      .mutate({
        mutation: CREATE_USER,
        refetchQueries: [{ query: GET_USERS }],
        variables: {
          nombre: nombre,
          apellidoPaterno: apellidoPaterno,
          apellidoMaterno:apellidoMaterno,        
          telefono:telefono,
          calle:calle,
          codigoPostal:codigoPostal,
          ciudad:ciudad,
          pais:pais
        },
      })
      .subscribe(() => {
        console.log("Creado");
      });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserId,
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      phone: this.userForm.phone.value,
      isAdmin: this.userForm.isAdmin.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value,
      password: this.userForm.password.value,
    };
    if (this.editmode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }

  onCancle() {
    this.location.back();
  }

}
