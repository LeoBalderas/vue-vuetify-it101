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
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" icon @click="openModal(item)" v-on="on">
                    <v-icon>Editar</v-icon>
                  </v-btn>
                </template>
                <span>Editar</span>
              </v-tooltip>
            </td>
          </tr>
        </template>      
         
        </v-data-table>
      </v-col>
    </v-row>

    <template>
      <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
        >
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
            >
              Open Dialog
            </v-btn>
          </template> -->
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
  public dialog: boolean = false;
  public userSelected: UserInterface = {
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
    this.users = await userService.getUsuarios();
    console.log(this.users);
  }

  public openModal(user: UserInterface) {
    this.dialog = true;
    this.userSelected = user;
    console.log(this.userSelected);

    return this.dialog;
  }

  public imprimir() {
    console.log(this.userSelected);
  }

  public async editUser() {
    console.log('User to edit', this.userSelected);
    
    const updateUser = await userService.updateUsuarios(this.userSelected);
    console.log("Update from server ", updateUser);
  }

};

</script>