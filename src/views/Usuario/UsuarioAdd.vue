<template>
  <div>
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
        <a-col :span="24" :md="6">
          <a-form-item label="Documento">
            <a-input placeholder="Documento" v-model="modelUsuario.documento">
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24" :md="6">
          <a-form-item label="Correo">
            <a-input placeholder="correo" v-model="modelUsuario.correo">
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="[24, 24]">
        <a-col :span="24" :md="6">
          <a-form-item label="Clave">
            <a-input placeholder="Clave" v-model="modelUsuario.clave">
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="24" :md="6">
          <a-form-item label="Tipo Usuario">
            <a-select
              :default-value="itemUsuario[0]"
              style="width: 100%"
              @change="handleProvinceChange"
            >
              <a-select-option v-for="item in itemUsuario" :key="item.value">
                {{ item.text }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="12" :md="3">
          <a-form-item label="Estado">
            <a-switch v-model="estaodousuario">
              <a-icon slot="checkedChildren" type="check" />
              <a-icon slot="unCheckedChildren" type="close" />
            </a-switch>            
          </a-form-item>
        </a-col>
        <!-- <a-col :span="24" :md="6">
        <a-form-item label="img">
          <b-form-file
            @change="onFileChange"
            v-model="photo"
            placeholder="Seleccione un foto..."
            drop-placeholder="Suelta la imagen aquí..."
          ></b-form-file>
        </a-form-item>
      </a-col> -->
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
      modelUsuario: {
        nombre: "",
        apellido: "",
        documento: "",
        correo: "",
        clave: "",
        estado: 1,
        logueo: 1,
        photo: "",
        id_tipousuario: 0,
      },
      errors: {
        nombre: false,
        apellido: false,
        documento: false,
        correo: false,
        clave: false,
        estado: false,
        logueo: false,
        photo: false,
        id_tipousuario: false,
      },
    };
  },
  computed: {
       ...mapState(['url_base'])
  },
  mounted() {
    this.getTipoUsers();
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
               // console.log(ancho + ' ' + alto);
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
         //   console.log(ancho + ' ' + alto);
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

    handleProvinceChange(value) {
      this.modelUsuario.id_tipousuario = value;
    },

    AddUser() {
      const data = new FormData();
      let me = this;
             me.isLoading=true;
      // this.uploading = true;
     // let url = "usuarioAdd";
       let url = me.url_base+ "Control/usuarioList.php";
      me.modelUsuario.estado = me.estaodousuario == true ? 1 : 0;
      // me.modelEquipo.perteneciente =
      //   me.checkedEquipo == true ? "Entidad" : "Personal";
      data.append("nombre", me.modelUsuario.nombre);
      data.append("apellido", me.modelUsuario.apellido);
      data.append("documento", me.modelUsuario.documento);
      data.append("correo", me.modelUsuario.correo);
      data.append("photo", me.modelUsuario.photo);
      data.append("clave", me.modelUsuario.clave);
      data.append("estado", me.modelUsuario.estado);
      data.append("logueo", me.modelUsuario.logueo);
      data.append("id_tipousuario", me.modelUsuario.id_tipousuario);
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
    ClearText(){
      this.modelUsuario.nombre ="";
      this.modelUsuario.apellido ="";
      this.modelUsuario.correo ="";
      this.modelUsuario.clave ="";
      this.fileList=[];
    },
    getTipoUsers() {
      let me = this;
      var items = [];
      // let url = "tipousuarioList";
      let url = me.url_base+ "Control/tipousuarioList.php";
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          items = response.data;
          items.map(function(x) {
            if (x.id_tipousuario!=1) {
                 me.itemUsuario.push({
                text: x.nombre,
                value: x.id_tipousuario,
            });
            }
           
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
      //  console.log(ancho + ' ' + alto);
    }
}

function Validate() {
  this.errors.nombre = this.modelUsuario.nombre == "" ? true : false;
  this.errors.apellido = this.modelUsuario.apellido == "" ? true : false;
  this.errors.correo = this.modelUsuario.correo == "" ? true : false;
  this.errors.clave = this.modelUsuario.clave == "" ? true : false;
  this.errors.id_tipousuario =
    this.modelUsuario.id_tipousuario == 0 ? true : false;

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
  if (this.errors.correo) {
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
  if (this.errors.clave) {
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
  if (this.errors.id_tipousuario) {
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

  ///let me = this;

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
