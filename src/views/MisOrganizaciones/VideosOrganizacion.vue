<template>
  <div>
    <!-- <YouTubePlaylist :videos="arrayOfVideos"></YouTubePlaylist> -->
    <a-button type="primary" @click="AbrirDialogo">
      AGREGAR VIDEO
    </a-button>
    <h5>Videos del evento {{nombreEvento}}</h5>
    <br /><br />

    <a-row type="flex" :gutter="24">
      <a-col
        :span="12"
        :xl="8"
        class="mb-24"
        v-for="item in itemVideosOrga"
        :key="item.id_video"
      >
        <a-card hoverable style="width: 400">
          <img slot="cover" alt="example" src="/images/logoyoutube.png" />        
          <a-card-meta :title="item.nombre_video">
            <template slot="description">
              <p>{{ item.descrip_video }}</p>
            </template>
          </a-card-meta>
          <template slot="actions" class="ant-card-actions">
            <a-icon key="edit" type="edit" @click="AbrirDialogo2(item.id_videoventoorga)" />
            <a-icon type="play-circle" @click="handleshowDailog(item.idvideo)" />
            <a-icon type="delete" @click="Delete(item.id_videoventoorga)" />
          </template>
        </a-card>
        <!-- / Salary Card -->
      </a-col>
    </a-row>

    <a-modal :visible="modalVisible" :footer="null" @cancel="handleCancelModal">
      <a-form @submit.prevent="Validate">
        <a-row :gutter="[24, 24]">
          <a-col :span="24" :md="24">
            <a-form-item label="Nombre">
              <a-input
                placeholder="Nombre"
                v-model="modelVideoOrga.nombre_video"
              >
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>       
        <a-row :gutter="[24, 24]">
          <a-col :span="12" :md="24">
            <a-form-item label="Url Foto">
              <a-input
                placeholder="Url Foto"
                v-model="modelVideoOrga.urlvideo"
              >
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="[24, 24]">
          <a-col :span="24" :md="6">
            <a-form-item label="Registrar">
              <a-button type="primary" html-type="submit">
                  {{NombreBoton}}
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>

    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel" class="video-popup">
      <!-- <img alt="example" style="width: 100%" :src="previewImage" /> -->
       <youtube :video-id="videoId" ref="youtube" @playing="playing"   :width= "640"
            :height="360"  >
        </youtube>
    </a-modal>

<!-- 
  <a-modal :visible="previewVisibleVideoEDit" :footer="null" @cancel="handleCancel2" >
  
        <a-form @submit.prevent="Validate">
        <a-row :gutter="[24, 24]">
          <a-col :span="24" :md="24">
            <a-form-item label="Nombre">
              <a-input
                placeholder="Nombre"
                v-model="modelVideoOrga.nombre_video"
              >
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="[24, 24]">
          <a-col :span="24" :md="24">
            <a-form-item label="Descripcion">
              <a-input
                placeholder="descrip Video"
                v-model="modelVideoOrga.descrip_video"
              >
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="[24, 24]">
          <a-col :span="12" :md="24">
            <a-form-item label="Url Foto">
              <a-input
                placeholder="Url Foto"
                v-model="modelVideoOrga.urlvideo"
              >
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="[24, 24]">
          <a-col :span="24" :md="6">
            <a-form-item label="Registrar">
              <a-button type="primary" html-type="submit">
                EDITAR
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
     -->
  </div>
</template>

<script>
import Vue from "vue";
import VueYoutube from "vue-youtube";
import axios from "axios";
const Swal = require("sweetalert2");
import { mapState } from 'vuex'
Vue.use(VueYoutube);

