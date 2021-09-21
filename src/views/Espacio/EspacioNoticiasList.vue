<template>
  <div>
    <!-- Authors Table -->
    <a-row :gutter="24" type="flex">
      <!-- Authors Table Column -->
      <a-col :span="24" class="mb-24">
        <a-button type="primary" @click="AddNoticia">
          AGREGAR NOTICIA
        </a-button>        
      </a-col>
    </a-row>       
    <a-row type="flex" :gutter="24">
      <a-col
        :span="12"
        :xl="6"
        class="mb-24"
        v-for="item in itemNoticias"
        :key="item.id_noticiaeventoespacio"
      >
        <a-card hoverable style="width: 240px">
          <img slot="cover" alt="example" :src="url_base + item.photo"  width="100"
       height="200" />
          <a-card-meta :title="item.titulo">     
          
          </a-card-meta>
            <div class="divparrafo">
              <template>
                <p>{{item.parrafo}}</p>
              </template>
            </div>                   
          <template slot="actions" class="ant-card-actions">
            <a-icon key="edit" type="edit" @click="AbrirDialogoEdit(item.id_noticiaeventoespacio)" />
            <a-icon type="zoom-in" @click="show(item.id_noticiaeventoespacio)" />
            <a-icon type="delete"  @click="Delete(item.id_noticiaeventoespacio,item.photo)" />
          </template>
        </a-card>
        <!-- / Salary Card -->
      </a-col>
    </a-row>
    <!-- / Authors Table -->
     <a-modal
      title="20px to Top"
      :dialog-style="{ top: '20px' }"
      :visible="modal1Visible"
      @ok="() => disminss()"
      @cancel="() => disminss()"
    >
    <a-card hoverable style="width: 100%">
    <img
      slot="cover"
      alt="example"
      style="width: 100%"
      :src="url_base+ modelo.photo"
    />    
    <h5>{{modelo.titulo}}</h5>
  </a-card>
  <div>
       <p>{{modelo.parrafo}}</p>      
       <a :href="modelo.linkvideo" target="_blank">{{modelo.linkvideo}}</a>
  </div>        
 </a-modal>


  </div>
</template>

<script>
import axios from "axios";
const Swal = require("sweetalert2");
// "Authors" table .
import { mapState } from 'vuex'

import TablaUser from "@/components/Tablas/TablaUser";

export default {
  props: ["datos"],
  components: {    
    TablaUser,
  },
  data() {
    return {
      itemNoticias: [],
      modal1Visible: false,
      modelo:{
        id_noticiaeventoespacio:0,
        titulo:'',
        parrafo:'',
        photo:'',
        id_espacio:0,
        id_eventoespacio:0
      }
      
    };
  },
  mounted() {
    this.NoticiasList();
     if (this.datos) {
      var aray = this.datos.split("-");
      var id_espacio  = aray[0];
      var id_eventoespacio = aray[1];    
    }
  },
  computed: {
    ...mapState(['url_base'])   
  },
  methods: {
    AddNoticia() {    
      this.$router.push({ name: "EspacioNoticiaAdd" ,params:{datos:this.datos}});
    },
    NoticiasList() {
      let me = this;
     let id_espacio=0;
     let id_eventoespacio=0;
     if (this.datos) {
      var aray = this.datos.split("-");
      id_espacio  = aray[0];
      id_eventoespacio  = aray[1];
    //  this.modelFotoOrga.id_eventoespacio = id_eventoespacio;
   //   this.modelFotoOrga.id_espacio = id_espacio;      
     }
      var items = [];
      let url = me.url_base+ "Control/EventoNoticiaEspacio.php?id_espacio="+id_espacio+"&id_eventoespacio="+id_eventoespacio;
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          me.itemNoticias = response.data.result;
          //	console.log(response)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    AbrirDialogoEdit(id){
       this.$router.push({ name: "EspacioNoticiaEdit" ,params:{datos:id}});
    },
    show(id){
      this.modelo= {...this.itemNoticias.find(x=>x.id_noticiaeventoespacio==id)}
      this.modal1Visible = true;
    },
    disminss(){
       this.modal1Visible = false;
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
         // this.validateEquipo = false;
        }
      });
    },  
    Eliminar(id,photo){
      let me = this;
      me.modelo.id_noticiaeventoespacio=id;
      me.modelo.photo=photo;
      //
      const data = me.modelo;    
     // console.log(data); 
      let url =me.url_base+ "Control/EventoNoticiaEspacio.php";    
      axios({
        method: "DELETE",
        url: url,
        data: data,
        })
        .then(function(response) {
          //  console.log(response);          
          if (response.data.status == "200") {    
          //   me.modalVisible = false;    
             me.MensajeOk("Eliminado con Exito !")            
             me.NoticiasList();
                 
          }
           else if(response.data.status="404"){
              Swal.fire({ icon: 'warning', text: response.data.msg, timer: 3000,})
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    Delete(id,photo){
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
          me.Eliminar(id,photo);
      }
      })
    }
  },
};
</script>

<style lang="scss">
.divparrafo {
   width:150px;
          white-space:nowrap;
          word-break:keep-all;
          overflow:hidden;
          text-overflow:ellipsis;

}
</style>
