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
   
    <div style="padding: 10px;">
      		<strong><h5>{{nombre}}</h5> </strong>		
      <p>{{ descripcion }}</p>
    </div>
    <template slot="actions" class="ant-card-actions">
         <a-tooltip placement="top">
        <template slot="title">
          <span>Fotos</span>
        </template>
      <a-icon type="picture" @click="EventosEspacio(id_orgaevento,id_organizacion)" />
      </a-tooltip>

 <a-tooltip placement="top">
        <template slot="title">
          <span>Videos</span>
        </template>
       <a-icon type="video-camera" @click="videosOrganizacion(id_orgaevento,id_organizacion)" />
      </a-tooltip>

<a-tooltip placement="top">
        <template slot="title">
          <span>Noticias</span>
        </template>
  <a-icon type="area-chart" />    
  
     </a-tooltip>

      <!-- <a-icon key="pircture" type="setting" /> 
       <a-icon key="edit" type="edit" /> 
       <a-icon key="ellipsis" type="ellipsis" /> -->
    </template>
  </a-card>
  <!-- / Salary Card -->
</template>

<script>
export default {
  name: "card-eventos-organizacion",
  props: {
    id_orgaevento: {
      type: Number,
      default: 0,
    },
    id_organizacion:{
       type:Number,
       default:0 
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
    return {     

    };
  },
 methods:{
     EventosEspacio(id_orgaevento,id_espacio){
        // var datos=id_eventoespacio+"-"+id_espacio
         console.log(id_orgaevento+"-"+id_espacio);        
            this.$router.push({
              name: "FotosOrganizacion",
              params: { id_orgaevento: id_orgaevento},
        });
    },
    videosOrganizacion(id_orgaevento,id_espacio){
        //  var datos=id_espacio+"-"+id_eventoespacio
          this.$router.push({ name: "VideoOrganEvento" ,  params: { id_orgaevento: id_orgaevento},});
    }
 }
};
</script>
<style>
.cardstyle{
  border: 1px solid #1A86D0;
}
</style>