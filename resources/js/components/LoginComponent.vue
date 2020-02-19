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
            <v-card class="elevation-12" height="350px">
              <v-toolbar
                color="error"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                  </v-toolbar>
              <v-card-text>
                <v-form
                        ref="form"
                        v-model="valid"
                >
                  <v-progress-linear
                          :active="loading"
                          :indeterminate="loading"
                          absolute
                          top
                          color="white accent-4"
                  ></v-progress-linear>

                  <v-text-field
                    label="Email"
                    v-model="form.email"
                    :rules="emailRules"
                    prepend-icon="mdi-account"
                    type="email"
                    required
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    v-model="form.password"
                    :rules="passwordRules"
                    prepend-icon="mdi-lock"
                    type="password"
                    required
                  ></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" block :disabled="!valid" @click="login">Login</v-btn>
                  </v-card-actions>

                </v-form>
              </v-card-text>

              <v-card-text>

                <div class="float-right" >
                     <span>No account? </span>
                     <v-btn text small color="primary" link to="/register">Register</v-btn>

                </div>
              </v-card-text>
            </v-card>
            <v-snackbar
                    v-model="snackbar"
            >
              {{ text }}
              <v-btn
                      color="pink"
                      text
                      @click="snackbar = false"
              >
                Close
              </v-btn>
            </v-snackbar>

          </v-flex>

        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>

<script>
  export default {

    data() {
        return{

          //email:'bulanzrs2020@gmail.com',
          //password:'fyp12345678',
          loading:false,
          snackbar:false,
          text:'',
          valid: true,
          emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          ],
          passwordRules:[
            v => !!v || 'Password is required',
          ],
          form:{
            email:'',
            password:'',
          }

        }
    },
    created() {
      this.$vuetify.theme.dark=true;
    },
    methods:{
      login(){
        // Add a request interceptor
        axios.interceptors.request.use((config)=> {
          this.loading=true;
          return config;
        }, (error)=> {
          this.loading=false;
          return Promise.reject(error);
        });

        // Add a response interceptor
        axios.interceptors.response.use((response)=> {
          this.loading=false;
          return response;
        },(error)=> {
          this.loading=false;
          return Promise.reject(error);
        });
        axios.post('/api/login',this.form)
                .then(res =>{
                  localStorage.setItem('token',res.data.token)
                  this.$router.push({name: 'Admin'});
                          // .then(res => console.log('Logged IN'))
                          // .catch(err =>console.log(err))
                })
                .catch(err => {
                  this.text=err.response.data.status
                  this.snackbar=true

                })

      }//end of login
    }//end of method

  }//end of export
</script>
<style scoped>

</style>
