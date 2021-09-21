<template>
  <!-- Salary Card -->
  <a-card :bordered="true"  class="widget-2 h-full cardstyle">" >
 <!-- <img
      slot="cover"
      alt="example"
      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    /> -->
   
    <div style="padding: 10px;">
      		<strong><h5>{{nombre}}</h5> </strong>		
      <p>{{ descripcion }}</p>
      <p>{{ fecha }}</p>
    </div>
    <template slot="actions" class="ant-card-actions">
       <a-tooltip placement="top">
        <template slot="title">
          <span>Fotos</span>
        </template>
        <a-icon type="picture" @click="EventosEspacio(id_eventoespacio,id_espacio)" />
      </a-tooltip>
     
      <a-tooltip placement="top">
        <template slot="title">
          <span>Videos</span>
        </template>
       <a-icon type="video-camera" @click="videosOrganizacion(id_eventoespacio,id_espacio)" />
      </a-tooltip>
         <a-tooltip placement="top">
        <template slot="title">
          <span>Noticias</span>
        </template> 
      <a-icon type="area-chart" @click="noticasespaciovento(id_espacio,id_eventoespacio)" />    
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
  name: "card-eventos-espacio",
  props: {
    id_eventoespacio: {
      type: Number,
      default: 0,
    },
    id_espacio:{
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
      fecha: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
 methods:{
     EventosEspacio(id_eventoespacio,id_espacio){
       //   var datos=id_eventoespacio+"-"+id_espacio
          var datos=id_espacio+"-"+id_eventoespacio
       //    console.log("idepscio ="+id_espacio+"-"+ "id_eventoespacio : "+ id_eventoespacio);
        
            this.$router.push({
              name: "EspacioEventosFotos",
              params: { datos: datos},
        });
    },
    videosOrganizacion(id_eventoespacio,id_espacio){
          var datos=id_eventoespacio+"-"+id_espacio
          this.$router.push({ name: "EspacioVideoEspacio" ,  params: { datos: datos},});
    },
    noticasespaciovento(id_espacio,id_eventoespacio){
           var datos=id_espacio+"-"+id_eventoespacio
          this.$router.push({ name: "EspacioNoticiasList" ,  params: { datos: datos},});
    }
 }
};
</script>
<style>
.cardstyle{
  border: 1px solid #1A86D0;
}
</style>