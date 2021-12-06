<template>
    <div class="dashboard">
        <v-navigation-drawer v-model="drawer" class="fullheight" width="256" app>
            <v-list-item class="kotaknama">
                <v-list-item-content>
                    <v-img src="http://localhost:8082/img/logo te.png" width="200px" height="52px">

                    </v-img>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list dense nav v-if="loggedIn && loggedInAdmin">
                <v-list-item-group color="#082032">
                    <v-list-item v-for="item in items" :key="item.title" link tag="router-link" :to="item.to"
                        style="text-decoration: none; padding: 0 50px; letter-spacing: 0 !important;">
                            <v-list-item-icon style="margin-right: 10px;">
                                <v-icon v-text="item.icon" class="icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title style="text-align: left;">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <v-list dense nav v-if="loggedIn && !loggedInAdmin">
                 <v-list-item-group color="#082032">
                    <v-list-item v-for="item in itemsuser" :key="item.title" link tag="router-link" :to="item.to"
                        style="text-decoration: none; padding: 0 50px; letter-spacing: 0 !important;">
                            <v-list-item-icon style="margin-right: 10px;">
                                <v-icon v-text="item.icon" class="icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-title style="text-align: left;">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app fixed height="75px" style="box-shadow:none; background-color:white; border-bottom:1.5px solid rgba(0,0,0,0.12);">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <VSpacer />
            <v-toolbar-items>
                <v-btn @click="logout" router style="box-shadow:none;background-color:white; border-bottom:1.5px solid rgba(0,0,0,0.12);">
                    <v-icon>mdi-power</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <div class="grey lighten-4 fullheight pa-5">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Dashboard",
        data() {
            return {
                drawer: true,
                items: [{
                        title: "Dashboard",
                        to: "/dashboard",
                        icon: 'mdi-home'
                    },
                    {
                        title: 'KategoriProduk',
                        to: '/kategoriproduk',
                        icon: 'mdi-shape'
                    },
                    {
                        title: 'Produk',
                        to: '/produk',
                        icon: 'mdi-cellphone-link'
                    },

                ],
                itemsuser: [
                    {
                        title: "Dashboard",
                        to: "/dashboard",
                        icon: 'mdi-home'
                    },
                    {
                    
                        title: "Profile User",
                        to: "/detailprofile",
                        icon: 'mdi-account'
                    },
                    {
                        title: 'Tampil Produk',
                        to: '/tampilproduk',
                        icon: 'mdi-format-list-bulleted'
                    },
                ],
            };
        },
        methods: {
            logout() {
                localStorage.removeItem('id');
                localStorage.removeItem('token');
                localStorage.removeItem('email');
                // location.reload();
                this.$router.push('/login');
            }
        },
        computed: {
            loggedIn() {
                return localStorage.getItem("token") != null;
            },
            loggedInAdmin() {
                return localStorage.getItem("email") == "gesha@tokoelektronik.com";
            },
        }
    };
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700&family=Poppins:wght@700&display=swap');

    .fullheight {
        min-height: 100vh !important;
    }

    .router {
        text-decoration: none;
        color: black;
    }

    .txtTitle {
        font-family: 'Manrope', sans-serif;
    }

    /* .icon{
        padding-top: 40px;
    } */
</style>
<style>
    .kotaknama {
        background-color: #082032;
    }

    .title {
        color: white;

    }
</style>