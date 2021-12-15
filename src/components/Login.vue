<template>
    <main>
        <v-container fluid fill-height class="posisinya">
            <v-layout flex align-center justify-center>
                <v-flex xs6 sm4 elevation-1 kotaklogin class="displaynone">
                    <div>
                        <v-card class="background" style="box-shadow:none; background-color:white;">
                            <v-img src="./img/foto.png" class="gambar"></v-img>

                        </v-card>
                    </div>
                </v-flex>
                <v-flex xs6 sm elevation-1 class="lebarCardResponsive">
                    <v-card class="kotaklogin" min-width="600px" min-height="400px">
                        <v-card-text class="pt-4" style="box-shadow:none; background-color:white;">
                            <div>
                                <v-card-title>
                                    <v-layout class="d-flex justify-center">
                                        <h2 class="textLogin">Login</h2>
                                    </v-layout>
                                </v-card-title>
                            </div>
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field filled rounded append-icon="mdi-email" label="E-mail" v-model="email"
                                        :rules="emailRules" required></v-text-field>
                                    <v-text-field filled rounded append-icon="mdi-lock" label="Password"
                                        v-model="password" type="password" min="8" :rules="passwordRules" required>
                                    </v-text-field>
                                    <v-layout class="d-flex justify-center button">
                                        <v-btn class="mr-2" @click="submit" :loading="loading" :disabled="loading"
                                            :class=" { 'grey darken-1 white--text' :valid, disabled: !valid }">Login
                                        </v-btn>
                                        <v-btn @click="clear" class="grey darken-3 white--text">Clear</v-btn>
                                    </v-layout>
                                    <v-layout class="d-flex justify-center">
                                        <p class="textTanya">Belum punya akun?</p>
                                        <p @click="registerform" class="registertext"> Register disini !</p>
                                    </v-layout>
                                    <!-- <v-layout justify-end>
                                        <p @click="registerform" class="registertext"> Register disini !</p>
                                    </v-layout> -->
                                </v-form>
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }}
                    </v-snackbar>
                    <v-snackbar v-model="success" color="green" timeout="2000" bottom> Berhasil Verifikasi Email
                    </v-snackbar>
                </v-flex>
            </v-layout>
        </v-container>
    </main>
</template>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

    .grey--text {
        font-family: 'Poppins', sans-serif;
    }

    .textselamat {
        color: white;
        text-align: center;
    }

    .kotakungu {
        background-color: #082032;
    }

    .posisinya {
        position: absolute;
        top: 20px;
        left: 0;
        right: 0;
    }

    .registertext {
        cursor: pointer !important;
        color: blue !important;
        margin-right: 38px !important;
        margin-top: 30px !important;
        font-size: 80% !important;
    }

    .registertext:hover {
        color: #082032 !important;
        transition: 0.5 !important;
    }

    .kotaklogin {
        height: 400px;
        background-color: #082032;
    }

    .gambar {
        width: 100% !important;
        background-position-x: center !important;
        background-position-y: center !important;
        position: absolute;
        top: 10px !important;
    }

    .textLogin {
        color: #082032;

    }

    .textTanya {
        color: #082032 !important;
        margin-right: -95px !important;
        margin-top: 15px !important;
        font-size: 90% !important;
    }

    .button {
        margin-top: 30px;
    }

    .background {
        background-color: transparent !important;
        box-shadow: none !important;
        justify-content: center !important;
        display: flex !important;
        width: 500px;
    }

    .justified {
        justify-content: end !important;
    }

    @media screen and (max-width: 768px) {
        .displaynone {
            display: none;
        }

        .gambar {
            display: none;
        }

        .kotaklogin {
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
        name: "Login",
        data() {
            return {
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                valid: false,
                password: '',
                success: false,
                loader : null,
                loading : false,
                passwordRules: [
                    (v) => !!v || 'Password tidak boleh kosong :(',
                ],
                email: '',
                emailRules: [
                    (v) => !!v || 'Email tidak boleh kosong',
                ]
            };
        },
        methods: {
            submit() {

                    this.loader = 'loading';
                if (this.$refs.form.validate()) {
                    //cek validasi data yang terkirim
                    this.load = true;
                    this.$http.post(this.$api + '/login', {
                        email: this.email,
                        password: this.password
                    }).then(response => {
                        //simpan data id user yang diinput
                        localStorage.setItem('id', response.data.user.id);
                        localStorage.setItem('token', response.data.access_token);
                        localStorage.setItem('email', response.data.user.email);
                        this.error_message = response.data.message;
                        this.color = "green";
                        this.snackbar = true;
                        this.load = false;
                        this.clear();
                        this.$router.push({
                            name: 'Dashboard',
                        });
                        // if(this.email != "gesha@tokoelektronik.com"){
                        //         this.$router.push({
                        //         name: 'TampilProduk',
                        //     });
                        // }else{

                        // // }
                        // location.reload();
                        // this.email = '';
                    }).catch(error => {
                        this.error_message = error.response.data.message;
                        this.color = "red";
                        this.snackbar = true;
                        localStorage.removeItem('token');
                        this.load = false;
                    })
                }
            },
            clear() {
                this.$refs.form.reset()
            },
            registerform() {
                this.$router.push({
                    name: 'Register',
                });
            },
            showVerified() {
                if (this.$route.query.verified == 'success') {
                    this.success = true;
                    this.$router.push(
                        '/login'
                    );
                }
            }
        },
        mounted() {
            this.showVerified();
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