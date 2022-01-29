import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,Subject } from "rxjs";
import { map,takeUntil } from "rxjs/operators";

import { ConfirmationService, MessageService } from 'primeng/api';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

import { User } from '../../models/user';


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
  selector: 'prueba-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit, OnDestroy{
  users: Observable<any> =new Observable();
  endsubs$: Subject<any> = new Subject();

  constructor(private apollo: Apollo,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) {}

  ngOnInit() {
    this.users = this.apollo
      .watchQuery({
        query: GET_USERS,
      })
      .valueChanges.pipe(
        map((result: any) => {
          return result.data.users.users;
        })
      );
  }

  ngOnDestroy() {
    this.endsubs$.next('value');
    this.endsubs$.complete();
  }

  updateUser(id: string){
    this.router.navigateByUrl(`form/${id}`);
  }

  deleteUser(id: string) {
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

