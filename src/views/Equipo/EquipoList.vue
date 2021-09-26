<template>
  <div>
    <h5> Equipo Tecnico</h5>

    <a-button type="primary" v-if="esAdministrador" @click="addEquipo">
      AGREGAR EQUIPO
    </a-button>
    <br /><br />   

    <a-row type="flex" :gutter="24">
      <a-col
        :span="12"
        :xl="6"
        class="mb-24"
        v-for="item in itemequiopos"
        :key="item.id_equipo"
      >
        <a-card hoverable style="width: 240px">
          <img slot="cover" alt="example" :src="url_base + item.photo"   width="100"
          height="220"/>
          <a-card-meta :title="item.nombre">            
          </a-card-meta>
          <template slot="actions" class="ant-card-actions">
            <a-icon key="edit" type="edit"  />
            <a-icon type="zoom-in" @click="show(item.id_equipo)" />
            <a-icon type="delete" @click="Delete(item.id_equipo)" />
          </template>
        </a-card>
        <!-- / Salary Card -->
      </a-col>
    </a-row>

    <a-modal :visible="modalVisible" :footer="null" @cancel="handleCancelModal">
      <a-form @submit.prevent="Validate">
        <a-form-item label="Nombre Foto">
          <a-input
            placeholder="Nombre Foto"
            v-model="modelFotoOrga.nombre_foto"
          >
          </a-input>
        </a-form-item>       
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

  </div>
</template>

