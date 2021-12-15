<template>
    <v-main class="list">
        <v-row style="max-width:900px; margin:0 auto;">
        <v-col md="12" class="slideCol">
            <v-carousel cycle height="400" class="mb-5" hide-delimiter-background show-arrows-on-hover>
                <v-carousel-item style="height:auto !important;" v-for="(slide, i) in slides" :key="i" :src="slide.src">
                </v-carousel-item>
            </v-carousel>
        </v-col>
        <template>
            <v-row class="rowProduk" style="max-width:900px;">
                <v-col v-for="(item, index) in produk" :key="index" md="4">
                    <v-card style="width: 100%; max-width: 395px; overflow:hidden; box-shadow:0px 2px 6px rgba(0,0,0,0.05)">
                        <v-img class="white--text align-end" :src="$baseUrl+'/public/storage/'+item.gambar_produk">
                        </v-img>

                        <v-chip class="mt-2 mb-2 mr-0 ml-2" style="float:left;" color="primary">
                            {{ item.kategori_produk.kategori }}
                        </v-chip>

                        <div class="stok">
                            {{ item.stok }}
                        </div>
                        <h1 class="txtNamaProduk" style="clear:both;">
                            {{ item.nama_produk }}
                        </h1>

                        <p class="text--primary">
                            Harga : Rp.{{ item.harga_produk.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") }}
                        </p>

                        <v-card-actions>
                            <v-flex align-center>
                                <v-btn @click="detailProduk(item.id)" color="#143651" outlined>
                                    Detail Produk
                                </v-btn>
                            </v-flex>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </template>
        </v-row>
    </v-main>
</template>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700&family=Poppins:wght@700&display=swap');

    .txtNamaProduk {
        font-family: 'Poppins', sans-serif;
        font-size: 20px;
        color: #143651;
    }

     .stok{
        position: absolute;
        top: 30;
        right: 0;
        background-color: rgba(25, 118, 210, 0.2);
        font-family: 'Manrope', sans-serif;
        padding: 10px 20px;
        border-radius: 0 0 0px 20px;
        color: #1976d2;
    }

    .rowProduk{
        margin: 0px auto;
    }

    @media screen and (max-width:768px) {
        .slideCol{
            padding: 0;
        }
        .rowProduk{
            margin: -12px !important;
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                produk: [],
                colors: [
                    'indigo',
                    'warning',
                    'pink darken-2',
                    'red lighten-1',
                    'deep-purple accent-4',
                ],
                slides: [{
                        src: './img/gambariphone.jpg',
                    },
                    {
                        src: './img/gambarrog.jpg',
                    },
                    {
                        src: './img/gambarsamsung.jpg',
                    },
                ],
            };
        },
        mounted() {
            this.$http.get(this.$api + '/produk?status=1', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    this.produk = response.data.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        methods: {
            detailProduk(id_produk) {
                this.$router.push({
                    name: 'DetailProduk',
                    params: {
                        id: id_produk
                    }
                });
            }
        },
    };
</script>