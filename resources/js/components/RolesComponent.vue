<template>
<v-data-table
        item-key="name"
        class="elevation-1"
        :loading="loading"
        loading-text="Loading... Please Wait"
        :headers="headers"
        @pagination="paginate"
        :server-items-length="roles.total"
        :items="roles.data"
        :items-per-page=5
        sort-by="id"
        show-select
        @input="selectAll"
        :footer-props="{
          itemsPerPageOptions:[5,10,15],
          itemsPerPageText:'Roles Per page',
          'show-current-page':true,
          'show-first-last-page':true,
        }"

>
    <template v-slot:top>
        <v-snackbar
            v-model="snackbar"
            :top=true
            :right=true
        >
            {{ message }}
            <v-btn
                color="pink"
                text
                @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>

        <v-toolbar flat color="dark">
            <v-toolbar-title>Roles List</v-toolbar-title>
            <v-divider
                    class="mx-4"
                    inset
                    vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn color="error" dark class="mb-2" v-on="on">Add New Role</v-btn>
                    <v-btn color="error" dark class="mb-2 mr-2" @click="deleteAll">Delete </v-btn>
                </template>

                <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" >
                                    <v-text-field v-model="editedItem.name" label="Roles name"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        <v-row>
            <v-col cols="12">
                <v-text-field @input="searchIt" label="Search" class="mx-4"></v-text-field>
            </v-col>

        </v-row>

    </template>
    <template v-slot:item.action="{ item }">
        <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
        >
            mdi-content-save-edit-outline
        </v-icon>
        <v-icon
                small
                @click="deleteItem(item)"
        >
            mdi-delete
        </v-icon>
    </template>
    <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
</v-data-table>
</template>
<script>
    export default {
        data: () => ({
            dialog: false,
            loading:false,
            snackbar:false,
            message:'',
            selected:[],
            headers: [
                {
                    text: '#',
                    align: 'left',
                    sortable: false,
                    value: 'id',
                },
                { text: 'Name', value: 'name' },
                { text: 'Created At', value: 'created_at' },
                { text: 'Updated At', value: 'updated_at' },
                { text: 'Actions', value: 'action', sortable: false },
            ],
            roles: [],
            editedIndex: -1,
            editedItem: {
                id:'',
                name: '',
                created_at:'',
                updated_at:'',
            },
            defaultItem: {
                id:'',
                name: '',
                created_at:'',
                updated_at:''
            },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Role' : 'Edit Role'
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        created () {
            this.initialize()
        },

        methods: {
            selectAll(e){
                this.selected=[];
                if(e.length>0){
                    this.selected=e.map(val => val.id)
                }
            },
            deleteAll(){
                let decide= confirm('Are you sure you want to delete these items?')
                if(decide){
                    axios.post('/api/roles/delete',{'roles':this.selected})
                        .then(res =>{
                            this.message="Records Deleted Successfully";
                            this.selected.map(val =>{
                                const index=this.roles.data.indexOf(val)
                                this.roles.data.splice(index, 1)
                            })
                             this.snackbar=true;
                        })
                        .catch(err=>console.dir(err.response))
                }
            },
            searchIt(e){
              if(e.length > 3){
                  axios.get(`/api/roles/${e}`)
                      .then(res => this.roles = res.data.role)
                      .catch(err => console.dir(err.response))
              }
              if(e.length <= 0){
                  axios.get(`/api/roles`,{params:{'per_page':e.itemsPerPage}})
                      .then(res=>this.roles=res.data.role)
                      .catch(err=>{
                          if(err.response.status==401){
                              localStorage.removeItem('token');
                              this.$router.push('/login');

                          }
                      })//end of catch
              }

            },
            paginate(e){
                axios.get(`/api/roles?page=${e.page}`,{params:{'per_page':e.itemsPerPage}})
                    .then(res=>this.roles=res.data.role)
                    .catch(err=>{
                        if(err.response.status==401){
                            localStorage.removeItem('token');
                            this.$router.push('/login');

                        }
                    })//end of catch
            },
            initialize () {
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

            },

            editItem (item) {
                this.editedIndex = this.roles.data.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true

            },

            deleteItem (item) {
                const index = this.roles.data.indexOf(item)
                let decide= confirm('Are you sure you want to delete this item?')
                if(decide){
                    axios.delete('/api/roles/'+item.id)
                        .then(res =>{
                            this.message="Record Deleted Successfully";
                            this.roles.data.splice(index, 1)
                            this.snackbar=true;
                        })
                        .catch(err=>console.dir(err.response))
                }
            },

            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    axios.put('/api/roles/'+this.editedItem.id,{'name':this.editedItem.name})
                        .then(res=>{
                            this.message="Record Edited Successfully";
                            this.snackbar=true
                            Object.assign(this.roles.data[this.editedIndex],res.data.role)
                            this.close()
                        })
                        .catch(err=>console.log(err.response))

                } else {
                    //add data to database
                    axios.post('/api/roles',{'name':this.editedItem.name})
                        .then(res=>{
                            this.message="Record Added Successfully";
                            this.snackbar=true
                            this.roles.data.push(res.data.role)
                            this.close()
                        })
                        .catch(err=>console.dir(err.response))

                }

            },
        },
    }
</script>
<style scoped></style>
