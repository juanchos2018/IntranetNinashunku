<template>
  <div>
    <a-button type="primary" @click="AbrirDialogo">
      AGREGAR FOTO
    </a-button>   

    <h5>Fotos del Eevnto {{nombreEvento}}</h5>
    <br /><br />

      <a-row type="flex" :gutter="24">
      <a-col
        :span="12"
        :xl="6"
        class="mb-24"
        v-for="item in itemFotosOrga"
        :key="item.id_foto"
      >
    <a-card hoverable style="width: 240px" >
      <img
        slot="cover"
        alt="example"
        :src="url_base+item.photo"
         width="100"
       height="200"
      />
      <a-card-meta :title="item.nombre_foto">
        <template slot="description">
         <p>{{item.descrip_foto}}</p>                
        </template>
        
      </a-card-meta>
      <template slot="actions" class="ant-card-actions">

      <a-icon key="edit" type="edit" @click="AbrirDialogoEdit(item.id_fotoeventoesorga)" />
          <a-icon type="zoom-in"  @click="show(item.id_fotoeventoesorga)"  />
          <a-icon type="delete" @click="Delete(item.id_fotoeventoesorga,item.photo)" />
    </template>
    </a-card>
        <!-- / Salary Card -->
      </a-col>
    </a-row>
 

    <a-modal :visible="modalVisible" :footer="null" @cancel="handleCancelModal">
      <a-form @submit.prevent="Validate">

        <a-form-item label="Nombre Foto">
              <a-input placeholder="Nombres" v-model="modelFotoOrga.nombre_foto">
          </a-input>
        </a-form-item>
        <!-- <a-form-item label="Descripcion">
          <a-input
                placeholder="descrip foto"
                v-model="modelFotoOrga.descrip_foto"
              >
              </a-input>
        </a-form-item> -->
        <a-form-item label="Foto">
          <a-upload
            list-type="picture-card"
             
            :file-list="fileList"
            :remove="handleRemove"
            @change="handleChange"
            :before-upload="beforeUpload"
            @preview="handlePreview"
          >
            <div v-if="fileList.length < 1">
              <a-icon type="plus" />
              <div class="ant-upload-text">
                Clic
              </div>
            </div>
          </a-upload>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">
            {{NombreBoton}}
          </a-button>
        </a-form-item>      
      </a-form>
    </a-modal>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
      <vue-easy-lightbox
      escDisabled
      moveDisabled
      :visible="visible"
      :imgs="imgs"
      :index="index"
      @hide="handleHide"
    ></vue-easy-lightbox>
        <Loanding :isVisible="isLoading"/>
  </div>
</template>

<script>
import axios from "axios";
const Swal = require("sweetalert2");
import VueEasyLightbox from 'vue-easy-lightbox'
import { mapState } from 'vuex'

