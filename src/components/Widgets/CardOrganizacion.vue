<template>
  <!-- Salary Card -->
  <a-card :bordered="true"  class="widget-2 h-full">
 <img
      slot="cover"
      alt="example"
      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    />
   	<template #title>
	<strong><h5>{{nombre}}</h5> </strong>		
			
			</template>
    <div style="padding: 20px;">
      	
      <p>{{ descripcion }}</p>
    </div>
    <template slot="actions" class="ant-card-actions">
      <a-icon type="picture" @click="fotosOrganizacion(id_organizacion)" />
      <a-icon type="video-camera" @click="videosOrganizacion(id_organizacion)" />
      <a-icon type="area-chart" />
      <!-- <a-icon key="pircture" type="setting" /> -->
      <!-- <a-icon key="edit" type="edit" /> -->
      <!-- <a-icon key="ellipsis" type="ellipsis" /> -->
    </template>
  </a-card>
  <!-- / Salary Card -->
</template>

<script>
export default {
  name: "card-organizacion",
  props: {
    id_organizacion: {
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
  },
  data() {
    return {};
  },
 methods:{
     fotosOrganizacion(id_organizacion){
       //  console.log(id_organizacion)
          this.$router.push({ name: "FotosOrganizacion" });
    },
    videosOrganizacion(id_organizacion){
        /// console.log(id_organizacion)
          this.$router.push({ name: "VideosOrganizacion" });
    }
 }
};
</script>
