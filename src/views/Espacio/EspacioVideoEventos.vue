<template>
  <div>
    <h5>Lista Videos Evento</h5>
    <!-- <YouTubePlaylist :videos="arrayOfVideos"></YouTubePlaylist> -->
    <a-button type="primary" @click="AbrirDialogo">
      AGREGAR VIDEO
    </a-button>
    <br /><br />
    <a-row type="flex" :gutter="24">
      <a-col
        :span="12"
        :xl="8"
        class="mb-24"
        v-for="item in itemVideosOrga"
        :key="item.id_videoventoespacio"
      >
      	<!-- <a-tag class="tag-status" :class="estado ? 'ant-tag-primary' : 'ant-tag-muted'">
					{{ estado ? "ACTIVO" : "INACTIVO" }}
				</a-tag> -->
        <a-card hoverable style="width: 400">
          <img slot="cover" alt="example" src="/images/logoyoutube.png" />        
          <a-card-meta :title="item.nombre_video">
            <template slot="description">
              <p>{{ item.descrip_video }}</p>
               <a-switch  :checked="item.tienda==1? true:false " @change=" (e) => onChange(e,item.id_videoventoespacio,item.idvideo,item.urlvideo,item.nombre_video)">
                  <a-icon slot="checkedChildren" type="check" />
                  <a-icon slot="unCheckedChildren" type="close" />
                </a-switch>
            </template>
          </a-card-meta>
          <template slot="actions" class="ant-card-actions">
            <a-icon key="edit" type="edit" @click="AbrirDialogo2(item.id_videoventoespacio)" />
            <a-icon type="play-circle" @click="handleshowDailog(item.idvideo)" />
            <a-icon type="delete"   @click="Delete(item.id_videoventoespacio)"/>
          </template>
        </a-card>
        <!-- / Salary Card -->
      </a-col>
    </a-row>

    <a-modal :visible="modalVisible" :footer="null" @cancel="handleCancelModal">
      <a-form @submit.prevent="Validate">
      <a-form-item label="Nombre">
           <a-input
                placeholder="Nombre"
                v-model="modelVideoOrga.nombre_video"
              >
          </a-input>
        </a-form-item>       
        <a-form-item label="Url">
         <a-input
                placeholder="Url "
                v-model="modelVideoOrga.urlvideo"
              >
              </a-input>
        </a-form-item>       
        <a-form-item label="">
          <a-button type="primary" html-type="submit">
              {{NombreBoton}}
          </a-button>
        </a-form-item>        
      </a-form>
    </a-modal>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel" class="video-popup">
      <!-- <img alt="example" style="width: 100%" :src="previewImage" /> -->
       <youtube :video-id="videoId" ref="youtube" @playing="playing"   :width= "640"
            :height="360">
        </youtube>
    </a-modal>
  </div>
</template>

<script>

import Vue from "vue";
import VueYoutube from "vue-youtube";
import axios from "axios";
const Swal = require("sweetalert2");
Vue.use(VueYoutube);
import { mapState } from 'vuex'