<script>
import axios from "axios";
const Swal = require("sweetalert2");
import VueEasyLightbox from 'vue-easy-lightbox'
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
  name: "espacio-eventos-fotos",
  props: ["datos"],
  components:{VueEasyLightbox},
  data() {
    return {    
      NombreBoton:'GUARDAR',
      nombreespacio:'',
      NombreEvento:'',
      modalVisible: false,
      estaodousuario: true,
      validate: false,
      previewImage: "",
      fileList: [],
      itemequiopos: [],
      previewVisible: false,
      modelFotoOrga: {          
        id_fotoeventoespacio:0,
        nombre_foto: "",
        descrip_foto: "add",
        photo: "",
        portada: 1,
        id_espacio: 0,
        id_eventoespacio: 0,
        width: 0,
        height: 0,
        size: "mediun",
      },
      modelEquipo:{
        id_equipo:0
      },
      errors: {
        nombre_foto: false,
        descrip_foto: false,
        photo: false,
        portada: false,
        id_espacio: false,
        id_eventoespacio: false,
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
      this.listEquipos();
  },
  computed:{
     ...mapState(['url_base'])   ,
    imgs() {
      const arr = []
      this.itemequiopos.map(item => {
        arr.push(this.url_base+item.photo )
      })
      return arr
    },

    	esAdministrador(){
			//	return this.$store.state.tipousuario =='Administrador';
	  		return	localStorage.getItem('tipousuario')=='Administrador';
			},			
			esJefe(){
				//return  this.$store.state.tipousuario =='Jefe de Espacio';
				return	localStorage.getItem('tipousuario')=='Jefe de Espacio';
			}
  },
  methods: {
    Validate,  
   show(idfoto) {
      this.index=this.itemequiopos.findIndex(x=>x.id_equipo==idfoto);   
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

    listEquipos(){
         let me = this;
         var items = [];
        let url =me.url_base+ "Control/Equipo.php";
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          me.itemequiopos = response.data;
         //  console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    handleChange(e) {
      let me = this;
      me.modelFotoOrga.photo = e.file;
      me.fileList = e.fileList;
      if (me.fileList.length > 0) {
        var img = new Image();
        var URL = window.URL || window.webkitURL;
        img.src = URL.createObjectURL(e.file);
        img.onload = function() {
          var ancho = img.width;
          var alto = img.height;        
          me.modelFotoOrga.width = ancho;
          me.modelFotoOrga.height = alto;
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
       //   file.preview = await getBase64(file.url);
            console.log("dentro if" +file.originFileObj);
      }
      this.previewImage = this.fileList[0].thumbUrl;
      this.previewVisible = true;
         console.log("fuera if");
    
    },
    addEquipo(){
                 this.$router.push({ name: "EquipoTecnicoAdd" });
    },  
    AbrirDialogo() {


      this.modelFotoOrga.nombre_foto="";
      this.modelFotoOrga.descrip_foto="";
      this.NombreBoton="GUARDAR";
      this.fileList=[];
      this.modalVisible = true;
    
    },
    AbrirDialogoEdit(id){
       this.fileList=[];
        this.previewImage="";
       this.NombreBoton="EDITAR";
       this.modelFotoOrga= {...this.itemFotosOrga.find(x=>x.id_fotoeventoespacio==id)}
      this.fileList.push({
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: this.url_base +this.modelFotoOrga.photo,
        }) 
      this.modalVisible = true;

    },
     async anterior(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
      
    EditarFoto(){
         const data = new FormData();
      let me = this;     
      let url = me.url_base+ "Control/eventoesfotospacioList.php";

     if (typeof me.modelFotoOrga.photo === 'string' || me.modelFotoOrga.photo instanceof String)
      {
          me.modelFotoOrga.photo="string";
          me.modelFotoOrga.portada=0;
      }   else{
          me.modelFotoOrga.portada=1;
      }
      me.modelFotoOrga.descrip_foto="edit";
      data.append("id_fotoeventoespacio", me.modelFotoOrga.id_fotoeventoespacio);

      data.append("nombre_foto", me.modelFotoOrga.nombre_foto);
      data.append("descrip_foto", me.modelFotoOrga.descrip_foto);      
      data.append("portada", me.modelFotoOrga.portada);
      data.append("photo", me.modelFotoOrga.photo);
      data.append("width", me.modelFotoOrga.width);
      data.append("height", me.modelFotoOrga.height);
      data.append("size", me.modelFotoOrga.size);
      data.append("id_eventoespacio", me.modelFotoOrga.id_eventoespacio);
      data.append("id_espacio", me.modelFotoOrga.id_espacio);

      axios({
        method: "POST",
        url: url,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function(response) {

          console.log(response);
          if (response.data.status == "200") {
            me.MensajeOk("Registrado con Exito !");
            me.ListEspacioPhotoEventos(
              me.modelFotoOrga.id_espacio,
              me.modelFotoOrga.id_eventoespacio
            );
          } else if ((response.data.status = "404")) {
            Swal.fire({
              icon: "warning",
              text: response.data.response,
              timer: 3000,
            });
          }
        })
        .catch((error) => {
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
    Eliminar(id){
      let me = this;
      me.modelEquipo.id_equipo=id;
      const data = me.modelEquipo;    
   //   console.log(data); 
      let url =me.url_base+ "Control/Equipo.php";    
      axios({
        method: "DELETE",
        url: url,
        data: data,
        })
        .then(function(response) {
          //  console.log(response);          
          if (response.data.status == "200") {    
            // me.modalVisible = false;    
             me.MensajeOk("Eliminado con Exito !")    
             me.listEquipos();        
           //  me.ListEspacioPhotoEventos(me.modelFotoOrga.id_espacio,me.modelFotoOrga.id_eventoespacio);
    
            // me.modelVideoOrga.nombre_video="";
          //   me.modelVideoOrga.descrip_video="";
           //  me.modelVideoOrga.urlvideo="";
             
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
    }
  },
};

function Validate() {
  this.errors.nombre_foto = this.modelFotoOrga.nombre_foto == "" ? true : false; 
  //this.errors.photo = this.modelFotoOrga.photo == "" ? true : false;
  this.errors.id_eventoespacio =
   this.modelFotoOrga.id_eventoespacio == 0 ? true : false;
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

  if (this.errors.id_eventoespacio) {
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
        this.AddFotoOrga();
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
            this.EditarFoto();             
        }
        });
    }
    } 

}
</script>

<style></style>
