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
              GUARDAR
            </a-button>
          </a-form-item>       
         </a-col>
      </a-row>
    </a-form>
	</a-card>

<br>
   <a-card :bordered="true" class="header-solid h-full" :bodyStyle="{padding: 4,}">

     <a-tabs default-active-key="1" @change="callback">
          
      <a-tab-pane key="1" tab="Artes">
           <a-button type="primary" html-type="button"  
           @click="showModal">
              AGREGAR ARTE
            </a-button>
          <tabla-artes-orga
          :data="itemsArtesOrga"
          :columns="titleArtesOrga"
        ></tabla-artes-orga>

      </a-tab-pane>
      <a-tab-pane key="2" tab="Miembros" force-render>
         <a-button type="primary" html-type="button"  
           @click="showModal2">
              AGREGAR MIEMBRO
            </a-button>
          <tabla-artes-orga
          :data="itemUserOrga"
          :columns="titlesUsers"
        ></tabla-artes-orga>
      </a-tab-pane>
    
    </a-tabs>
  	</a-card>

       <a-modal v-model="visible" title="Agrgar Arte" ok-text="Agregar" cancel-text="Cerrar" @ok="hideModal">
           <a-row>
        <a-col :span="24" :md="24">
          <a-form-item label="Arte">
            <a-select            
              style="width: 100%"
              @change="handleProvinceChange"
            >
              <a-select-option v-for="item in itemsArtes" :key="item.value">
                {{ item.text }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
           </a-row>
    </a-modal>

      <a-modal v-model="visibleUser" title="Agrgar Arte" ok-text="Agregar Miembro" cancel-text="Cerrar" @ok="hideModal2">
           <a-row>
        <a-col :span="24" :md="24">
          <a-form-item label="Usuario">
            <a-select            
              style="width: 100%"
              @change="handleProvinceChange2"
            >
              <a-select-option v-for="item in itemsUsuarios" :key="item.value">
                {{ item.text }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
           </a-row>
    </a-modal>

  </div>
</template>

<script>
import axios from "axios";
const Swal = require("sweetalert2");
//const je = require("json-encrypt");
import TablaUserOrga from '@/components/Tablas/TablaUserOrga' ;
import TablaArtesOrga from "@/components/Tablas/TablaArtesOrga";


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  components: {TablaUserOrga,TablaArtesOrga},
  props: ["id_organizacion"],
  data() {
    return {
      validate: false,
      visible: false,
      visibleUser:false,   
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
      modelArteOrga:{ 
          id_organizacion:0,
          id_arte:0,
      },
      modelMiembroOrga:{ 
          id_usuario:0,
          id_organizacion:0,
      },
      titleArtesOrga : [
		{
			title: 'Arte ',
			dataIndex: 'nombre_arte',
			scopedSlots: { customRender: 'nombre_arte' },
		},		
		{
			title: '',
			scopedSlots: { customRender: 'editBtn' },
			width: 50,
		},
	 ],
       titlesUsers: [
        {
          title: "NOMBE",
          dataIndex: "nombre",
          scopedSlots: { customRender: "nombre" },
        },
        {
          title: "APELLIDO",
          dataIndex: "apellido",
          scopedSlots: { customRender: "apellido" },
        },
        {
          title: "DOCUMENTO",
          dataIndex: "documento",
        },
        {
          title: "ESTADO",
          dataIndex: "estado",
          scopedSlots: { customRender: "estado" },
         // width: 50,
        },
        {
          title: "CORREO",
          dataIndex: "correo",
        },
        {
          title: "",
          scopedSlots: { customRender: "editBtn" },
          width: 50,
        },
      ],
      itemsArtesOrga:[],
      itemsArtes:[],
      itemUserOrga:[],
      itemsUsuarios:[],
     };
  },
  computed: {},
  mounted() {
   // this.getTipoUsers();
     this.ViewDetailOrganizacion();
     this.ListArtes();
     this.ListUser();
  },
  methods: {
    Validate,
     callback(key) {
   //   console.log(key);
    },
    showModal() {
      this.visible = true;
    },
    showModal2(){
        this.visibleUser = true;
    },
    hideModal() {
      this.visible = false;
      this.addArteOrga();
    },
    hideModal2(){
        //alert("Agrear")
        this.visibleUser = false;
        this.addmiembroOrga();
    },
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
     this.modelArteOrga.id_arte = value;
    },
    handleProvinceChange2(value){
      //  console.log(value);
        this.modelMiembroOrga.id_usuario=value
    },
    UpdateOrganizacion() {
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
    ViewDetailOrganizacion(){
   //   let id_organizacion = je.decrypt(this.id_organizacion);
      let id_organizacion = this.id_organizacion;
      let me = this;
      me.modelArteOrga.id_organizacion=id_organizacion;
      me.modelMiembroOrga.id_organizacion=id_organizacion;
      let url = "organizacionDetail/" + id_organizacion;
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          // console.log(response);
          me.modelOganizacion = response.data.result;
          me.ListArtesOrga(me.modelOganizacion.id_organizacion);
          me.ListMiembroOrga(me.modelOganizacion.id_organizacion);

        //   me.modelPuertoCpu.id_area= me.modelEquipo.id_area;
        //   me.modelPuertoCpu.id_equipo= me.modelEquipo.id_equipo;
        //   me.checkedEquipo = me.modelEquipo.estado == 1 ? true : false;      
        //   me.estadoEquipo = me.modelEquipo.estado == 1 ? 'Activo' :'Inactivo'; 
   
        //   if (me.modelEquipo.perteneciente=="Entidad") {           
        //       me.checkedAccesor=true
        //   } else{  
        //       me.checkedAccesor=false}
        
        //  me.ViewPuertoCpu(me.modelEquipo.id_equipo, "cpu");
        
        })
        .catch((error) => {
          console.log(error);
          //Swal.fire({ icon: 'error', text: 'A ocurrido un error', timer: 3000,})
        });
    },
    ListUser(){
      let me = this;
      var items = [];
      let url = "usuarioList";
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          items = response.data;
        //  console.log(response)
          items.map(function(x) {
            me.itemsUsuarios.push({
              text: x.nombre+" "+x.apellido,
              value: x.id_usuario,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ListArtes(){
      let me = this;
      var items = [];
      let url = "artesList";
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          items = response.data;
          items.map(function(x) {
            me.itemsArtes.push({
              text: x.nombre_arte,
              value: x.id_arte,
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addmiembroOrga(){
          let me = this;
      // this.uploading = true;
      let url = "miembroAddOrga";
      let data=me.modelMiembroOrga;
     // me.modelOganizacion.estado = me.estaodoOrga == true ? 1 : 0;
      if (me.modelMiembroOrga.id_usuario==0) {
            alert("elija miembro");
            return;
      }
      axios({
        method: "POST",
        url: url,
        data: data,
      })
        .then(function(response) {
          if (response.data.status == "200") {        

             me.MensajeOk("Registrado con Exito !")
             me.ListMiembroOrga(me.modelArteOrga.id_organizacion);
          }
           else if(response.data.status="404"){
              Swal.fire({ icon: 'warning', text: response.data.response, timer: 3000,})
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addArteOrga(){
      let me = this;
      // this.uploading = true;
      let url = "artesAddOrga";
      let data=me.modelArteOrga;
     // me.modelOganizacion.estado = me.estaodoOrga == true ? 1 : 0;
      if (me.modelArteOrga.id_arte==0) {
            alert("elija arte");
            return;
      }
      axios({
        method: "POST",
        url: url,
        data: data,
      })
        .then(function(response) {
          if (response.data.status == "200") {        

             me.MensajeOk("Registrado con Exito !")
             me.ListArtesOrga(me.modelArteOrga.id_organizacion);
          }
           else if(response.data.status="404"){
              Swal.fire({ icon: 'warning', text: response.data.response, timer: 3000,})
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ListArtesOrga(id_organizacion){
      let me = this;
      var items = [];
      let url = "artesListOrga/"+id_organizacion;
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          me.itemsArtesOrga = response.data.result;          
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ListMiembroOrga(id){
      let me = this;
      var items = [];
      let url = "miembroListOrga/"+id;
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
            //console.log(response)
             me.itemUserOrga = response.data;          
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
      title: "Desea Editar Organizacion?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Estoy de acuerdo!",
    }).then((result) => {
      if (result.value) {
       /// this.UpdateOrganizacion();
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
