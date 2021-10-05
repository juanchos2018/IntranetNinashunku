<template>
  <div>
    <!-- Authors Table -->
    <a-row :gutter="24" type="flex">
      <!-- Authors Table Column -->
      <a-col :span="24" class="mb-24">
        <a-button type="primary" @click="AddUser">
          AGREGAR USUARIO
        </a-button>
        <!-- Authors Table Card -->
        <TablaUser :data="itemUser" :columns="table1Columns" v-on:Eliminar="Delete"></TablaUser>
      </a-col>
    </a-row>
    <!-- / Authors Table -->
  </div>
</template>

<script>
import axios from "axios";
const Swal = require("sweetalert2");
import { mapState } from 'vuex'
import TablaUser from "@/components/Tablas/TablaUser";

export default {
  components: {    
    TablaUser,
  },
  data() {
    return {
      itemUser: [],
      modelusuario:{id_usuario:0},
      table1Columns: [
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
          width: 30,
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
    };
  },
  mounted() {
    this.usuarioList();
  },
  computed: {
    ...mapState(['url_base'])   
  }, 
  methods: {
    AddUser() {
      //  this.$router.push({ name: 'UsuariosAdd', params: { id } })
      this.$router.push({ name: "UsuariosAdd" });
    },
    usuarioList() {
      let me = this;
      var items = [];
      let url = me.url_base+ "Control/usuarioList.php";
      //let url = "usuarioList";
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          me.itemUser = response.data;
          //	console.log(response)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    Eliminar(id){
				let me = this;
				me.modelusuario.id_usuario=id;
				const data = me.modelusuario;    
				///console.log(data); 
				let url =me.url_base+ "Control/usuarioList.php";    
				axios({
					method: "DELETE",
					url: url,
					data: data,
					})
					.then(function(response) {
					//  console.log(response);          
            if (response.data.status == "200") {    
            //	me.modalVisible = false;    
              me.MensajeOk("Eliminado con Exito !")    
              me.usuarioList();        
            //	me.ListVideosEspacio(me.modelVideoOrga.id_espacio,me.modelVideoOrga.id_eventoespacio);							
            //	me.Limpiar();
            }
            else if(response.data.status="404"){
              Swal.fire({ icon: 'warning', text: response.data.msg, timer: 3000,})
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
				},
			Limpiar(){
				   	this.modelVideoOrga.nombre_video="";
						this.modelVideoOrga.descrip_video="des";
						this.modelVideoOrga.urlvideo="";
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
</script>

<style lang="scss"></style>
