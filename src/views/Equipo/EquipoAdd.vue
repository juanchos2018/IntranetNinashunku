<template>
  <div>
      <h5>Registrar Equipo Tecnico</h5>
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 4,}">
    <a-form @submit.prevent="Validate">
      <a-row :gutter="[24, 24]">
        <a-col :span="24" :md="6">
          <a-form-item label="Nombres">
            <a-input placeholder="Nombres" v-model="modelUsuario.nombre">
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="24" :md="6">
          <a-form-item label="Apellidos">
            <a-input placeholder="Apellido" v-model="modelUsuario.apellido">
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24" :md="12">
          <a-form-item label="Descripcion">
            <a-input placeholder="Documento" v-model="modelUsuario.documento">
            </a-input>
          </a-form-item>
        </a-col>
      
      </a-row>

      <a-row :gutter="[24, 24]">
       
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
      </a-row>
      <a-row :gutter="[24, 24]">
          <a-col :span="24" :md="3">
          <a-form-item >
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
  </div>
</template>

<script>
import axios from "axios";
const Swal = require("sweetalert2");
//const je = require("json-encrypt");
	import TablaUser from '@/components/Tablas/TablaUser' ;
import { mapState } from 'vuex'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  components: {TablaUser},
  data() {
    return {
      fileList: [],
      itemUsuario: [],
      previewVisible: false,
      estaodousuario: true,
      validate: false,
      uploading: false,
    
      photo: null,
      previewImage: "",
      modelUsuario: {
        id_equipo:0,
        nombre: "",
        apellido: "",
        descripcion: "",
        photo: "",    
      },
      errors: {  
        nombre: false,
        apellido: false,
        descripcion: false    
      },
    };
  },
  computed: {
       ...mapState(['url_base'])
  },
  mounted() {
   
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
                console.log(ancho + ' ' + alto);
            }              
 
    },  
    handleChange(e) {
      this.modelUsuario.photo = e.file;
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
            console.log(ancho + ' ' + alto);
        }     
        }   
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
     ClearText(){
      this.modelUsuario.nombre ="";
      this.modelUsuario.apellido ="";
  
      this.fileList=[];
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },

    handleProvinceChange(value) {
      this.modelUsuario.id_tipousuario = value;
    },
    AddUser() {
      const data = new FormData();
      let me = this;
      // this.uploading = true;
     // let url = "usuarioAdd";
       let url = me.url_base+ "Control/Equipo.php";
   //  me.modelUsuario.estado = me.estaodousuario == true ? 1 : 0;    
      data.append("nombre", me.modelUsuario.nombre);
      data.append("apellido", me.modelUsuario.apellido);
      data.append("descripcion", me.modelUsuario.descripcion);     
      data.append("photo", me.modelUsuario.photo);
      
      axios({
        method: "POST",
        url: url,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function(response) {
          if (response.data.status == "200") {        
             me.MensajeOk("Registrado con Exito !")
          }
           else if(response.data.status="404"){
              Swal.fire({ icon: 'warning', text: response.data.response, timer: 3000,})
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
                   this.ClearText();
                   this.validateEquipo = false;
            }
       })
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
        console.log(ancho + ' ' + alto);
    }
}

function Validate() {
  this.errors.nombre = this.modelUsuario.nombre == "" ? true : false;
  this.errors.apellido = this.modelUsuario.apellido == "" ? true : false;  

  if (this.errors.nombre) {
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
  if (this.errors.apellido) {
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
        this.AddUser();
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