export default {
  components: {},
  props:['id_orgaevento'],
  data() {
    return { 
      modalVisible: false,
      previewVisible: false,
      estaodousuario: true,
      previewVisibleVideo:false,
      previewVisibleVideoEDit:false,
      validate: false,
      NombreBoton:'GUARDAR',
      nombreEvento:'',
      modelVideoOrga: {
        id_videoventoorga:0,
        nombre_video: "",
        descrip_video: "",
        urlvideo: "",
        portada: 1,
        id_orgaevento:0,
        id_organizacion: 1       
      },
     modelVideoEdit: {
        nombre_video: "",
        descrip_video: "",
        urlvideo: "",
        portada: 1,
        id_organizacion: 1       
      },
       errors: {
        nombre_video: false,
        descrip_video: false,
        urlvideo: false,
        portada:false,
        id_organizacion:false 
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
    this.ListPhtoOrga();
    this.InfoEvento();
  },
  computed: {
    ...mapState(['url_base']),
    player() {
      return this.$refs.youtube.player;
    },
  },

  methods: {
    Validate,
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
      this.modelVideoOrga.idvideo=0;
      this.modelVideoOrga.nombre_video="";
      this.modelVideoOrga.descrip_video="";
      this.modelVideoOrga.urlvideo="";
      this.NombreBoton="GUARDAR";
      this.modalVisible = true;
    },
    AbrirDialogo2(idvideo) {
      this.NombreBoton="EDITAR";
      this.modelVideoOrga= {...this.itemVideosOrga.find(x=>x.id_videoventoorga==idvideo)}
      this.modalVisible = true;
    },

    playVideo() {
      this.player.playVideo();
    },
    playing() {
      console.log("\o/ we are watching!!!");
    },
    ListPhtoOrga() {
      let me = this;    
     // let url = "organizacionListVideos/" + id_organizacion;
      let url = me.url_base+ "Control/OrgaVideosEvento.php?id_orgaevento=" + me.id_orgaevento;
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          me.itemVideosOrga = response.data.result;
        //  console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    AddVideoOrga(){
      let me = this;
      const data = me.modelVideoOrga;     
      me.modelVideoOrga.id_orgaevento=me.id_orgaevento
      //let url = "organizacionAddVideo";  
     let url = me.url_base+ "Control/OrgaVideosEvento.php";    
      axios({
        method: "POST",
        url: url,
        data: data,
      })
        .then(function(response) {
          if (response.data.status == "200") {        
             me.MensajeOk("Registrado con Exito !")
             me.ListPhtoOrga();
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
      let url = me.url_base+ "Control/OrgaVideosEvento.php";   
      axios({
        method: "PUT",
        url: url,
        data: data,
      })
       .then(function(response) {
          //  console.log(response);
          if (response.data.status == "200") {        
             me.MensajeOk("Editado con Exito !")
             me.ListPhtoOrga();
          }
           else if(response.data.status="404"){
              Swal.fire({ icon: 'warning', text: response.data.msg, timer: 3000,})
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },


     InfoEvento(){
      let me = this;    
      let url = me.url_base+"Control/EventoOrganizacion.php?id_orgaevento=" + me.id_orgaevento;
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
        //   console.log(response);
           me.nombreEvento = response.data.result.nombre_evento;
         
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
     Eliminar(id){
      let me = this;
      me.modelVideoOrga.id_videoventoorga=id;
      const data = me.modelVideoOrga;    
   //   console.log(data); 
      let url =me.url_base+ "Control/OrgaVideosEvento.php";    
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
             me.ListPhtoOrga();       
            // me.ListEspacioPhotoEventos(me.modelFotoOrga.id_espacio,me.modelFotoOrga.id_eventoespacio);
                
          }
           else if(response.data.status="404"){
              Swal.fire({ icon: 'warning', text: response.data.msg, timer: 3000,})
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
    },
  },
};



function Validate() {  

  this.errors.nombre_video = this.modelVideoOrga.nombre_video == "" ? true : false;
  this.errors.urlvideo = this.modelVideoOrga.urlvideo == "" ? true : false;
  this.errors.id_organizacion = this.modelVideoOrga.id_organizacion ==0 ? true : false;  
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
              this.modalVisible = false;
        }
        });
    }
}
  
}


</script>

<style lang="scss" scoped>
@import './blog-style.scss';
</style>