import Loanding from './../Loanding/Loanding'


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  name: "fotos-organizacion",
  props:['id_orgaevento'],
  components:{VueEasyLightbox,    Loanding
},
  data() {
    return {    
         isLoading: false,
      modalVisible: false,
      estaodousuario: true,
      nombreEvento:'',
      validate: false,
      previewImage: "",
      NombreBoton:'GUARDAR',
      fileList: [],
      itemFotosOrga: [],
      previewVisible: false,
      modelFotoOrga: {
        id_fotoeventoesorga:0,
     
        nombre_foto: "",
        descrip_foto: "",
        photo: " ",
        portada: 1,
        id_orgaevento: 0,
        width: 0,
        height: 0,
        size:'mediun'
      },
      errors: {
        nombre_foto: false,
        descrip_foto: false,
        photo: false,
        portada:false,
        id_orgaevento:false,
      },
      visible: false,
      index: 0   // default: 0

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
      this.modelFotoOrga.id_orgaevento=this.id_orgaevento;
      this.ListPhtoOrga();
      this.InfoEvento();
  },
   computed:{
    ...mapState(['url_base']),
    imgs() {
      const arr = []
      this.itemFotosOrga.map(item => {
        arr.push(this.url_base+item.photo )
      })
      return arr
    },
  },
  methods: {
     Validate,
     show(id_fotoeventoesorga) {
      this.index=this.itemFotosOrga.findIndex(x=>x.id_fotoeventoesorga==id_fotoeventoesorga);   
      this.visible = true
    },
   handleHide() {
      this.visible = false
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handleCancelModal() {
      this.modalVisible = false;
    },
    AbrirDialogoEdit(id){
       this.fileList=[];
       this.previewImage="";
       this.NombreBoton="EDITAR";
       this.modelFotoOrga= {...this.itemFotosOrga.find(x=>x.id_fotoeventoesorga==id)}
       this.fileList.push({
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: this.url_base +this.modelFotoOrga.photo,
        }) 
       this.modalVisible = true;
    },    
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    handleChange(e) {
      let me =this;
      me.modelFotoOrga.photo = e.file;
      me.fileList = e.fileList;     
      if ( me.fileList.length>0) {
        var img = new Image();
        var URL = window.URL || window.webkitURL;       
        img.src = URL.createObjectURL(e.file);      
        img.onload = function () {
            var ancho = img.width;
            var alto = img.height;        
            me.modelFotoOrga.width=ancho;
            me.modelFotoOrga.height=alto;
         }     
      } 
    },
    mensje(){
       this.fileList=[]; 
      this.$message.error('Archivo no Aceptado!');
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'|| file.type === 'image/jpg';
      if (!isJpgOrPng) {
                
        this.mensje();

        return false;
      }
      this.fileList = [...this.fileList, file];
      return false;
    },
    async handlePreview(file) {   
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);      
      } 
      this.previewImage = this.fileList[0].thumbUrl;
      this.previewVisible = true;
    },
    AbrirDialogo() {
      this.fileList=[];
      this.modelFotoOrga.nombre_foto="";
      this.NombreBoton="GUARDAR";
      this.modalVisible = true;
    },    
    AddFotoOrga(){
      const data = new FormData();
      let me = this;  

       me.isLoading=true;
     // let url = "eventosfotosorgaAdd";
      let url =me.url_base+ "Control/OrgaFotosEvento.php";
      me.modelFotoOrga.descrip_foto="add";    
      if (typeof me.modelFotoOrga.photo === 'string' || me.modelFotoOrga.photo instanceof String)
      {     
             me.modelFotoOrga.portada=0;
      }
      else{   me.modelFotoOrga.portada=1}
   //    console.log(me.modelFotoOrga) 
      data.append("id_fotoeventoesorga", me.modelFotoOrga.id_fotoeventoesorga);
      data.append("descrip_foto", me.modelFotoOrga.descrip_foto);
      data.append("nombre_foto", me.modelFotoOrga.nombre_foto);
      data.append("id_orgaevento", me.modelFotoOrga.id_orgaevento);
      data.append("portada", me.modelFotoOrga.portada);   
      data.append("photo", me.modelFotoOrga.photo);        
      data.append("width", me.modelFotoOrga.width);
      data.append("height", me.modelFotoOrga.height);
      data.append("size", me.modelFotoOrga.size); 
     
      axios({
        method: "POST",
        url: url,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function(response) {
        //  console.log(response)
           me.isLoading=false;
          if (response.data.status == "200") {        
             me.MensajeOk("Registrado con Exito !")
             me.ListPhtoOrga();
          }
           else if(response.data.status="404"){
              Swal.fire({ icon: 'warning', text: response.data.response, timer: 3000,})
          }
         })
        .catch((error) => {
           me.isLoading=false;
          console.log(error);
        });
    },
    EditFotoOrga(){
      const data = new FormData();
      let me = this;
        me.isLoading=true;
      let url =me.url_base+ "Control/OrgaFotosEvento.php";
       me.modelFotoOrga.descrip_foto="edit";    
      if (typeof me.modelFotoOrga.photo === 'string' || me.modelFotoOrga.photo instanceof String)
      {     
             me.modelFotoOrga.portada=0;
      }
      else{   me.modelFotoOrga.portada=1}
      data.append("id_fotoeventoesorga", me.modelFotoOrga.id_fotoeventoesorga);
      data.append("nombre_foto", me.modelFotoOrga.nombre_foto);
      data.append("descrip_foto", me.modelFotoOrga.descrip_foto);
      data.append("id_orgaevento", me.modelFotoOrga.id_orgaevento);
      data.append("portada", me.modelFotoOrga.portada);
      data.append("photo", me.modelFotoOrga.photo);        
      data.append("width", me.modelFotoOrga.width);
      data.append("height", me.modelFotoOrga.height);
      data.append("size", me.modelFotoOrga.size);  
      axios({
        method: "POST",
        url: url,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function(response) {
            me.isLoading=false;
          if (response.data.status == "200") {        
             me.MensajeOk("Editado con Exito !")
             me.ListPhtoOrga();
          }
           else if(response.data.status="404"){
              Swal.fire({ icon: 'warning', text: response.data.response, timer: 3000,})
          }
        })
        .catch((error) => {
          console.log(error);
           me.isLoading=false;
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
///                  this.ClearText();
                   this.validateEquipo = false;
            }
       })
    },
    Eliminar(id,photo){
      let me = this;
      me.isLoading=true;
      me.modelFotoOrga.id_fotoeventoesorga=id;
      me.modelFotoOrga.photo=photo;
      const data = me.modelFotoOrga;    
    //  console.log(data); 
      let url =me.url_base+ "Control/OrgaFotosEvento.php";    
      axios({
        method: "DELETE",
        url: url,
        data: data,
        })
        .then(function(response) {
          me.isLoading=false;
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
           me.isLoading=false;
        });
    },
    Delete(id,photo){
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
          me.Eliminar(id,photo);
      }
      })
    },
    ListPhtoOrga(){
      let me = this;
      var items = [];
      let id_orgaevento=this.id_orgaevento;
     // let url = "eventoesfotosorgaList/"+id_orgaevento;
      let url =me.url_base+ "Control/OrgaFotosEvento.php?id_orgaevento="+id_orgaevento;
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
           me.itemFotosOrga = response.data.result;
          //	console.log(response)
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
    }
  },
};

function Validate() {  
  this.errors.nombre_foto = this.modelFotoOrga.nombre_foto == "" ? true : false;
  this.errors.photo = this.modelFotoOrga.photo == "" ? true : false;
  this.errors.id_orgaevento = this.modelFotoOrga.id_orgaevento ==0 ? true : false;  
 /// this.modelUsuario.id_tipousuario == 0 ? true : false;
  if (this.errors.nombre_foto) {
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
  if (this.errors.photo) {
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
  if (this.errors.id_orgaevento) {
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
      title: "Desea Registrar Foto?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Estoy de acuerdo!",
    }).then((result) => {
      if (result.value) {
        this.modalVisible = false;
        this.AddFotoOrga();
      }
    });
  }
}else if(this.NombreBoton=="EDITAR"){
    if (!this.validate) {
        Swal.fire({
        title: "Desea Editar Foto?",
        text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Estoy de acuerdo!",
        }).then((result) => {
        if (result.value) {          
            this.EditFotoOrga();             
        }
        });
    }
}
  
}


</script>

<style></style>
