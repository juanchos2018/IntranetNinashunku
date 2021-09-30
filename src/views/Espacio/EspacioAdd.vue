<template>
  <div><h5>Agregar Espacio</h5>
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 4,}">
    <a-form @submit.prevent="Validate">
      <a-row :gutter="[24, 24]">
        <a-col :span="24" :md="6">
          <a-form-item label="Nombre Espacio">
            <a-input placeholder="Nombres" v-model="modelEspacio.nombre_espacio">
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="24" :md="6">
          <a-form-item label="Direccion">
            <a-input placeholder="direcion" v-model="modelEspacio.direcion">
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24" :md="6">
          <a-form-item label="Fecha creacion">
            <!-- <a-input placeholder="fecha_creacion" v-model="modelEspacio.fecha_creacion">
            </a-input> -->
             <a-date-picker
              style="width: 100%"
              v-model="modelEspacio.fecha_creacion"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24" :md="6">
          <a-form-item label="Telefono">
            <a-input placeholder="telefono" v-model="modelEspacio.telefono">
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="[24, 24]">
        <a-col :span="24" :md="6">
          <a-form-item label="Destaca">
            <a-input placeholder="Destaca" v-model="modelEspacio.destaca">
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="24" :md="6">
          <a-form-item label="Usuario Responsable">
            <a-select
              
              style="width: 100%"
              @change="handleProvinceChange"
            >
              <a-select-option v-for="item in itemUsuario" :key="item.value">
                {{ item.text }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <!-- <a-col :span="12" :md="3">
          <a-form-item label="Estado">
            <a-switch v-model="estaodousuario">
              <a-icon slot="checkedChildren" type="check" />
              <a-icon slot="unCheckedChildren" type="close" />
            </a-switch>            
          </a-form-item>
        </a-col>
         -->
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
        <a-col :span="24" :md="6">
          <a-form-item label="Facebook">
            <a-input placeholder="facebook" v-model="modelEspacio.linkfacebook">
            </a-input>
          </a-form-item>
        </a-col>
       <a-col :span="24" :md="3">
          <a-form-item label="Colores">
            <div style="">             
            <v-input-colorpicker  v-model="modelEspacio.color" />
             <v-input-colorpicker  style="margin-left:5px" v-model="modelEspacio.color2" />
            <!-- <a-input  v-model="modelEspacio.color" disabled>
            </a-input> -->
             </div> 
      
          </a-form-item>      
        </a-col>
        <a-col :span="12" :md="3">
          <a-form-item label="Logo">
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

        <a-button type="primary" html-type="submit" >
              REGISTRAR ESPACIO
            </a-button>
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
  components: {},
  data() {
    return {
       color: "#0f4c81",

      fileList: [],
      itemUsuario: [],
      previewVisible: false,
      estaodousuario: true,
      validate: false,
      uploading: false,    
      photo: null,
      previewImage: "",
      modelEspacio: {
        nombre_espacio: "",
        fecha_creacion: "",
        direcion: "",
        telefono: "",
        destaca: "",
        color:'#0d47a1',
        color2:'#2196f3',
        linkfacebook:'',
        estado: 1,       
        photo: "",
        id_organizacion: 1,
        id_usuario:0,
      },
      errors: {
        nombre_espacio: false,
        fecha_creacion: false,
        direcion: false,
        telefono: false,
        destaca: false,     
        id_organizacion: false,
      },
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
  computed: {
       ...mapState(['url_base'])
  },
  mounted() {
    this.getUsers();
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
      this.modelEspacio.photo = e.file;
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
      this.modelEspacio.id_usuario = value;
    },

    AddEspacio() {
      const data = new FormData();
      let me = this;
      // this.uploading = true;
     //  let url = "espacioAdd"; 
      let url =me.url_base+ "Control/espacioList.php"; 
   //   me.modelEspacio.estado = me.estaodousuario == true ? 1 : 0;
      me.modelEspacio.estado=1;
      data.append("tipo", "add");
      data.append("nombre_espacio", me.modelEspacio.nombre_espacio);
      data.append("fecha_creacion", me.modelEspacio.fecha_creacion);
      data.append("direcion", me.modelEspacio.direcion);
      data.append("destaca", me.modelEspacio.destaca);
      data.append("telefono", me.modelEspacio.telefono);
      data.append("photo", me.modelEspacio.photo);
      data.append("estado", me.modelEspacio.estado);
      data.append("color", me.modelEspacio.color);
      data.append("color2", me.modelEspacio.color2);
      data.append("linkfacebook", me.modelEspacio.linkfacebook);
      data.append("id_organizacion", me.modelEspacio.id_organizacion);
      data.append("id_usuario", me.modelEspacio.id_usuario);
     // data.append("logueo", me.modelUsuario.logueo);      
      axios({
        method: "POST",
        url: url,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function(response) {
       //   console.log(response);
          if (response.data.status == "200") {        
             me.MensajeOk("Registrado con Exito !")
             me.limpiar();
          }
           else if(response.data.status="404"){
              Swal.fire({ icon: 'warning', text: response.data.response, timer: 3000,})
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    limpiar(){
      this.modelEspacio.nombre_espacio="";
      this.modelEspacio.direcion="";
      this.fileList=[];
    },
    getUsers() {
      let me = this;
      var items = [];
     // let url = "usuarioList";
        let url = me.url_base+ "Control/usuarioList.php";
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          items = response.data;
          items.map(function(x) {
            if (x.id_tipousuario!=1) {
                me.itemUsuario.push({
                text: x.nombre+"-"+x.apellido,
                value: x.id_usuario,
            });
            }
            
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ConsultaUsurioEspacio(id_usuario){
        let me = this;
        let url = me.url_base+ "Control/Consulta.php?id_usuario="+id_usuario;
        axios({
           method: "GET",
           url: url,
         })
        .then(function(response) {
           // console.log(response);
            if (response.data.nroregistros>0) {
                Swal.fire(
                  'Ups?',
                  'Este usario ya esta jefe de otro espacio',
                  'info'
                )
            }else{
                 me.AddEspacio();
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
                //    this.ClearText();
                   this.validate = false;
            }
       })
    }

  },
};

function loadImage(imagen) {
 
    var _URL = window.URL || window.webkitURL;
    var img = new Image();
    img.src = _URL.createObjectURL(imagen);
    img.onload = function () {
        var ancho = img.width;
        var alto = img.height
        //console.log(ancho + ' ' + alto);
    }
}

function Validate() {

    //  modelEspacio: {
    //     nombre_espacio: "",
    //     fecha_creacion: "",
    //     direcion: "",
    //     telefono: "",
    //     destaca: "",
    //     estado: 1,       
    //     photo: "",
    //     id_organizacion: 1,
    //   },

  this.errors.nombre_espacio = this.modelEspacio.nombre_espacio == "" ? true : false;
  this.errors.fecha_creacion = this.modelEspacio.fecha_creacion == "" ? true : false;
  this.errors.direcion = this.modelEspacio.direcion == "" ? true : false;
  this.errors.telefono = this.modelEspacio.telefono == "" ? true : false;
  this.errors.destaca =  this.modelEspacio.destaca == "" ? true : false;

  //this.errors.id_organizacion =  this.modelEspacio.id_organizacion == 0 ? true : false;

  if (this.errors.nombre_espacio) {
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
  if (this.errors.fecha_creacion) {
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
  if (this.errors.direcion) {
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
  if (this.errors.telefono) {
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
  if (this.errors.destaca) {
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

  let me = this;

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
          this.ConsultaUsurioEspacio( this.modelEspacio.id_usuario);
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
