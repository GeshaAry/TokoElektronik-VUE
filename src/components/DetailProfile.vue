<template>
    <v-main>
        <v-container>
            <v-row align="center" justify="center" >
                <v-col md='12'>
                <v-card>
                    <v-card-title class="txtProfileUser">Hai, {{user.name}}</v-card-title>
                    <v-container>
                        <v-text-field filled v-model="user.name" label="Nama" rounded append-icon="mdi-rename-box" required readonly></v-text-field>
                        <v-text-field filled v-model="user.email" label="Email" rounded append-icon="mdi-email" required readonly></v-text-field>
                        <v-text-field filled v-model="user.alamat" label="Alamat" rounded append-icon="mdi-map-marker" required readonly></v-text-field>
                        <v-card-action>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="editHandler(user)">Update Profile</v-btn>
                        </v-card-action>
                    </v-container>
                </v-card>
                </v-col>
            </v-row>

        </v-container>


        <v-dialog v-model="dialog" persistent>
            <v-card min-width="600px">
                <v-card-title>
                    <span class="headline">Update Profile</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field filled v-model="users.name" label="Nama" rounded append-icon="mdi-rename-box" required></v-text-field>
                        <v-text-field filled v-model="users.alamat" label="Alamat" rounded append-icon="mdi-map-marker" required></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="update">Save</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }}</v-snackbar>
    </v-main>
</template>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700&family=Poppins:wght@700&display=swap');
    
    .txtProfileUser{
        font-family: 'Manrope', sans-serif;
        
    }
</style>
<script>
    export default {
        data() {
            return {
                user: [],
                users: {
                    name: '',
                    alamat: '',
                },
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                dialog: false,
                isDisabled: false,
                deleteId: '',
                editId: ''
            };
        },
        methods: {
            update() {
                let newData = {
                    name: this.users.name,
                    alamat: this.users.alamat,
                };
                var url = this.$api + '/user/' + localStorage.getItem('id');
                this.load = true;
                this.$http.put(url, newData, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = false;
                    this.close();
                    this.resetForm();
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            editHandler(user) {
                this.editId = user.id;
                this.users.name = user.name;
                this.users.alamat = user.alamat;
                this.dialog = true;
            },
            resetForm() {
                this.users = {
                    name: null,
                    alamat: null
                };
            },
            close() {
                this.dialog = false;
                this.user.name = this.users.name;
                this.user.alamat = this.users.alamat;
            },
            cancel(){
                this.dialog = false;
            }
        },
        mounted() {
            this.$http.get(this.$api + '/user/' + localStorage.getItem('id'), {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    this.user = response.data.data

                })
                .catch(error => {
                    console.log(error)
                })
        },

    }
</script>