<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div>
            <p>Long-form v-model example</p>
            <input :value="myDataProperty" @input="updateMyProperty($event)"/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  // Data property
  myDataProperty!: string;
  // Lifecycle hook
  mounted () {
    this.myDataProperty = 'Boop'
  }
  // Component method
  updateMyProperty ($event: { target: { value: string; }; }) {
    this.myDataProperty = $event.target.value
  }
}
</script>
