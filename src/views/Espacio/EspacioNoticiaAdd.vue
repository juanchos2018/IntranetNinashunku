<template>
  <div>
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 4,}">
    <a-form @submit.prevent="Validate">
      <a-row :gutter="[24, 24]">
        <a-col :span="24" :md="8">
          <a-form-item label="titulo">
            <a-input placeholder="titulo" v-model="modelNoticiaOrga.titulo">
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="24" :md="16">
          <a-form-item label="parrafo">          
                <a-textarea
                v-model="modelNoticiaOrga.parrafo"
                placeholder="parafoo"
                :auto-size="{ minRows: 3, maxRows: 5 }"
                />
           
          </a-form-item>
        </a-col>       
      </a-row>

      <a-row :gutter="[24, 24]">
        <a-col :span="24" :md="8">
          <a-form-item label="Url video">
            <a-input placeholder="Url video" v-model="modelNoticiaOrga.linkvideo">
            </a-input>
          </a-form-item>
        </a-col>    
        <a-col :span="12" :md="3">
          <a-form-item label="img 2">
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
        </a-col>

        <a-col :span="24" :md="3">
          <a-form-item label="Registrar">
            <a-button type="primary" html-type="submit" >
              REGISTRAR
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
	</a-card>

    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
        <Loanding :isVisible="isLoading"/>

  </div>
</template>

<script>
import axios from "axios";
const Swal = require("sweetalert2");
//const je = require("json-encrypt");
import TablaUser from '@/components/Tablas/TablaUser' ;
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
  props: ["datos"],
  components: {TablaUser,Loanding},
  data() {
    return {
         isLoading: false,
      fileList: [],
      itemUsuario: [],
      previewVisible: false,
      estaodousuario: true,
      validate: false,
      uploading: false,    
      photo: null,
      previewImage: "",
      validate: false,
      previewImage: "",
      fileList: [],
      itemFotosOrga: [],
      previewVisible: false,
      modelNoticiaOrga: {          
        id_noticiaeventoespacio:0,
        titulo: "",
        parrafo: "",
        photo: "",
        linkvideo: "",
        width: 0,
        height: 0,
        size: "mediun",      
        id_espacio: 0,
        id_eventoespacio: 0,
        portada: 1,
        tipo:'add'
       },
      errors: {       
        titulo:false,
        parrafo:false,
        id_espacio: false,
        id_eventoespacio: false
      },
    };
  },
  computed: {
    ...mapState(['url_base'])   
  },
  mounted() {
     // this.getTipoUsers();
      if (this.datos) {
      var aray = this.datos.split("-");
      var id_espacio  = aray[0];
      var id_eventoespacio = aray[1];
      this.modelNoticiaOrga.id_eventoespacio = id_eventoespacio;
      this.modelNoticiaOrga.id_espacio = id_espacio;
      //  console.log("id_espacio :"+id_espacio)
      // this.ListEspacioPhotoEventos(id_espacio, id_eventoespacio);
      // this.InfoEspacio(id_espacio);
      // this.InfoEventoEspacio(id_eventoespacio)
    }
  },
  methods: {
    Validate,
    loadImage,
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      //  console.log(file);
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
       // console.log(file.preview);
      }
      ///  this.previewImage = file.url || file.preview;
      this.previewImage = this.fileList[0].thumbUrl;  
      this.previewVisible = true;
    },    
    onFileChange(e) {
    //  this.modelEquipo.photo = e.target.files[0];
            var     foto=new Image();
             foto.src= e.target.files[0];    
            var img = new Image();
            var URL = window.URL || window.webkitURL;
            var img = new Image();
            img.src = URL.createObjectURL(e.target.files[0]);       
            img.onload = function () {
                var ancho = img.width;
                var alto = img.height
              //  console.log(ancho + ' ' + alto);
            }              
 
    },  
    handleChange(e) {
      this.modelNoticiaOrga.photo = e.file;
      this.fileList = e.fileList;
        ///  foto.src= e.target.files[0];   
        if ( this.fileList.length>0) {
        var img = new Image();
        var URL = window.URL || window.webkitURL;
        var img = new Image();
        img.src = URL.createObjectURL(e.file);      
        img.onload = function () {
            var ancho = img.width;
            var alto = img.height
           // console.log(ancho + ' ' + alto);
        }     
        }              
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },  
    AddNoticia() {
      const data = new FormData();
      let me = this;      
      me.isLoading=true;
     // let url = "usuarioAdd"; pokner otro url 
      let url =me.url_base+ "Control/EventoNoticiaEspacio.php";
       if (typeof me.modelNoticiaOrga.photo === 'string' || me.modelNoticiaOrga.photo instanceof String)
      {
         // console.log("es string");
          me.modelNoticiaOrga.portada=0;
      }
      else{ //console.log("es file");
      me.modelNoticiaOrga.portada=1}
      me.modelNoticiaOrga.tipo="add";
      data.append("id_noticiaeventoespacio", me.modelNoticiaOrga.id_noticiaeventoespacio);
      data.append("titulo", me.modelNoticiaOrga.titulo);
      data.append("parrafo", me.modelNoticiaOrga.parrafo);    
      data.append("photo", me.modelNoticiaOrga.photo);
      data.append("linkvideo", me.modelNoticiaOrga.linkvideo);
      data.append("width", me.modelNoticiaOrga.width);
      data.append("height", me.modelNoticiaOrga.height);
      data.append("size", me.modelNoticiaOrga.size);
      data.append("id_espacio", me.modelNoticiaOrga.id_espacio);
      data.append("id_eventoespacio", me.modelNoticiaOrga.id_eventoespacio);
      data.append("portada", me.modelNoticiaOrga.portada);
      data.append("tipo", me.modelNoticiaOrga.tipo);

      axios({
        method: "POST",
        url: url,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function(response) {
            me.isLoading=false;
          if (response.data.status == "200") {        
             me.MensajeOk("Registrado con Exito !")
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
    getTipoUsers() {
      let me = this;
      var items = [];
      // let url = "tipousuarioList";
      let url = "Control/tipousuarioList.php";
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          items = response.data;
          items.map(function(x) {
            me.itemUsuario.push({
              text: x.nombre,
              value: x.id_tipousuario,
            });
          });
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
                   this.limpiarcampos();
                   this.validate = false;
            }
       })
    },
    limpiarcampos(){
      this.modelNoticiaOrga.titulo == "";
      this.modelNoticiaOrga.parrafo == ""
      this.modelNoticiaOrga.photo == ""
      this.fileList=[];
    }

  },
};

