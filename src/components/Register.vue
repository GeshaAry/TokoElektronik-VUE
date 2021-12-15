<template>
    <main>
        <v-container fluid fill-height class="posisinya">
            <v-layout flex align-center justify-center>
                <v-flex xs6 sm4 elevation-1 kotakregister class="displaynone">
                    <div>
                        <v-card class="background">
                                <v-img src="./img/foto.png" class="gambar"></v-img>
                        </v-card>
                    </div>
                </v-flex>
                <v-flex xs6 sm elevation-1 class="lebarCardResponsive">
                    <v-card class="kotakregister">
                        <v-card-text class="pt-4">
                            <div>
                                <v-card-title>
                                    <v-layout class="d-flex justify-center">
                                        <h2 class="textRegister">Register</h2>
                                    </v-layout>
                                </v-card-title>
                            </div>
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field filled rounded append-icon="mdi-rename-box" label="Name" v-model="name" :rules="nameRules" required></v-text-field>
                                    <v-text-field filled rounded append-icon="mdi-email" label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>
                                    <v-text-field filled rounded append-icon="mdi-map-marker" label="Alamat" v-model="alamat" :rules="alamatRules" required></v-text-field>
                                    <v-text-field filled rounded append-icon="mdi-lock" label="Password" v-model="password" type="password" min="8" :rules="passwordRules" required></v-text-field>
                                    <v-layout justify-end class="d-flex justify-center button">
                                        <v-btn class="mr-2" @click="submitregister" :loading="loading" :disabled="loading" :class=" { 'grey darken-1 white--text' :valid, disabled: !valid }">Register</v-btn>
                                        <v-btn @click="clear" class="grey darken-3 white--text">Clear</v-btn>
                                    </v-layout>
                                    <v-layout class="d-flex justify-center">
                                        <p class="textTanya">Sudah punya akun?</p>
                                        <p @click="loginform" class="loginText">Back to Login</p>
                                    </v-layout>
                                    <!-- <v-layout justify-end>
                                        <p @click="loginform" class="loginText">Back to Login</p>
                                    </v-layout> -->
                                </v-form>
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }} </v-snackbar>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Jolly+Lodger&display=swap');
    .grey--text{
        font-family: "Jolly Lodger";
    }

    .posisinya{
        position: absolute;
        top: 20px;
        left: 0;
        right: 0;
    }

    .kotakregister{
        height: 550px;
        background-color: #082032;
    }

    .gambar{
        width: 100% !important;
        background-position-x: center !important;
        background-position-y: center !important;
        position: absolute;
        top: 80px !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
    }

    .textRegister{
        color: #082032;
    }

    .textTanya{
        color: #082032 !important;
        margin-right: -90px !important;
        margin-top: 8px !important;
        font-size: 90% !important;
    }

    .button{
        margin-top: 20px;
    }

    .loginText{
        cursor: pointer !important;
        color: blue !important;
        margin-top: 30px !important;
        margin-right: 72px !important;
        font-size: 80% !important;
    }
    .loginText:hover{
        color: #082032 !important;
        transition: 0.5 !important;
    }

    .background{
        background-color: transparent !important;
        box-shadow: none !important;
        justify-content: center !important;
        display: flex !important;
    }

    .justified{
        justify-content: end !important;
    }

    @media screen and (max-width: 768px) {
        .displaynone {
            display: none;
        }

        .gambar {
            display: none;
        }

        .kotakregister {
            min-width: 100% !important;
            width: 100% !important;
            max-width: 100% !important;
        }

        .lebarCardResponsive.xs6 {
            max-width: 100% !important;
            flex-basis: 100% !important;
            margin: 0 10px;
        }
    }
</style>
<script>
    export default {
        name: "Register",
        data(){
            return{
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                valid: false,
                name : '',
                loader : null,
                loading : false,
                nameRules:[
                    (v) => !!v || 'name tidak boleh kosong',
                ],
                password: '',
                passwordRules: [
                    (v) => !!v || 'Password tidak boleh kosong :(',
                ],
                email: '',
                emailRules: [
                    (v) => !!v || 'Email tidak boleh kosong',
                ],
                alamat: '',
                alamatRules: [
                    (v) => !!v || 'Alamat tidak boleh kosong',
                ],
            };
        },
        methods: {
            submitregister(){
                this.loading = true;
                if(this.$refs.form.validate()){
                    //cek validasi data yang terkirim
                    this.load = true;
                    this.$http.post(this.$api + '/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        alamat: this.alamat
                    }).then(response => {
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = false;
                        this.loading = false;
                        this.clear();
                        this.$router.push({
                            name: 'Login',
                        });
                    }).catch(error => {
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        this.load = false;
                    })
                }
            },
            loginform(){
                   this.$router.push({
                             name: 'Login',
                            // path:'/login'
                    });
            },
            clear(){
                this.$refs.form.reset()
            }
            
        },
        watch:{
            loader () {
                const l = this.loader
                this[l] = !this[l]

                setTimeout(() => (this[l] = false), 3000)

                this.loader = null
            },
        },
    };
</script>