export default {
  components: {},
  props: ["datos"],
  data() {
    return {    
      che:true,
      modalVisible: false,
      previewVisible: false,
      estaodousuario: true,
      previewVisibleVideo:false,
      previewVisibleVideoEDit:false,
      validate: false,
      NombreBoton:'GUARDAR',
      modelVideoOrga: {
        id_videoventoespacio:0,
        nombre_video: "",
        descrip_video: "des",
        urlvideo: "",
        portada: 1,
        id_espacio: 0,
        id_eventoespacio:0, 
        tienda:0,
      },   
       errors: {
        nombre_video: false,
        descrip_video: false,
        urlvideo: false,
        portada:false,
        id_organizacion:false 
      },
      videosolicitud:{
        id_espacio:0,
        id_eventoespacio:0,
        id_videoventoespacio:0,
        estado:0,
        nombre_video:'',
        id_video:'',
        link_video:'',
        fecha:'',
      },
      itemVideosOrga: [],
      videoId: "lG0Ys-2d4MA",
      idone: "https://www.youtube.com/watch?v=5bZQzPayuKU",     
    };
  },
   created() {
			   const currentPath = this.$router.history.current.path;
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
  mounted() {
        if(this.datos){
          var aray=this.datos.split("-");
          var id_eventoespacio=aray[0];
          var id_espacio=aray[1];
          this.modelVideoOrga.id_eventoespacio=id_eventoespacio
          this.modelVideoOrga.id_espacio=id_espacio
       //  console.log("id_espacio :"+id_espacio)
          this.ListVideosEspacio(id_espacio,id_eventoespacio);
          this.videosolicitud.id_espacio=id_espacio;
          this.videosolicitud.id_eventoespacio=id_eventoespacio;

      }
  ///  this.ListPhtoOrga();
  },
  computed: {
    ...mapState(['url_base'])   ,
    player() {
      return this.$refs.youtube.player;
    },
  },

  methods: {
     Validate,
     onChange(eve,id_videoventoespacio,idvideo,urlvideo,nombrevideo) {
       //e,item.id_videoventoespacio,item.idvideo,item.urlvideo,item.nombre_video
       var mensaje =eve ==true ? "Desea agregar a solicitud ?":"Desea quitar a solicitud"
        Swal.fire({
        title: mensaje,
        text: "se enviara al adminisrador !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, enviar!'
      }).then((result) => {
        if (result.isConfirmed) {
          if (eve) {
             this.EnviarVideoSolicitud(id_videoventoespacio,idvideo,urlvideo,nombrevideo);
          }else{
             this.QuitarSolicitud(id_videoventoespacio);
          }
        }
      })    
    },
    QuitarSolicitud(id_videoventoespacio){
      let me = this;    
      let url =me.url_base+ "Control/VideoPeticion.php?id_videoventoespacio=" + id_videoventoespacio;
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          if (response.data.status == "200") {        
             me.MensajeOk("Se Quito con Exito !")
             me.ListVideosEspacio(me.modelVideoOrga.id_espacio,me.modelVideoOrga.id_eventoespacio);
          }
           else if(response.data.status="404"){
               alert("errror")
          //   Swal.fire({ icon: 'warning', text: response.data.msg, timer: 3000,})
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    EnviarVideoSolicitud(id_videoventoespacio,idvideo,urlvideo,nombrevideo){
      let me = this;
     
      me.videosolicitud.id_videoventoespacio= id_videoventoespacio;
      me.videosolicitud.estado= 1;
      me.videosolicitud.nombre_video= nombrevideo;
      me.videosolicitud.id_video= idvideo;
      me.videosolicitud.link_video= urlvideo;
       const data = me.videosolicitud; 
      let url = me.url_base+ "Control/VideoPeticion.php";  
      axios({
        method: "POST",
        url: url,
        data: data,
      })
        .then(function(response) {
             console.log(response);
          if (response.data.status == "200") {        
             me.MensajeOk("Se envio con Exito !")
             me.ListVideosEspacio(me.modelVideoOrga.id_espacio,me.modelVideoOrga.id_eventoespacio);
          }
           else if(response.data.status="404"){
        //       alert("errror")
            Swal.fire({ icon: 'warning', text: response.data.response, timer: 3000,})
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleCancel() {
      this.previewVisible = false;
     //   this.dialog = false
      this.player.pauseVideo()
    },
     handleshowDailog(idvi) {
      this.videoId=idvi;
      this.previewVisible = true;
    },
    handleCancel2(){
         this.previewVisibleVideoEDit= false;   
    },
    handleCancelModal() {
      this.modalVisible = false;
    //      this.modelVideoOrga.idvideo=0;
    //   this.modelVideoOrga.nombre_video="";
    //   this.modelVideoOrga.descrip_video="";
    //   this.modelVideoOrga.urlvideo="";
    },
    AbrirDialogo() {
      //this.modelVideoOrga.idvideo=0;
      ///this.modelVideoOrga.nombre_video="";
     // this.modelVideoOrga.descrip_video="";
     // this.modelVideoOrga.urlvideo="";
      this.NombreBoton="GUARDAR";
      this.modalVisible = true;
    },
    AbrirDialogo2(idvideo) {
      this.NombreBoton="EDITAR";
     // this.modelVideoEdit=  this.itemVideosOrga.find(x=>x.id_video==idvideo);
       this.modelVideoOrga= {...this.itemVideosOrga.find(x=>x.id_videoventoespacio==idvideo)}
       this.modalVisible = true;
    },

    playVideo() {
      this.player.playVideo();
    },
    playing() {
      console.log("\o/ we are watching!!!");
    },
    ListVideosEspacio(id_espacio,id_eventoespacio) {
      let me = this;     
      let id_organizacion = 1;
      let url =me.url_base+ "Control/EventoVideosEspacio.php?id_espacio=" + id_espacio+"&id_eventoespacio="+id_eventoespacio;
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          me.itemVideosOrga = response.data.result;
         /// console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    AddVideoOrga(){
      let me = this;
      const data = me.modelVideoOrga;     
   //   let url = "eventovideosespacioAdd";    
       let url = me.url_base+ "Control/EventoVideosEspacio.php";  
      axios({
        method: "POST",
        url: url,
        data: data,
      })
        .then(function(response) {
          if (response.data.status == "200") {        
             me.MensajeOk("Registrado con Exito !")
             me.ListVideosEspacio(me.modelVideoOrga.id_espacio,me.modelVideoOrga.id_eventoespacio);
             me.Limpiar();
          }
           else if(response.data.status="404"){
               alert("errror")
          //    Swal.fire({ icon: 'warning', text: response.data.msg, timer: 3000,})
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    EditVideoOrga(){
      let me = this;
      const data = me.modelVideoOrga;    
     // console.log(data); 
      let url =me.url_base+ "Control/EventoVideosEspacio.php";    
      axios({
        method: "PUT",
        url: url,
        data: data,
      })
        .then(function(response) {
          //  console.log(response);          
          if (response.data.status == "200") {    
              me.modalVisible = false;    
             me.MensajeOk("Editado con Exito !")            
             me.ListVideosEspacio(me.modelVideoOrga.id_espacio,me.modelVideoOrga.id_eventoespacio);
       // this.modelVideoOrga.id_eventoespacio=id_eventoespacio
       //   this.modelVideoOrga.id_espacio=id_espacio
             // console.log(me.modelVideoOrga)
             me.Limpiar();
             
          }
           else if(response.data.status="404"){
              Swal.fire({ icon: 'warning', text: response.data.msg, timer: 3000,})
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    Eliminar(id){
      let me = this;
      me.modelVideoOrga.id_videoventoespacio=id;
      const data = me.modelVideoOrga;    
      console.log(data); 
      let url =me.url_base+ "Control/EventoVideosEspacio.php";    
      axios({
        method: "DELETE",
        url: url,
        data: data,
        })
        .then(function(response) {
          //  console.log(response);          
          if (response.data.status == "200") {    
             me.modalVisible = false;    
             me.MensajeOk("Eliminado con Exito !")            
             me.ListVideosEspacio(me.modelVideoOrga.id_espacio,me.modelVideoOrga.id_eventoespacio);
    
           
             me.Limpiar();
          }
           else if(response.data.status="404"){
              Swal.fire({ icon: 'warning', text: response.data.msg, timer: 3000,})
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
     MensajeOk(mensaje){
        Swal.fire({
            title: 'Exito!',
            text: mensaje,        
            icon: 'success',     
            showCancelButton: false,
            confirmButtonColor: '#3085d6',          
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
                //  this.ClearText();
                this.validateEquipo = false;
            }
       })
    },
    Limpiar(){
        this.modelVideoOrga.nombre_video="";
             this.modelVideoOrga.descrip_video="des";
             this.modelVideoOrga.urlvideo="";
    },
    Delete(id){
     let me =this;
      Swal.fire({
      title: 'Desea Eliminar?',
      text: "Ya no podra revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
       }).then((result) => {
      if (result.isConfirmed) {
          me.Eliminar(id);
        }
      })
    }
  },
};



function Validate() {  

  this.errors.nombre_video = this.modelVideoOrga.nombre_video == "" ? true : false;
  this.errors.urlvideo = this.modelVideoOrga.urlvideo == "" ? true : false;
  this.errors.id_organizacion = this.modelVideoOrga.id_organizacion == 0 ? true : false;  
 /// this.modelUsuario.id_tipousuario == 0 ? true : false;
  if (this.errors.nombre_video) {
    this.validate = true;
    Swal.fire({
      icon: "warning",
      text: "Verifique que campos necesarios esten llenados nom",
      timer: 2000,
    });
    return false;
  } else {
    this.validate = false;
  }  
  if (this.errors.urlvideo) {
    this.validate = true;
    Swal.fire({
      icon: "warning",
      text: "Verifique que campos necesarios esten llenados foto",
      timer: 2000,
    });
    return false;
  } else {
    this.validate = false;
  }
  if (this.errors.id_organizacion) {
    this.validate = true;
    Swal.fire({
      icon: "warning",
      text: "falta codigo Organizacion",
      timer: 2000,
    });
    return false;
  } else {
    this.validate = false;
  }
 

if (this.NombreBoton=="GUARDAR") {
    if (!this.validate) {
    Swal.fire({
      title: "Desea Registrar Video?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Estoy de acuerdo!",
    }).then((result) => {
      if (result.value) {
         this.modalVisible = false;
         this.AddVideoOrga();
      }
    });
  }
}else if(this.NombreBoton=="EDITAR"){
    if (!this.validate) {
        Swal.fire({
        title: "Desea Editar Video?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Estoy de acuerdo!",
        }).then((result) => {
        if (result.value) {
          
            this.EditVideoOrga();
             
        }
        });
    }
}
  
}


</script>

<style lang="scss" scoped>
@import './blog-style.scss';
</style>