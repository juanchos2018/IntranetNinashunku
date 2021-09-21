<template>
  <div>
    
<h5>Espacios de la Organizacion</h5>
 
<br><br>
    <a-row type="flex" :gutter="24">
      <a-col
        :span="12"
        :xl="6"
        class="mb-24"
        v-for="item in itemEspacios"
        :key="item.id_espacio"
      >
        <card-espacios
          :id_espacio="parseInt( item.id_espacio)"
          :nombre="item.nombre_espacio"
          :descripcion="item.telefono"
          :photo="url_base+item.photo"
        ></card-espacios>
        <!-- / Salary Card -->
      </a-col>
    </a-row>
 

  </div>
</template>

<script>
import axios from "axios";
const Swal = require("sweetalert2");
import { mapState } from 'vuex'
import CardEspacios from "@/components/Widgets/CardEspacios";
export default {
  name: "mis-organizaciones",
  components: {
    
    CardEspacios,
  },
  data() {
    return {
      itemEspacios: [],
      id_usuario:'',
   ///   urlApi:'http://localhost:8000/',
    };
  },
  created() {
			 //  const currentPath = this.$router.history.current.path;
        if (!this.$session.exists()) {
            this.$router.push('/login').catch(err => {
                if (
                err.name !== 'NavigationDuplicated' &&
                !err.message.includes('Evitó la navegación redundante a la ubicación actual')
                ) {
            
                console(err);
                }
            });
        }
	},
  computed: {
    ...mapState(['url_base'])   
  },
  mounted() {
    if(localStorage.id_usuario) this.id_usuario = localStorage.id_usuario;
    this.ListESpacios(this.id_usuario);
  },
  methods: {      

    ListESpacios(id_usuario) {
      let me = this;     
      let url = me.url_base+"Control/EspacioUsuario.php?id_usuario="+id_usuario;
     
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
              me.itemEspacios = response.data.result;
        //   console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
  },
};
</script>