function loadImage(imagen) {
  //console.log("entra aqui")
    var _URL = window.URL || window.webkitURL;
    var img = new Image();
    img.src = _URL.createObjectURL(imagen);
    img.onload = function () {
        var ancho = img.width;
        var alto = img.height
       // console.log(ancho + ' ' + alto);
    }
}

function Validate() {
 
  this.errors.titulo = this.modelNoticiaOrga.titulo == "" ? true : false;
  this.errors.parrafo = this.modelNoticiaOrga.parrafo == "" ? true : false;
  this.errors.id_espacio = this.modelNoticiaOrga.id_espacio == 0? true : false;
  this.errors.id_eventoespacio = this.modelNoticiaOrga.id_eventoespacio == 0? true : false;
  
  if (this.errors.titulo) {
    this.validate = true;
    Swal.fire({
      icon: "warning",
      text: "Verifique que campos necesarios esten llenados",
      timer: 2000,
    });
    return false;
  } else {
    this.validate = false;
  }
  if (this.errors.parrafo) {
    this.validate = true;
    Swal.fire({
      icon: "warning",
      text: "Verifique que campos necesarios esten llenados",
      timer: 2000,
    });
    return false;
  } else {
    this.validate = false;
  }
  if (this.errors.id_espacio) {
    this.validate = true;
    Swal.fire({
      icon: "warning",
      text: "Verifique que campos necesarios esten llenados",
      timer: 2000,
    });
    return false;
  } else {
    this.validate = false;
  }
  if (this.errors.id_eventoespacio) {
    this.validate = true;
    Swal.fire({
      icon: "warning",
      text: "Verifique que campos necesarios esten llenados",
      timer: 2000,
    });
    return false;
  } else {
    this.validate = false;
  }  

  if (!this.validate) {
    Swal.fire({
      title: "Desea Registrar?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Estoy de acuerdo!",
    }).then((result) => {
      if (result.value) {
        this.AddNoticia();
      }
    });
  }
}
</script>

<style>
.center-cropped {
  object-fit: none; /* Do not scale the image */
  object-position: center; /* Center the image within the element */
  height: 100px;
  width: 100px;
}
</style>
