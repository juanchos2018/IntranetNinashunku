<template>
  <div>
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 4,}">
    <a-form @submit.prevent="Validate">
      <a-row :gutter="[24, 24]">
        <a-col :span="24" :md="6">
          <a-form-item label="Nombres">
            <a-input placeholder="Nombres" v-model="modelOganizacion.nombre">
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="24" :md="6">
          <a-form-item label="descripcion">
            <a-input placeholder="descripcion" v-model="modelOganizacion.descripcion">
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24" :md="6">
          <a-form-item label="direccion">
            <a-input placeholder="direccion" v-model="modelOganizacion.direcion">
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="24" :md="6">
          <a-form-item label="telefono">
            <a-input placeholder="telefono" v-model="modelOganizacion.telefono">
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="[24, 24]">
        <a-col :span="24" :md="6">
          <a-form-item label="ubicacion">
            <a-input placeholder="ubicacion" v-model="modelOganizacion.ubicacion">
            </a-input>
          </a-form-item>
        </a-col>

      
        <a-col :span="12" :md="3">
          <a-form-item label="Estado">
            <a-switch v-model="estaodoOrga">
              <a-icon slot="checkedChildren" type="check" />
              <a-icon slot="unCheckedChildren" type="close" />
            </a-switch>
          
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

  
  </div>
</template>

<script>
import axios from "axios";
const Swal = require("sweetalert2");
//const je = require("json-encrypt");
	import TablaUser from '@/components/Tablas/TablaUser' ;

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
       validate: false,
      modelOganizacion: {
        nombre: "",
        descripcion: "",
        direcion: "",
        telefono: "",
        ubicacion: "",
        estado: 0,
       
      },
      estaodoOrga:true,
      errors: {
        nombre: false,
        descripcion: false,
        direcion: false,
        telefono: false,
        ubicacion: false,
        estado: false,
      },
    };
  },
  computed: {},
  mounted() {
   // this.getTipoUsers();
  },
  methods: {
    Validate,
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      //  console.log(file);
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      //  console.log(file.preview);
      }
      ///  this.previewImage = file.url || file.preview;
      this.previewImage = this.fileList[0].thumbUrl;
      this.previewVisible = true;
    },
    handleChange(e) {
      this.modelUsuario.photo = e.file;
      this.fileList = e.fileList;
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

    AddOrganizacion() {
    //  const data = new FormData();
      let me = this;
      // this.uploading = true;
      let url = "organizacionAdd";
      let data=me.modelOganizacion;
      me.modelOganizacion.estado = me.estaodoOrga == true ? 1 : 0;
      
      axios({
        method: "POST",
        url: url,
        data: data,
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
    getTipoUsers() {
      let me = this;
      var items = [];
      let url = "tipousuarioList";
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
                  // this.ClearText();
                   this.validateEquipo = false;
            }
       })
    }

  },
};

function Validate() {
    
  this.errors.nombre = this.modelOganizacion.nombre == "" ? true : false;
  this.errors.descripcion = this.modelOganizacion.descripcion == "" ? true : false;
  this.errors.direcion = this.modelOganizacion.direcion == "" ? true : false;
  
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
  if (this.errors.descripcion) {
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
        this.AddOrganizacion();
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
