<template>
<div id="app">
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <center><div>
              <v-img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Oikya_Front_Logo.png"
                      height="125"
                      width="125"
                      class="grey darken-4"


              ></v-img>
            </div></center>

            <br>
            <v-card class="elevation-12" >
              <v-toolbar
                color="error"
                dark
                flat
              >
                <v-toolbar-title>Registration form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      :href="source"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      href="https://codepen.io/johnjleider/pen/pMvGQO"
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-codepen</v-icon>
                    </v-btn>
                  </template>
                  <span>Codepen</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Name"
                    name="name"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-message-text"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    label="Phone"
                    name="phone"
                    prepend-icon="mdi-calculator"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    label="Address"
                    name="address"
                    prepend-icon="mdi-briefcase"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" block >Register</v-btn>
              </v-card-actions>
              <v-card-text>

                <div class="float-right" >
                      <span>Already Registered? </span>
                     <v-btn text small color="primary" link to="/login">Login</v-btn>

                </div>
                <span class="white--text">------- </span>
              </v-card-text>
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>

<script>
  export default {
    props: {
      source: String,
    },

  }
</script>
<style scoped>

</style>
