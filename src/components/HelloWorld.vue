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
          :items="sucursales"
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
import { sucursalService } from "@/services/Sucursal.service";
import { SucursalInterface } from "@/types/Sucursal.interface";

@Component
export default class App extends Vue {
  
  public name: string = "HelloWorld";
  public sucursales: any = [];

  async mounted() {
    this.sucursales = await sucursalService.getSucursales();
    console.log(this.sucursales);
  }

  headers: any = [
    { text: "Nombre", value: "Nombre" },
    { text: "Direccion", value: "Direccion" },
    { text: "Telefono", value: "Telefono" },
  ];

};
</script>
