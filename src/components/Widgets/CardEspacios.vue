<template>
  <!-- Salary Card -->
  <a-card :bordered="true"  class="widget-2 h-full cardstyle">
 <img
      slot="cover"
      alt="example"
      :src="photo"
       width="100"
       height="200"
    />
   
    <div style="padding: 8px;">
      	<strong><h5>{{nombre}}</h5> </strong>		
      <p>{{ descripcion }}</p>
    </div>
    <template slot="actions" class="ant-card-actions">
       <a-button type="primary" @click="Detail(id_espacio)">
          DETALLE
        </a-button>
       <a-button type="primary" @click="EventosEspacio(id_espacio)">
          EVENTOS
        </a-button>
      <!-- <a-icon type="picture" @click="EventosEspacio(id_espacio)" /> -->
      <!-- <a-icon type="video-camera" @click="videosOrganizacion(id_organizacion)" />
      <a-icon type="area-chart" /> -->
      <!-- <a-icon key="pircture" type="setting" /> -->
      <!-- <a-icon key="edit" type="edit" /> -->
      <!-- <a-icon key="ellipsis" type="ellipsis" /> -->
    </template>
  </a-card>
  <!-- / Salary Card -->
</template>

<script>
export default {
  name: "card-espacios",
  props: {
    id_espacio: {
      type: Number,
      default: 0,
    },
    estado: {
      type: String,
      default: "",
    },

    nombre: {
      type: String,
      default: "",
    },
    descripcion: {
      type: String,
      default: "",
    },
     photo: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
 methods:{
     EventosEspacio(id_espacio){
         console.log(id_espacio)
          /// this.$router.push({ name: "EventosEspacio" });
            this.$router.push({
              name: "EventosEspacio",
              params: { id_espacio: id_espacio},
        });
    },
    videosOrganizacion(id_organizacion){
        //  console.log(id_organizacion)
          this.$router.push({ name: "VideosOrganizacion" });
    },
    Detail(id){
//EspacioDetail
      this.$router.push({ name: "EspacioDetail" ,params:{ id_espacio:id}});
    }
 }
};
</script>
<style>
.cardstyle{
  border: 1px solid #1A86D0;
}
</style>