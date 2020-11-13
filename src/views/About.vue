<template>
  <div class="about">
    <v-app-bar app dark height="48">
      <div class="d-flex align-center">
        <v-img
          alt="rct Logo"
          class="shrink mr-2"
          contain
          src="./assets/m-log.svg"
          transition="scale-transition"
          width="30"
        />

        <v-img
          alt="Morpheus Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="./assets/morpheus.svg"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-menu offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark depressed v-bind="attrs" v-on="on">
            <v-icon>fa-globe</v-icon>
          </v-btn>
        </template>
        <v-list v-for="i of 2" :key="i" subheader>
          <v-list-item dense @click="switchLang">
            <v-list-item-title>中文</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>
