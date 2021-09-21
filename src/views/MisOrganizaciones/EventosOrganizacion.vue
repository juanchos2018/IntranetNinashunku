<template>
  <div>
    <h5>Lista de Eventos de Organizacion NinashunKu</h5>
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
        :key="item.id_orgaevento"
      >
        <card-evento-organizacion
          :id_orgaevento="item.id_orgaevento"
          :nombre="item.nombre_evento"
          :descripcion="item.descripcion"
          :id_organizacion="item.id_organizacion"
          :photo="url_base+item.photo"
        ></card-evento-organizacion>
      </a-col>
    </a-row>
    <a-modal :visible="dialogevento" :footer="null" @cancel="handleCancelModal">
      <a-form @submit.prevent="Validate" >
        <a-form-item label="Nombre Evento">
          <a-input
            placeholder="Nombre"
            v-model="modelOrgaEvento.nombre_evento"
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Descripcion Evento">
          <a-input
            placeholder="descrip Evento"
            v-model="modelOrgaEvento.descripcion"
          >
          </a-input>
        </a-form-item>
        <a-form-item style="margin-bottom:0;">
          <a-form-item
            label="Fecha"
            :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
          >
            <a-date-picker
              style="width: 100%"
              v-model="modelOrgaEvento.fecha_evento"
            />
          </a-form-item>
          <span
            :style="{
              display: 'inline-block',
              width: '24px',
              textAlign: 'center',
            }"
          >
            -
          </span>
          <a-form-item
            label="Foto"
            :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
          >
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
import CardEventoOrganizacion from "@/components/Widgets/CardEventoOrganizacion";

import { mapState } from 'vuex'
import Loanding from './../Loanding/Loanding'
export default {
  name: "mis-organizaciones",
  // props:{
  //     id_organizacion: {
  //       type: Number,
  //       default: 1,
  //     },
  // },

  components: {
    WidgetSalary,
    CardEventoOrganizacion,
    Loanding
  },
  data() {
    return {
           isLoading: false,
      estaodousuario: true,
      validate: false,
      previewImage: "",
      fileList: [],
      itemFotosOrga: [],
      previewVisible: false,
      itemEspacios: [],
      itemEvenntoEspacios: [],
      modelOrgaEvento: {
        nombre_evento: "",
        descripcion: "",
        photo: "",
        fecha_evento: "",
        id_organizacion: 1,
      },
      errors: {
        nombre_evento: false,
        descripcion: false,
        fecha_evento: false,
        id_organizacion: false,
      },
      dialogevento: false,
      validate: false,
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
  },
   created() {
			 //  const currentPath = this.$router.history.current.path;
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
    // this.modelOrgaEvento.id_organizacion=this.id_organizacion
    //  this.ListEventoOgra(this.modelEspacioEvento.id_espacio);
    this.ListEventoOrga();
  },
  computed: {
      ...mapState(['url_base'])
  },
  methods: {
    Validate,

    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    handleChange(e) {
      let me = this;
      me.modelOrgaEvento.photo = e.file;
      me.fileList = e.fileList;

      if (me.fileList.length > 0) {
        var img = new Image();
        var URL = window.URL || window.webkitURL;
        img.src = URL.createObjectURL(e.file);
        img.onload = function() {
          var ancho = img.width;
          var alto = img.height;
          //   console.log(ancho + ' ' + alto);
          //  me.modelFotoOrga.width=ancho;
          //   me.modelFotoOrga.height=alto;
        };
      }
    },
    beforeUpload(file) {
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

    AddEspacio() {
      //  this.$router.push({ name: "EspacioAdd" });
    },
    DialogoEVento() {
      this.dialogevento = true;
    },
    handleCancelModal() {
      this.dialogevento = false;
    },
    ListEventoOrga() {
      let me = this;
      let id_usuario = 1;
      var items = [];
   //   let url = "eventoesorgaList/";
  //  let url="https://phpapi.identidadesjuveniles.org/Control/EventoOrganizacion.php"
     let url = me.url_base+ "Control/EventoOrganizacion.php";
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          me.itemEvenntoEspacios = response.data.result;
      //    console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    AddEVentoEspacio() {
      let me = this;
      //   const data=me.modelEspacioEvento;
       me.isLoading=true;
      const data = new FormData();
      
      //let url = "eventosorgaAdd";
      let url = me.url_base+"Control/EventoOrganizacion.php";
      ///  me.modelFotoOrga.estado = me.estaodousuario == true ? 1 : 0;
      data.append("nombre_evento", me.modelOrgaEvento.nombre_evento);
      data.append("descripcion", me.modelOrgaEvento.descripcion);
      data.append("fecha_evento", me.modelOrgaEvento.fecha_evento);
      data.append("photo", me.modelOrgaEvento.photo);
      data.append("id_organizacion", me.modelOrgaEvento.id_organizacion);
      //   data.append("width", me.modelFotoOrga.width);
      //   data.append("height", me.modelFotoOrga.height);
      // data.append("size", me.modelFotoOrga.size);
      axios({
        method: "POST",
        url: url,
        data: data,
      })
        .then(function(response) {
           me.isLoading=false;
          if (response.data.status == "200") {
            me.MensajeOk("Registrado con Exito !");
            me.ListEventoOrga();
          } else if ((response.data.status = "404")) {
            Swal.fire({
              icon: "warning",
              text: response.data.response,
              timer: 3000,
            });
          }
        })
        .catch((error) => {
           me.isLoading=false;
          console.log(error);
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
    this.modelOrgaEvento.nombre_evento == "" ? true : false;
  this.errors.descripcion =
    this.modelOrgaEvento.descripcion == "" ? true : false;
  this.errors.fecha_evento =
    this.modelOrgaEvento.fecha_evento == "" ? true : false;
  this.errors.id_organizacion =
    this.modelOrgaEvento.id_organizacion == 0 ? true : false;

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

  ///let me = this;
  if (!this.validate) {
    Swal.fire({
      title: "Desea Registrar Evento?",
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
