<template>
    <v-main>
        <h1 class="txtdetail">Detail Produk {{produk.nama_produk}}</h1>
        <v-container>
            <v-card style="padding:10px; position:relative; overflow:hidden; box-shadow:0px 2px 6px rgba(0,0,0,0.05)">
                <!-- <v-container>
                    <div class="row">
                        <div class="col">
                            <v-img class="gambar" :src="'http://localhost:8000/storage/'+produk.gambar_produk"></v-img>
                        </div>
                        <div class="col">
                            <h1>{{ produk.nama_produk }}</h1>
                        </div>
                        <div class="col">
                              <h1>{{ produk.harga_produk}}</h1>
                        </div>
                    </div>

                </v-container> -->
                <v-row>
                    <v-col md="6">
                        <v-img class="gambar" :src="'http://localhost:8000/storage/'+produk.gambar_produk"></v-img>
                    </v-col>
                    <v-col md="6">
                        <div class="pembungkus text-left">
                            <v-chip class="ma-0" color="primary">
                                {{ produk.kategori_produk.kategori }}
                            </v-chip>
                            <div>
                                <div class="stok">
                                    {{ produk.stok }}
                                </div>
                                <h1 class="txtNamaProduk" style="color:#143651;">{{ produk.nama_produk }}</h1>
                                <h3 class="txtHargaProduk" style="color:#143651;">Rp.
                                    {{ produk.harga_produk.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") }}
                                </h3>
                                <div style="max-height:150px !important; overflow-y:auto; margin-top:20px;">
                                    <p class="text-secondary text-left">
                                        {{ produk.deskripsi_produk }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>

        <v-container>
            <h1 class="mb-5">Diskusi</h1>
            <v-row>
                <v-col v-for="(item, index) in komentar" :key="index" cols="12" sm="12">
                    <v-card style="box-shadow:0px 2px 6px rgba(0,0,0,0.05)">
                        <v-container>
                            <v-card-title>
                                <div class="row">
                                    <div class="col">
                                        <b>
                                            <p class="text-start txtNamaUser">{{ item.user.name }}</p>
                                        </b>
                                    </div>
                                    <div class="col text-end" v-if="currentUser == item.id_user">
                                        <v-icon dense color="green" @click="editItem(item)">
                                            mdi-pencil
                                        </v-icon>
                                        <v-icon dense color="red" @click="deleteItem(item)">
                                            mdi-delete
                                        </v-icon>
                                    </div>
                                </div>
                                <v-container>
                                    <div class="row">
                                        <p class="txtKomentar">{{ item.komentar }}</p>
                                    </div>
                                </v-container>
                            </v-card-title>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-dialog v-model="dialog" persistent>
            <v-card min-width="600px" style="box-shadow:0px 2px 6px rgba(0,0,0,0.05)">
                <v-card-title>
                    <h3>Update Komentar</h3>
                </v-card-title>
                <v-card-text>
                    <v-container fluid>
                        <v-textarea v-model="form.komentar" name="input-7-1" filled label="Masukkan Komentar" auto-grow>
                        </v-textarea>
                    </v-container>
                </v-card-text>
                <v-card-action>
                    <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="setForm">Post Komentar</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning !</span>
                </v-card-title>
                <v-card-text>Anda yakin ingin menghapus komentar ini?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancelDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>

        <v-container>
            <v-row>
                <v-col md="12">
                    <h1 class="mb-5">Kolom Komentar</h1>
                    <v-card style="box-shadow:0px 2px 6px rgba(0,0,0,0.05)">
                        <v-card-title>
                            <h3>Tambahkan Komentar</h3>
                        </v-card-title>
                        <v-card-text>
                            <v-container fluid>
                                <v-textarea v-model="form.komentar" name="input-7-1" filled label="Masukkan Komentar"
                                    auto-grow>
                                </v-textarea>
                            </v-container>
                        </v-card-text>
                        <v-card-action>
                            <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="setForm">Post Komentar</v-btn>
                        </v-card-action>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }}</v-snackbar>
    </v-main>
</template>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700&family=Poppins:wght@700&display=swap');

    .txtNamaProduk {
        font-family: 'Roboto', sans-serif !important;
        font-size: 30px !important;
    }

    .txtHargaProduk {
        font-family: 'Manrope', sans-serif;
        color: rgba(25, 118, 210, 0.7) !important;
    }

    /* .gambar{
        width: 100%;
    } */
    .txtdetail {
        margin-top: -60px;
    }

    .txtKomentar {
        text-align: justify;
    }

    .stok {
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(25, 118, 210, 0.2);
        font-family: 'Manrope', sans-serif;
        padding: 10px 20px;
        border-radius: 0 0 0px 20px;
        color: #1976d2;
    }
</style>
<script>
    export default {
        name: "DetailProduk",
        data() {
            return {
                produk: '',
                items: [],
                inputType: 'Tambah',
                load: false,
                snackbar: false,
                error_message: '',
                color: '',
                search: null,
                dialog: false,
                dialogConfirm: false,
                isDisabled: false,
                currentUser: '',
                headers: [{
                        text: "Kategori",
                        align: "start",
                        sortable: true,
                        value: "kategori"
                    },
                    {
                        text: "Actions",
                        value: "actions"
                    }
                ],
                diskusi: new FormData,
                komentar: [],
                form: {
                    komentar: null,
                    id: null,
                },
                deleteId: '',
                editId: ''
            };
        },
        methods: {
            setForm() {
                if (this.inputType !== 'Tambah') {
                    this.update();

                } else {
                    this.save();


                }
            },
            readData() {
                var url = this.$api + '/detailproduk/' + this.$route.params.id + '/diskusi/';
                this.$http.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.diskusis = response.data.data;
                })
            },
            save() {
                this.diskusi.append('komentar', this.form.komentar);
                this.diskusi.append('id_produk', this.$route.params.id);
                this.diskusi.append('id_user', localStorage.getItem('id'));

                var url = this.$api + '/detailproduk/' + this.$route.params.id + '/diskusi/';
                this.load = true;

                this.$http.post(url, this.diskusi, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = true;
                    this.close();
                    this.readData();
                    this.resetForm();
                    this.getKomentar();
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            update() {

                this.diskusi.append('komentar', this.form.komentar);
                this.diskusi.append('id_produk', this.$route.params.id);
                this.diskusi.append('id_user', localStorage.getItem('id'));
                this.diskusi.append('_method', 'PUT');
                var url = this.$api + '/detailproduk/' + this.$route.params.id + '/diskusi/' + this.editId;
                this.load = true;
                this.$http.post(url, this.diskusi, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = false;
                    this.close();
                    this.readData();
                    this.resetForm();
                    this.inputType = 'Tambah';
                    this.getKomentar();
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            deleteData() {
                var url = this.$api + '/detailproduk/' + this.$route.params.id + '/diskusi/' + this.deleteId;
                this.load = true;
                this.$http.delete(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.error_message = response.data.message;
                    this.color = "green";
                    this.snackbar = true;
                    this.load = false;
                    this.close();
                    this.readData();
                    this.resetForm();
                    this.inputType = "Tambah";
                    this.getKomentar();
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            editItem(item) {
                this.inputType = 'Ubah';
                this.editId = item.id;
                this.form.komentar = item.komentar;
                this.dialog = true;
            },
            deleteItem(item) {
                this.deleteId = item.id;
                this.dialogConfirm = true;
            },
            close() {
                this.dialog = false;
                this.inputType = 'Tambah';
                this.dialogConfirm = false;
                this.readData();
            },
            cancel() {
                this.resetForm();
                this.readData();
                this.dialog = false;
                this.dialogConfirm = false;
                this.inputType = 'Tambah';
            },
            cancelDelete() {
                this.dialogConfirm = false;
            },
            resetForm() {
                this.form = {
                    name: null,
                    email: null,
                    password: null
                };
            },
            getIdDetail() {
                console.log(this.$route.params.id);
                this.$http.get(this.$api + '/detailproduk/' + this.$route.params.id, {
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
            getKomentar() {
                this.$http.get(this.$api + '/detailproduk/' + this.$route.params.id + '/diskusi/', {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }

                    })
                    .then(response => {

                        this.komentar = response.data.data

                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
        mounted() {
            this.getIdDetail();
            this.getKomentar();
            this.currentUser = localStorage.getItem('id');
        },
    };
</script>