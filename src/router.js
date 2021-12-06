import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

function importComponent(path){
    return () => import(`./components/${path}.vue`);
}

const router = new VueRouter({
    mode: "history",
    routes:[
         //login
        {
            path : '/',
            name : 'Homepage',
            meta: { title: 'Homepage'},
            component: importComponent('Homepage'),
        },
        {
            path: "",
            component: importComponent("DashboardLayout"),
            children:[
                //Dashboard
                {
                    path: "/dashboard",
                    name: "Dashboard",
                    meta: { title: 'Dashboard', requireAuth: true},
                    component: importComponent("Dashboard"),
                },
                //KategoriProduk
                {
                    path: "/kategoriproduk",
                    name: "KategoriProduk",
                    meta: { title: 'KategoriProduk', requireAuth: true},
                    component: importComponent("DataMaster/KategoriProduk"),
                },
                  //Produk
                {
                    path: "/produk",
                    name: "Produk",
                    meta: { title: 'Produk', requireAuth: true},
                    component: importComponent("DataMaster/Produk"),
                },
                
                {
                    path : "/tampilproduk",
                    name: "TampilProduk",
                    meta : {title : 'Tampil Produk', requireAuth: true},
                    component: importComponent("DataMaster/TampilProduk"),
                },
                  {
                    path : "/detailproduk/:id",
                    name: "DetailProduk",
                    meta : {title : 'Detail Produk', requireAuth: true},
                    component: importComponent("DetailProduk"),
                },
                 {
                    path : "/detailprofile",
                    name: "DetailProfile",
                    meta : {title : 'Detail Profile', requireAuth: true},
                    component: importComponent("DetailProfile"),
                }

            ],
        },
       
           //login
        {
            path : '/login',
            name : 'Login',
            meta: { title: 'Login'},
            component: importComponent('Login'),
        },
        //register
        {
            path : '/register',
            name : 'Register',
            meta: {title: 'Register'},
            component: importComponent('Register'),
        },
      
        {
            path: '*',
            redirect: '/'
        },
    ],
});
//set judul
router.beforeEach((to, from, next) =>{

    if(to.name == "Dashboard" && localStorage.getItem("token") == null ||
    to.name == "DetailProduk" && localStorage.getItem("token") == null ||to.name == "DetailProfile" && localStorage.getItem("token") == null ||
    to.name == "TampilProduk" && localStorage.getItem("token") == null || to.name == "Produk" && localStorage.getItem("token") == null ||
    to.name == "KategoriProduk" && localStorage.getItem("token") == null){
        next({ name: "Homepage" })
        document.to.meta.title = "Homepage"
    }

    if(to.name == "Homepage" && localStorage.getItem("token") != null){
        next({ name: "Dashboard" })
        document.to.meta.title = "Dashboard"
    }

    //user biasa
   if(to.name == "TampilProduk" && localStorage.getItem("email") == "gesha@tokoelektronik.com" && localStorage.getItem("token") != null ||
   to.name == "DetailProfile" && localStorage.getItem("email") == "gesha@tokoelektronik.com" && localStorage.getItem("token") != null ||
   to.name == "DetailProduk" && localStorage.getItem("email") == "gesha@tokoelektronik.com" && localStorage.getItem("token") != null){
       next({ name: "Homepage" })
       document.to.meta.title = "Homepage"
   }

   //admin
   if(to.name == "KategoriProduk" && localStorage.getItem("email") != "gesha@tokoelektronik.com" && localStorage.getItem("token") != null ||
   to.name == "Produk" && localStorage.getItem("email") != "gesha@tokoelektronik.com" && localStorage.getItem("token") != null
   ){
       next({ name: "Homepage" })
       document.to.meta.title = "Homepage"
   }

    if(to.name == "Login" &&  localStorage.getItem("token") != null ||
   to.name == "Register" &&  localStorage.getItem("token") != null ){
       next({ name: "Dashboard" })
       document.to.meta.title = "Dashboard"
   }

   document.title = to.meta.title;

   next();

});
export default router;