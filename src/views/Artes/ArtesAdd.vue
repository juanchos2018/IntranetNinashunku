<template>
  <div>
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 4,}">
    <a-form @submit.prevent="Validate">
      <a-row :gutter="[24, 24]">
        <a-col :span="24" :md="6">
          <a-form-item label="Nombre Arte">
            <a-input placeholder="Nombres" v-model="modelArte.nombre_arte">
            </a-input>
          </a-form-item>
        </a-col>

    
      
      </a-row>

      <a-row :gutter="[24, 24]">     
     
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

export default {
  components: {TablaUser},
  data() {
    return {
      validate: false,     
      modelArte: {
        nombre_arte: "",
        siglas: "arte"      
      },
      errors: {
        nombre_arte: false,
        siglas: false,    
      },
    };
  },
  computed: {},
  mounted() {
    ///this.getTipoUsers();
  },
  methods: {
    Validate,    
    AddArte() {
      
      let me = this;
      const data = me.modelArte;     
      let url = "artesAdd";    
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
    }

  },
};

function Validate() {
  this.errors.nombre_arte = this.modelArte.nombre_arte == "" ? true : false;

  if (this.errors.nombre_arte) {
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
        this.AddArte();
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
