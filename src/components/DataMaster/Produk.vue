<template>
    <v-main class="list">

        <v-card style="overflow:hidden; box-shadow:0px 2px 6px rgba(0,0,0,0.05)">
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search Produk" single-line hide-details>
                </v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="dialog = true"> Tambah </v-btn>
            </v-card-title>
            <v-data-table :headers="headers" :items="produks" :search="search">
                <template v-slot:[`item.status_produk`]="{ item }">
                    <span v-if="item.status_produk == 0">Private</span>
                    <span v-else>Public</span>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon dense color="green" @click="editHandler(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon dense color="red" @click="deleteHandler(item.id)">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>

        <v-row>
            <v-col md="12">
                <v-dialog v-model="dialog" persistent>
                    <v-card>
                        <v-card-text>
                            <v-container v-if="inputType == 'Tambah'">
                                <v-card-title>
                                    <span class="headline">Tambah Produk</span>
                                </v-card-title>
                                <v-file-input rounded filled prepend-icon="mdi-camera" label="File input" id="file"
                                    ref="fileGambar"></v-file-input>
                                <v-select filled rounded append-icon="mdi-shape" v-model="selectKategori" :items="items"
                                    item-text="kategori" item-value="id" label="Pilih Kategori Produk" persistent-hint
                                    return-object single-line></v-select>
                                <v-text-field filled rounded append-icon="mdi-rename-box" v-model="form.nama_produk"
                                    label="Nama Produk" required></v-text-field>
                                <v-text-field filled rounded append-icon="mdi-currency-usd" v-model="form.harga_produk"
                                    label="Harga Produk" required></v-text-field>
                                <v-textarea filled rounded append-icon="mdi-image-text" v-model="form.deskripsi_produk"
                                    name="input-7-1" label="Deskripsi Produk"></v-textarea>
                                <v-select filled rounded append-icon="mdi-list-status" v-model="selectStatusProduk"
                                    :items="itemsStatusProduk" item-text="name" item-value="id"
                                    label="Pilih Status Produk" persistent-hint return-object single-line></v-select>
                                <v-text-field filled rounded append-icon="mdi-list-status" v-model="form.stok"
                                    label="Stok Produk" required></v-text-field>
                            </v-container>
                            <v-container v-else-if="inputType == 'Ubah'">
                                 <v-card-title>
                                    <span class="headline">Ubah Produk</span>
                                </v-card-title>
                                <v-flex align-center>
                                    <v-img width="550px"
                                        :src="previewImageUrl == '' ? 'http://localhost:8000/storage/'+form.gambar_produk : previewImageUrl"
                                        id="previewImage" class="mb-5"></v-img>
                                </v-flex>
                                <v-file-input rounded filled prepend-icon="mdi-camera" @change="onPreviewImage"
                                    label="File input" id="file"></v-file-input>
                                <v-select filled rounded append-icon="mdi-shape" v-model="selectKategori" :items="items"
                                    item-text="kategori" item-value="id" label="Pilih Kategori Produk" persistent-hint
                                    return-object single-line></v-select>
                                <v-text-field filled rounded append-icon="mdi-rename-box" v-model="form.nama_produk"
                                    label="Nama Produk" required></v-text-field>
                                <v-text-field filled rounded append-icon="mdi-currency-usd" v-model="form.harga_produk"
                                    label="Harga Produk" required></v-text-field>
                                <v-textarea filled rounded append-icon="mdi-image-text" v-model="form.deskripsi_produk"
                                    name="input-7-1" label="Deskripsi Produk" hint="Hint text"></v-textarea>
                                <v-select filled rounded append-icon="mdi-list-status" v-model="selectStatusProduk"
                                    :items="itemsStatusProduk" item-text="name" item-value="id"
                                    label="Pilih Status Produk" persistent-hint return-object single-line></v-select>
                                <v-text-field filled rounded append-icon="mdi-list-status" v-model="form.stok"
                                    label="Stok Produk" required></v-text-field>
                            </v-container>
                        </v-card-text>
                        <v-card-action>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="setForm">Save</v-btn>
                        </v-card-action>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>

        <v-dialog v-model="dialogConfirm" persistent max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline">Warning !</span>
                </v-card-title>
                <v-card-text>Anda yakin ingin menghapus data ini?</v-card-text>
                <v-card-action>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancelDelete">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteData">Delete</v-btn>
                </v-card-action>
            </v-card>
        </v-dialog>
        <!-- <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> 
            <ul v-for="(a, b) in error_message" :key="b">
                <li v-for="(item, index) in a" :key="index">
                        {{ item }}
                </li>
            </ul>
        </v-snackbar> -->
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom> {{ error_message }}</v-snackbar>
    </v-main>
