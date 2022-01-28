import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";


const GET_USERS = gql`
  {
    users {
      users {
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
  }
`;

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

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'frontend';
  users: Observable<any> | undefined;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.users = this.apollo
      .watchQuery({
        query: GET_USERS,
      })
      .valueChanges.pipe(
        map((result: any) => {
          console.log(result.data.users.users);
          return result.data.users.users;
        })
      );
  }

  create(nombre: string, apellidoPaterno: string, apellidoMaterno: string, 
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

  update(id: string,nombre: string, apellidoPaterno: string, apellidoMaterno: string, 
    telefono: string, calle: string, codigoPostal: string, ciudad: string, pais: string) {

    this.apollo
      .mutate({
        mutation: UPDATE_USER,
        refetchQueries: [{ query: GET_USERS }],
        variables: {
          id: id,
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

  delete(id: string) {
    this.apollo
      .mutate({
        mutation: DELETE_USER,
        refetchQueries: [{ query: GET_USERS }],
        variables: {
          id: id,
        },
      })
      .subscribe(() => {
        console.log("Eliminado");
      });
  }
}
