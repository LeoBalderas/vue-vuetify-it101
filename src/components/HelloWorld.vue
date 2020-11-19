<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />

        <v-data-table
          :headers="headers"
          :items="users"
          :items-per-page="5"
          class="elevation-1"
        >
        
        <template v-slot:item="{item}">
          <tr>
            <td>{{item.nombre}}</td>
            <td>{{item.apellido}}</td>
            <td>{{item.direccion}}</td>
            <td>{{item.telefono}}</td>
            <td>
                <v-row class="text-center">
                  <v-col>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn color="primary" icon @click="openModalEdit(item)" v-on="on">
                          <v-icon>Editar</v-icon>
                        </v-btn>
                      </template>
                      <span>Editar</span>
                    </v-tooltip>
                  </v-col>
                  <v-col>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn color="error" icon @click="openModalDelete(item)" v-on="on">
                          <v-icon>Eliminar</v-icon>
                        </v-btn>
                      </template>
                      <span>Eliminar</span>
                    </v-tooltip>  
                  </v-col> 
                </v-row>            
            </td>
          </tr>
        </template>      
         
        </v-data-table>
      </v-col>
    </v-row>

    <template>
      <v-row justify="center">
        <v-dialog
            v-model="dialogEdit"
            persistent
            max-width="600px"
        >
          <v-card>
            <v-card-title>
              <span class="headline">Editar Usuario</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                        label="Nombre*"
                        required
                        v-model="userSelected.nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <v-text-field
                        label="Apellidos*"
                        hint="example of persistent helper text"
                        required
                        v-model="userSelected.apellido"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                        label="Dirección*"
                        required
                        v-model="userSelected.direccion"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                        label="Teléfono*"
                        required
                        v-model="userSelected.telefono"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*Campos obligatorios</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="editUser"
              >
                Actualizar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <v-dialog
      v-model="dialogDelete"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          ¿Deseas eliminar el usuario seleccionado?
        </v-card-title>
        <v-card-text>Al confirmar la solicitud no podrás recupear el registro.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialogDelete = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="deleteUser"
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <template>
      <v-row justify="center">
        <v-dialog
            v-model="dialogAdd"
            persistent
            max-width="600px"
        >
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
          @click="openModalAdd(userNew)"
        >
          Open Dialog
        </v-btn>
      </template>
          <v-card>
            <v-card-title>
              <span class="headline">Agregar Usuario</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                        label="Nombre*"
                        required
                        v-model="userNew.nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="6"
                  >
                    <v-text-field
                        label="Apellidos*"
                        hint="example of persistent helper text"
                        required
                        v-model="userNew.apellido"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                        label="Dirección*"
                        required
                        v-model="userNew.direccion"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                        label="Teléfono*"
                        required
                        v-model="userNew.telefono"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*Campos obligatorios</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="dialogAdd = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="saveUser"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    

  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { userService } from "@/services/user.service";
import { UserInterface } from '@/types/User.interface';

@Component
export default class App extends Vue {
  
  public name: string = "HelloWorld";
  public users: any = [];
  public dialogEdit: boolean = false;
  public dialogDelete: boolean = false;
  public dialogAdd: boolean = false;

  public userSelected: UserInterface = {
    id: 0,
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: ''
  }

  public userNew: UserInterface = {
    id: 0,
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: ''
  }

  public headers: any = [
    { text: "Nombre", value: "nombre" },
    { text: "Apellido", value: "apellido"},
    { text: "Dirección", value: "direccion" },
    { text: "Teléfono", value: "telefono" },
    { text: "Acciones", value: ""},
  ];

  async mounted() {
    this.users = await userService.getUsers();
    console.log(this.users);
  }

  public openModalAdd(user: UserInterface) {
    this.dialogAdd = true;
    this.userNew = user;
    console.log(this.userNew);

    return this.dialogAdd;
  }  

  public openModalEdit(user: UserInterface) {
    this.dialogEdit = true;
    this.userSelected = user;
    console.log(this.userSelected);

    return this.dialogEdit;
  }

  public openModalDelete(user: UserInterface) {
    this.dialogDelete = true;
    this.userSelected = user;
    console.log(this.userSelected);

    return this.dialogDelete;
  }

  public async saveUser() {
    console.log('User to save ', this.userNew);
    
    const saveUser = await userService.saveUser(this.userNew);
    console.log("Saved to server ", saveUser);

    this.dialogAdd = false;
  }

  public async editUser() {
    console.log('User to edit', this.userSelected);
    
    const updateUser = await userService.updateUser(this.userSelected);
    console.log("Updated from server ", updateUser);

    this.dialogEdit = false;
  }

  public async deleteUser() {
    console.log('User to delete', this.userSelected);

    const deleteUser = await userService.deleteUser(this.userSelected);
    console.log("Deleted from server ", deleteUser);

    this.dialogDelete = false;
  }

};

</script>