</template>
<script>
    export default {
        name: "List",
        data() {
            return {
                selectKategori: '',
                selectStatusProduk: '',
                items: [],
                inputType: 'Tambah',
                load: false,
                snackbar: false,
                error_message: [],
                color: '',
                search: null,
                dialog: false,
                dialogConfirm: false,
                isDisabled: false,
                previewImageUrl: '',
                itemsStatusProduk: [{
                        id: 0,
                        name: 'Private'
                    },
                    {
                        id: 1,
                        name: 'Public'
                    }
                ],
                headers: [{
                        text: "Nama Produk",
                        align: "start",
                        sortable: true,
                        value: "nama_produk"
                    },
                    {
                        text: "Kategori Produk",
                        value: "kategori_produk.kategori"
                    },
                    {
                        text: "Harga Produk",
                        value: "harga_produk"
                    },
                    {
                        text: "Deskripsi Produk",
                        value: "deskripsi_produk"
                    },
                    {
                        text: "Status Produk",
                        value: 'status_produk'
                    },
                    {
                        text: "Stok Produk",
                        value: 'stok'
                    },
                    {
                        text: "Actions",
                        value: "actions"
                    }
                ],
                produk: new FormData,
                produks: [],
                form: {
                    nama_produk: '',
                    selectKategori: '',
                    harga_produk: '',
                    deskripsi_produk: '',
                    gambar_produk: '',
                    selectStatusProduk: '',
                },
                deleteId: '',
                editId: ''
            };
        },
        methods: {
            onPreviewImage(e) {

                this.previewImageUrl = URL.createObjectURL(e)
            },
            setForm() {
                if (this.inputType !== 'Tambah') {
                    this.update();

                } else {
                    this.save();


                }
            },
            getAllCategory() {
                var url = this.$api + '/kategoriproduk';
                this.$http.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.items = response.data.data;
                })
            },
            readData() {
                var url = this.$api + '/produk';
                this.$http.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.produks = response.data.data;
                })
            },
            save() {
                this.produk.append('nama_produk', this.form.nama_produk);
                this.produk.append('id_kategori', this.selectKategori.id ?? '');
                this.produk.append('harga_produk', this.form.harga_produk);
                this.produk.append('deskripsi_produk', this.form.deskripsi_produk);
                this.produk.append('status_produk', this.selectStatusProduk.id ?? '');
                this.produk.append('stok', this.form.stok);
                var inputGambar = document.getElementById('file'),
                    dataFile = inputGambar.files[0];
                this.produk.append('gambar_produk', dataFile);

                var url = this.$api + '/produk/'
                this.load = true;

                this.$http.post(url, this.produk, {
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
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            update() {
                var data = new FormData(),
                    inputGambar = document.getElementById('file'),
                    dataFile = inputGambar.files[0];

                data.append('nama_produk', this.form.nama_produk);
                data.append('harga_produk', this.form.harga_produk);
                data.append('deskripsi_produk', this.form.deskripsi_produk);
                data.append('id_kategori', this.selectKategori.id);
                data.append('status_produk', this.selectStatusProduk.id);
                data.append('stok', this.form.stok);
                data.append('_method', 'PUT');

                if (dataFile) {
                    data.append('gambar_produk', dataFile);
                }

                var url = this.$api + '/produk/' + this.editId;
                this.load = true;


                this.$http.post(url, data, {
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
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            deleteData() {
                var url = this.$api + '/produk/' + this.deleteId;
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
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                    this.load = false;
                });
            },
            editHandler(item) {
                this.inputType = 'Ubah';
                this.editId = item.id;
                this.form.nama_produk = item.nama_produk;
                this.form.harga_produk = item.harga_produk;
                this.form.deskripsi_produk = item.deskripsi_produk;
                this.form.gambar_produk = item.gambar_produk;
                this.form.id_kategori = item.kategori_produk.id;
                this.selectKategori = {
                    id: item.kategori_produk.id,
                    kategori: item.kategori_produk.kategori
                }
                this.selectStatusProduk = this.itemsStatusProduk[item.status_produk];
                this.form.stok = item.stok;
                this.dialog = true;
            },
            deleteHandler(id) {
                this.deleteId = id;
                this.dialogConfirm = true;
            },
            close() {
                this.dialog = false;
                this.inputType = 'Tambah';
                this.dialogConfirm = false;
                this.readData();

            },
            cancel() {
                this.readData();
                this.dialog = false;
                this.dialogConfirm = false;
                this.inputType = 'Tambah';
                this.selectKategori = '';
                this.selectStatusProduk = '';
                this.resetForm();
            },
            cancelDelete() {
                this.dialogConfirm = false;
            },
            resetForm() {
                this.form = {
                    nama_produk: '',
                    selectKategori: '',
                    harga_produk: '',
                    deskripsi_produk: '',
                    gambar_produk: '',
                    selectStatusProduk: '',
                };
                this.$refs.fileGambar.reset();
            },
        },
        computed: {
            formTitle() {
                return this.inputType;
            },
        },
        mounted() {
            this.readData();
            this.getAllCategory();
        },
    };
</script>