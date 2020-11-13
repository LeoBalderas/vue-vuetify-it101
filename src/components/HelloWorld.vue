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
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { userService } from "@/services/user.service";
// import { UserInterface } from "@/types/User.interface";

@Component
export default class App extends Vue {
  
  public name: string = "HelloWorld";
  public users: any = [];

  async mounted() {
    this.users = await userService.getSucursales();
    console.log(this.users);
  }

  headers: any = [
    { text: "Nombre", value: "nombre" },
    { text: "Apellido", value: "apellido"},
    { text: "Dirección", value: "direccion" },
    { text: "Teléfono", value: "telefono" },
  ];

};

</script>