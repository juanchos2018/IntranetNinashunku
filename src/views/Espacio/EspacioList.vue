<template>
  <div>
    
<h5>Espacios de la Organizacion</h5>
 <a-button type="primary" @click="AddEspacio">
          AGREGAR ESPACIO
        </a-button>
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
      itemEspacios: []
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
    this.ListESpacios();
  },
  methods: {
      AddEspacio(){
        this.$router.push({ name: "EspacioAdd" });
      },     

    ListESpacios() {
      let me = this;
      let id_usuario = 1;
      var items = [];
      let url = me.url_base+"Control/espacioList.php";
     // let url = "espacioList/";
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          me.itemEspacios = response.data;
         // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
  },
};
</script>
