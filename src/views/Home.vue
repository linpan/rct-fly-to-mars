<template>
  <v-container fluid>
    <v-row class="align-start">
      <v-col cols="3" v-for="index of 3" :key="index">
        <v-card style="height: 300px">
          <div class="d-flex justify-center align-center" style="height: 300px">
            <div>
              <div class="subtitle-1 text-center font-weight-bold">场景</div>
              <div class="caption grey--text text-center">修改时间12:46</div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card style="height: 300px">
          <div class="d-flex justify-center align-center dark" style="height: 300px">
            <div>
              <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    dark
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon x-large> fa-plus-circle</v-icon>
                  </v-btn>
                </template>
                <v-card dark  max-height="600" elevation="2">
                  <v-card-title class="headline justify-center border--inner">
                    新建场景
                  </v-card-title>
                  <v-text-field
                    class="mx-6"
                    label="用户名"
                    hide-details
                    background-color="#131313"
                    solo
                  ></v-text-field>
                  <v-divider class="mt-4"/>
                  <v-row style="height: 400px" class="py-0">
                    <v-col cols="5" class="pr-0">
                      <v-card
                        class="mx-auto overflow-y-auto"
                        tile
                        height="380"

                      >
                        <v-list dense>
                          <v-list-item-group
                            color="primary"
                          >
                            <v-list-item
                              v-for="(item, i) in 12"
                              :key="i"
                            >
                              <v-list-item-content>
                                <v-list-item-title> Items1</v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list-item-group>
                        </v-list>
                      </v-card>
                    </v-col>
                    <v-col cols="7" class="ml-0 pl-0">
                      <v-card  class="mx-auto overflow-y-auto"
                               height="380"
                               tile>
                      <v-list dark v-for="index of 8" :key="index">
                        <v-list-item>
                          <v-text-field
                            hide-details
                            class="yellow"
                            label="Name"
                            background-color="#131313"
                            solo
                          ></v-text-field>
                          <v-list-item-action>
                            <v-btn icon>
                              <v-icon color="grey lighten-1">fa-minus-circle</v-icon>
                            </v-btn>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      @clitck="dialog = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="primary darken-1"
                      text
                      @click="dialog = false"
                    >
                      Update
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {},
  data() {
    return {
      dialog: false
    }
  },
}
</script>
<style>
::-webkit-scrollbar {
  display: none;
}
</style>
