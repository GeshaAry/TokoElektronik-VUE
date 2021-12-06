<template>
    <v-main>
        <v-toolbar color="#082032">
            <v-toolbar-side-icon><img src="../assets/logo te.png" height="55"></v-toolbar-side-icon>
            <v-toolbar-title class="mx-0" v-text="title"></v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn depressed color="#082032"  @click="registerForm"><a style="color: #ffffff;">Register</a></v-btn>
                <v-btn depressed color="#082032"  @click="loginForm"><a style="color: #ffffff;">Login</a></v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <img src="../assets/LandingPageImage.jpg" style="width: 100%; background-size: cover;">

        <section>
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <v-flex xs12 sm4>
                        <v-card class="elevation-0">
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline">
                                    <b>TOKO ELEKTRONIK</b>
                                </div>
                            </v-card-title>

                            <v-card-text>
                                Toko elektronik merupakan web e-commerce sederhana yang memiliki produk elektronik seperti handphone, laptop, keyboard, dan berbagai alat elektronik lainnya.
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </section>
        
        <section>
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <v-flex col-sm4>
                        <v-card class="elevation-0">
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline">
                                    <b>ABOUT US </b>
                                </div>
                            </v-card-title>
                                
                            <div data-aos="fade-up" class="row">
                                <div class="penampung col-md-4">
                                    <div class="kotakmember">
                                        <img class="rounded-circle"
                                            src="../assets/gesha.png"
                                            width="200"
                                            alt=""
                                        >
                                        <p class="text-center mt-4 tulisannama"> <b>Made Gesha Ary Nugraha</b></p>
                                        <p class="text-center">190710109</p>
                                    </div>
                                </div>
                    
                                <div class="penampung col-md-4 ">
                                    <div class="kotakmember">
                                        <img class="rounded-circle"
                                            src="../assets/jessica.png"
                                            width="200"
                                            alt=""
                                        >
                                        <p class="text-center mt-4 tulisannama"> <b> Jessica Sanchia </b></p>
                                        <p class="text-center ">190710164</p>
                                    </div>
                                </div>
        
                                <div class="penampung col-md-4">
                                    <div class="kotakmember">
                                        <img class="rounded-circle"
                                            src="../assets/paramitha.jpg"
                                            width="200"
                                            alt=""
                                        >
                                        <p class="text-center mt-4 tulisannama"> <b> Paramitha Kencana Kinasih </b></p>
                                        <p class="text-center ">190710508</p>
                                    </div>
                                </div>
                            </div>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </section>

        <v-footer flat color="#082032">
            <v-col class="text-center" style="color: #ffffff;">
                Made with 
                <v-icon class="icon" style="color: #e25555;">mdi-heart</v-icon> 
                Kelompok Tubes UAS
            </v-col>
        </v-footer>
    </v-main>
</template>

<script>
export default {
    methods: {
        registerForm(){
            this.$router.push({
                name: 'Register',
            });
        },

        loginForm(){
            this.$router.push({
                name: 'Login',
            });
        },
    }
}
</script>
<style>
    *{
        margin: 0;
        padding: 0;
    }
    #app{
        margin-top: 0 !important;
    }
</style>