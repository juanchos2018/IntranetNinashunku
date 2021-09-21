<template>
  <!-- Active Users Card -->
  <a-card :bordered="false" class="video-popup">
      <!-- <youtube
          :video-id="modeliPordata.id_video"
          ref="youtube"
          @playing="playing"
          :width="640"
          :height="360"
        >
        </youtube> -->
        <!-- src="http://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com" -->
        <div>
          <iframe id="ytplayer" type="text/html" width="640" height="360"
  :src="'https://www.youtube.com/embed/' +modeliPordata.id_video +'?autoplay=1&origin=http://example.com'"
  frameborder="0"/>
        </div>
    <div class="card-title">
      <h6>{{modeliPordata.nombre_espacio}}</h6>
      <p>{{modeliPordata.nombre_evento}}</p>
    
    </div>
   
  </a-card>
  <!-- Active Users Card -->
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

// Bar chart for "Active Users" card.
import ChartBar from "../Charts/ChartBar";

export default {
  components: {
    ChartBar,
  },
  data() {
    return {
		 videoId: "lG0Ys-2d4MA",
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
              fecha  :''  ,
              link_video:'',

      },
      // Data for bar chart.
      barChartData: {
        labels: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
        datasets: [
          {
            label: "Sales",
            backgroundColor: "#fff",
            borderWidth: 0,
            borderSkipped: false,
            borderRadius: 6,
            data: [850, 600, 500, 620, 900, 500, 900, 630, 900],
            maxBarThickness: 20,
          },
        ],
      },
    };
  },
  computed: {
    ...mapState(["url_base"]),
	 player() {
      return this.$refs.youtube.player;
    },
  },
   mounted() {
    this.FirtVideoPortada();   
  },
   methods: {   
    playVideo() {
      this.player.playVideo();
    },
    playing() {
      console.log("\o/ we are watching!!!");
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
<style lang="scss" scoped>
@import './blog-style.scss';
</style>