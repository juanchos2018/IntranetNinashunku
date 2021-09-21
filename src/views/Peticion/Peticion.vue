<template>
  <div> 
    <a-card hoverable class="video-popup">
      <center>
        <!-- <youtube
          :video-id="modeliPordata.id_video"
          ref="youtube"
          @playing="playing"
          :width="640"
          :height="360"
        >
        </youtube> -->
         <iframe id="ytplayer" type="text/html" width="640" height="360"
  :src="'https://www.youtube.com/embed/' +modeliPordata.id_video +'?autoplay=0&origin=http://example.com'"
  frameborder="0"/>
      </center>
        <a-card-meta :title="modeliPordata.nombre_espacio" :description="modeliPordata.nombre_evento">
      </a-card-meta>
    </a-card>
    <br />

    <a-row :gutter="24" type="flex">
      <a-col :span="24" class="mb-24">
        <!-- Authors Table Card -->
        <TablaPeticion
          :data="itemPetciones"
          :columns="table1Columns"
          v-on:Agrega-Tabla="FirtVideoPortada"
        ></TablaPeticion>
      </a-col>
    </a-row>
    <!-- / Authors Table -->
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
const Swal = require("sweetalert2");
import VueYoutube from "vue-youtube";
Vue.use(VueYoutube);
import { mapState } from "vuex";
import TablaPeticion from "@/components/Tablas/TablaPeticion";
Vue.prototype.$eventHub = new Vue();

export default {
  components: {
    TablaPeticion,
  },
  data() {
    return {
      videoId: "lG0Ys-2d4MA",
      itemPetciones: [],
      modeliPordata:{ 
          id_portada:0,
              id_espacio        :'',
              nombre_espacio       :'',
              id_eventoespacio   :'',
              nombre_evento       :'',
              id_videoventoespacio :'',
              nombre_video       :'',
              id_video        :'',             
              $tarea:'',
              fecha  :''  

      },

      table1Columns: [
        {
          title: "Espacio",
          dataIndex: "nombre_espacio",
          scopedSlots: { customRender: "nombre_espacio" },
        },
        {
          title: "Evento",
          dataIndex: "nombre_evento",
          scopedSlots: { customRender: "nombre_evento" },
        },
        {
          title: "Video",
          dataIndex: "nombre_video",
        },
        {
          title: "Link",
          dataIndex: "link_video",
          scopedSlots: { customRender: "link" },
        },
        {
          title: "Fecha",
          dataIndex: "fecha",
        },
        {
          title: "",
          scopedSlots: { customRender: "editBtn" },
          width: 60,
        },
      ],
    };
  },
  created(){
     this.$eventHub.$on('Listar', this.impirme);
  },
  mounted() {
    this.usuarioList();
    this.FirtVideoPortada();
   
  },
  computed: {
    ...mapState(["url_base"]),
  },
  methods: {   
 
      playing() {
      console.log("\o/ we are watching!!!");
    },
    usuarioList() {
      let me = this;
      var items = [];
      let url = me.url_base + "Control/VideoPeticion.php";    
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          me.itemPetciones = response.data.result;
         // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    FirtVideoPortada(){
      let me = this;    
      let url = me.url_base + "Control/VideoPortada.php";     
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {        
          me.modeliPordata=response.data.result;
        //  console.log(response);
        })
        .catch((error) => {
          console.log(error);
       });
    }
  },
};
</script>

<style lang="scss"></style>
