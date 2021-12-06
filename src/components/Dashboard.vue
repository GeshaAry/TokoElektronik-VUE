<template>
  <v-main>
    <v-container>
      <v-container>
        <v-row v-if="admin == 'gesha@tokoelektronik.com' ">

          <v-col>
            <div class="kotaklenght">
              <p> PRODUK </p>
              <p class="txtLength">{{ produk.length }}</p>
            </div>
          </v-col>
          <v-col>
            <div class="kotaklenght">
              <p> KATEGORI PRODUK </p>
              <p class="txtLength">{{ kategoriproduk.length }}</p>
            </div>
          </v-col>
          <v-col>
            <div class="kotaklenght">
              <p> KOMENTAR </p>
              <p class="txtLength">{{ diskusi.length }}</p>
            </div>
          </v-col>
        </v-row>



        <v-row v-else style="height:100%;">
          <v-row class="justify-center align-center" style="height:100%" >
            <v-col cols="12">
              <v-card style="background-color:#082032;">
              <v-img src="http://localhost:8082/img/logo te.png" width="100px" height="32px"></v-img>
              <h1 style="color:white; padding:20px;">Selamat Datang, {{ user.name }}</h1>
              </v-card>
            </v-col>
          </v-row>
        </v-row>
      </v-container>
    </v-container>
    <v-img max-width="400px" height="350px" class="hiasanKiri" src="http://localhost:8082/img/intersection 1.png">
    </v-img>
  </v-main>

</template>
<script>
  export default {
    data() {
      return {
        produk: [],
        kategoriproduk: [],
        diskusi: [],
        admin: '',
        user: [],
      };
    },
    mounted() {
      this.$http.get(this.$api + '/produk/', {
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

      this.$http.get(this.$api + '/kategoriproduk/', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(response => {
          this.kategoriproduk = response.data.data
        })
        .catch(error => {
          console.log(error)
        })

      this.$http.get(this.$api + '/diskusi/', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(response => {
          this.diskusi = response.data.data
        })
        .catch(error => {
          console.log(error)
        })

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

      this.admin = localStorage.getItem('email');
    }
  }
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@800&family=Poppins:wght@700&display=swap');

  .txtLength {
    font-family: 'Manrope', sans-serif;
    font-size: 80px;
    color: white;
  }

  .txtDashboard {
    font-family: 'Poppins', sans-serif;
    font-size: 60px;
    margin-top: -50px;
  }

  .kotaklenght {
    width: 250px;
    height: 200px;
    background-color: #082032;
    border-radius: 20px;
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column-reverse;
  }

  .kotaklenght p:first-child {
    font-family: 'Manrope', sans-serif;
    color: #f0a500;
  }

  .hiasanKiri {
    position: fixed;
    bottom: 0;
    margin-left: -30px;

  }

  .v-application p {
    margin-bottom: 0 !important;
  }
</style>