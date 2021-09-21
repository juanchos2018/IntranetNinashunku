<template>
  <div>
    <h5> Eventos del Espacio {{nombreespacio}} </h5>
    <a-button type="primary" @click="DialogoEVento">
      AGREGAR EVENTO
    </a-button>
    <br /><br />
    <a-row type="flex" :gutter="24">
      <a-col
        :span="12"
        :xl="6"
        class="mb-24"
        v-for="item in itemEvenntoEspacios"
        :key=" item.id_fotoeventoespacio"
      >
        <card-eventos-espacio
          :id_eventoespacio="item.id_eventoespacio"
          :nombre="item.nombre_evento"
          :descripcion="item.descripcion"
          :id_espacio="item.id_espacio"
          :fecha="item.fecha_evento"
        ></card-eventos-espacio>
      </a-col>
    </a-row>
    <a-modal :visible="dialogevento" :footer="null" @cancel="handleCancelModal">
      <a-form @submit.prevent="Validate">
        <a-form-item label="Nombre Evento">
          <a-input
            placeholder="Nombres"
            v-model="modelEspacioEvento.nombre_evento"
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Descripcion">
          <a-input
            placeholder="descripcion foto"
            v-model="modelEspacioEvento.descripcion"
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Fecha">
          <a-date-picker
            style="width: 100%"
            v-model="modelEspacioEvento.fecha_evento"
          />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">
            REGISTRAR
          </a-button>
        </a-form-item>
      </a-form>      
    </a-modal>
    <Loanding :isVisible="isLoading"/>
  </div>

</template>

<script>
import axios from "axios";
const Swal = require("sweetalert2");
import WidgetSalary from "@/components/Widgets/WidgetSalary";
import CardEventosEspacio from "@/components/Widgets/CardEventosEspacio";
import { mapState } from 'vuex'
import Loanding from './../Loanding/Loanding'


export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  name: "mis-organizaciones",
  props: ["id_espacio"],

  components: {
    WidgetSalary,
    CardEventosEspacio,
    Loanding
  },
  data() {
    return {
       isLoading: false,
      itemEspacios: [],
      itemEvenntoEspacios: [],
      nombreespacio:'',
      modelEspacioEvento: {
        nombre_evento: "",
        descripcion: "",
        fecha_evento: "",
        id_espacio: 0,
      },
      errors: {
        nombre_evento: false,
        descripcion: false,
        fecha_evento: false,
        id_espacio: false,
      },
      dialogevento: false,
      validate: false,
    };
  },
  created() {
//const currentPath = this.$router.history.current.path;
		 		if (!this.$session.exists()) {
			     	this.$router.push('/login').catch(err => {
						if (
						err.name !== 'NavigationDuplicated' &&
						!err.message.includes('Evitó la navegación redundante a la ubicación actual')
						) {
					
						console(err);
						}
					});
				}else{
          		console.log("esta logueado");
        }
	},
   computed: {
    ...mapState(['url_base'])   
  },
  mounted() {
    this.modelEspacioEvento.id_espacio = this.id_espacio;
    this.ListEventoEspacios(this.modelEspacioEvento.id_espacio);
    this.InfoEspacio(this.modelEspacioEvento.id_espacio)
  },
  methods: {
    Validate,
    AddEspacio() {
      //  this.$router.push({ name: "EspacioAdd" });
    },
    DialogoEVento() {
      this.dialogevento = true;
    },
    InfoEspacio(id_espacio){
      let me = this;      
      //let url = "espacioInfo/" + id_espacio;
      let url = me.url_base+ "Control/espacioList.php?id_espacio=" + id_espacio;
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
           me.nombreespacio = response.data.result.nombre_espacio;
        //   console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleCancelModal() {
      this.dialogevento = false;
    },
    ListEventoEspacios(id_espacio) {
      let me = this;
      let id_usuario = 1;
      var items = [];
     // let url = "eventoespacioList/" + id_espacio;
      let url = me.url_base+ "Control/eventoEspacio.php?id_espacio=" + id_espacio;
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          me.itemEvenntoEspacios = response.data.result;
          //console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    AddEVentoEspacio() {
      let me = this;
      me.isLoading=true;
      const data = me.modelEspacioEvento;
      //const data = new FormData();
      // this.uploading = true;
      //let url = "eventoespacioAdd";
       let url = me.url_base+ "Control/eventoEspacio.php";
      //   me.modelFotoOrga.estado = me.estaodousuario == true ? 1 : 0;
      //   data.append("nombre_foto", me.modelFotoOrga.nombre_foto);
      //   data.append("descrip_foto", me.modelFotoOrga.descrip_foto);
      //   data.append("id_organizacion", me.modelFotoOrga.id_organizacion);
      //   data.append("portada", me.modelFotoOrga.portada);
      //   data.append("photo", me.modelFotoOrga.photo);
      //   data.append("width", me.modelFotoOrga.width);
      //   data.append("height", me.modelFotoOrga.height);
      //   data.append("size", me.modelFotoOrga.size);
      axios({
        method: "POST",
        url: url,
        data: data,
      })
        .then(function(response) {
          if (response.data.status == "200") {
             me.isLoading=false;
            me.MensajeOk("Registrado con Exito !");
            me.ListEventoEspacios(me.modelEspacioEvento.id_espacio);
          } else if ((response.data.status = "404")) {
             me.isLoading=false;
            Swal.fire({
              icon: "warning",
              text: response.data.response,
              timer: 3000,
            });
          }
        })
        .catch((error) => {
          console.log(error);
           me.isLoading=false;
        });
    },

    MensajeOk(mensaje) {
      Swal.fire({
        title: "Exito!",
        text: mensaje,
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          ///                  this.ClearText();
          this.validateEquipo = false;
        }
      });
    },
  },
};

function Validate() {
  this.errors.nombre_evento =
    this.modelEspacioEvento.nombre_evento == "" ? true : false;
  this.errors.descripcion =
    this.modelEspacioEvento.descripcion == "" ? true : false;
  this.errors.fecha_evento =
    this.modelEspacioEvento.fecha_evento == "" ? true : false;
  this.errors.id_espacio =
    this.modelEspacioEvento.id_espacio == 0 ? true : false;

  /// this.modelUsuario.id_tipousuario == 0 ? true : false;

  if (this.errors.nombre_evento) {
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
  if (this.errors.descripcion) {
    this.validate = true;
    Swal.fire({
      icon: "warning",
      text: "Verifique que campos necesarios esten llenados des",
      timer: 2000,
    });
    return false;
  } else {
    this.validate = false;
  }
  if (this.errors.fecha_evento) {
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
  if (this.errors.id_espacio) {
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

  ///let me = this;
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
        this.dialogevento = false;
        this.AddEVentoEspacio();
      }
    });
  }
}
</script>
