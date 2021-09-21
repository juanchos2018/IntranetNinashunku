import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [{
        // will match everything
        path: '*',
        component: () =>
            import ('../views/404.vue'),
    },
    {
        path: '/',
        name: 'Home',
        mode: 'history',
        redirect: '/dashboard',
    },
    {
        path: '/dashboard',
        mode: 'history',
        name: 'Dashboard',
        layout: "dashboard",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    },
    {
        path: '/layout',
        name: 'Layout',
        layout: "dashboard",
        component: () =>
            import ('../views/Layout.vue'),
    },
    {
        path: '/tables',
        name: 'Tables',
        layout: "dashboard",
        component: () =>
            import ('../views/Tables.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login.vue'),
    },
    {
        path: '/billing',
        name: 'Billing',
        layout: "dashboard",
        component: () =>
            import ('../views/Billing.vue'),
    },
    {
        path: '/usuarios',
        name: 'Usuarios',
        layout: "dashboard",
        component: () =>
            import ('../views/Usuario/UsuarioList.vue'),
    },
    {
        path: '/usuariosadd',
        name: 'UsuariosAdd',
        layout: "dashboard",
        component: () =>
            import ('../views/Usuario/UsuarioAdd.vue'),
    },
    {
        path: '/organizacion',
        name: 'Organizacion',
        layout: "dashboard",
        component: () =>
            import ('../views/Organizacion/OrganizacionList.vue'),
    },
    {
        path: '/artes',
        name: 'Artes',
        layout: "dashboard",
        component: () =>
            import ('../views/Artes/ArtesList.vue'),
    },

    {
        path: '/artesadd',
        name: 'ArtesAdd',
        layout: "dashboard",
        component: () =>
            import ('../views/Artes/ArtesAdd.vue'),
    },



    {
        path: '/organizacionadd',
        name: 'OrganizacionAdd',
        layout: "dashboard",
        component: () =>
            import ('../views/Organizacion/OrganizacionAdd.vue'),
    },
    {
        // path: "equipodetail/:id_equipo",
        path: '/organizaciondetail/:id_organizacion',
        name: 'OrganizacionDetail',
        layout: "dashboard",
        props: true,
        component: () =>
            import ('../views/Organizacion/OrganizacionDetail.vue'),
    },



    {
        path: '/misOrganizaciones',
        name: 'MisOrganizaciones',
        layout: "dashboard",
        component: () =>
            import ('../views/MisOrganizaciones/MisOrganizaciones.vue'),
    },

    {
        path: '/fotosOrganizacion/:id_orgaevento',
        name: 'FotosOrganizacion',
        layout: "dashboard",
        props: true,
        component: () =>
            import ('../views/MisOrganizaciones/FotosOrganizacion.vue'),
    },

    {
        path: '/videoorganevento/:id_orgaevento',
        name: 'VideoOrganEvento',
        layout: "dashboard",
        props: true,
        component: () =>
            import ('../views/MisOrganizaciones/VideosOrganizacion.vue'),
    },

    {
        path: '/equipotecnicolis',
        name: 'EquipoTecnicoList',
        layout: "dashboard",
        props: true,
        component: () =>
            import ('../views/Equipo/EquipoList.vue'),
    },
    {
        path: '/equipotecnicoadd',
        name: 'EquipoTecnicoAdd',
        layout: "dashboard",
        props: true,
        component: () =>
            import ('../views/Equipo/EquipoAdd.vue'),
    },







    {
        path: '/espaciolist',
        name: 'EspacioList',
        layout: "dashboard",
        component: () =>
            import ('../views/Espacio/EspacioList.vue'),
    },
    {
        path: '/espacioadd',
        name: 'EspacioAdd',
        layout: "dashboard",
        component: () =>
            import ('../views/Espacio/EspacioAdd.vue'),
    },
    {
        path: "/eventosespacio/:id_espacio",
        //   path: '/eventosespacio',
        name: 'EventosEspacio',
        layout: "dashboard",
        props: true,
        component: () =>
            import ('../views/Espacio/EspacioEventos.vue'),
    },
    {
        path: "/eventosfotospacio/:datos",
        name: 'EspacioEventosFotos',
        layout: "dashboard",
        props: true,
        component: () =>
            import ('../views/Espacio/EspacioEventosFotos.vue'),
    },
    {
        path: "/eventosvideoespacio/:datos",
        name: 'EspacioVideoEspacio',
        layout: "dashboard",
        props: true,
        component: () =>
            import ('../views/Espacio/EspacioVideoEventos.vue'),
    },

    {
        path: "/eventosnoticaespacio/:datos",
        name: 'EspacioNoticiasList',
        layout: "dashboard",
        props: true,
        component: () =>
            import ('../views/Espacio/EspacioNoticiasList.vue'),
    },
    {
        path: "/eventosnoticaespacioadd/:datos",
        //   path: "/eventosnoticaespacioadd",
        name: 'EspacioNoticiaAdd',
        layout: "dashboard",
        props: true,
        component: () =>
            import ('../views/Espacio/EspacioNoticiaAdd.vue'),
    },
    {
        path: "/eventosnoticaespacioedit/:datos",
        //   path: "/eventosnoticaespacioadd",
        name: 'EspacioNoticiaEdit',
        layout: "dashboard",
        props: true,
        component: () =>
            import ('../views/Espacio/EspacioNoticiaEdit.vue'),
    },
    //EspacioNoticiaEdit
    {
        path: "/eventosorga",
        name: 'EventosOrganizacion',
        layout: "dashboard",
        props: true,
        component: () =>
            import ('../views/MisOrganizaciones/EventosOrganizacion.vue'),
    },

    {
        path: '/peticiones',
        name: 'Peticiones',
        layout: "dashboard",

        component: () =>
            import ('../views/Peticion/Peticion.vue'),
    },
    {
        path: '/espacio',
        name: 'Espacio',
        layout: "dashboard",
        component: () =>
            import ('../views/Espacio/Espacio.vue'),
    },

    {
        path: '/espacioDetail/:id_espacio',
        name: 'EspacioDetail',
        layout: "dashboard",
        props: true,
        component: () =>
            import ('../views/Espacio/EspacioDetail.vue'),
    },
    {
        path: '/Profile',
        name: 'Profile',
        layout: "dashboard",
        meta: {
            layoutClass: 'layout-profile',
        },
        component: () =>
            import ('../views/Profile.vue'),
    },
    {
        path: '/sign-in',
        name: 'Sign-In',
        component: () =>
            import ('../views/Sign-In.vue'),
    },
    {
        path: '/sign-up',
        name: 'Sign-Up',
        meta: {
            layoutClass: 'layout-sign-up',
        },
        component: () =>
            import ('../views/Sign-Up.vue'),
    },
]

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute(route, parentLayout = "default") {
    route.meta = route.meta || {};
    route.meta.layout = route.layout || parentLayout;

    if (route.children) {
        route.children = route.children.map((childRoute) => addLayoutToRoute(childRoute, route.meta.layout));
    }
    return route;
}

routes = routes.map((route) => addLayoutToRoute(route));

const router = new VueRouter({
    mode: 'hash',
    //  mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash,
                behavior: 'smooth',
            }
        }
        return {
            x: 0,
            y: 0,
            behavior: 'smooth',
        }
    }
})

export default router