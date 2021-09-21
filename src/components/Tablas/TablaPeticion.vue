<template>

<div>


		<!-- Authors Table Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">Lista Peticiones </h5>
				</a-col>
				
			</a-row>
		</template>
		<a-table :columns="columns" :data-source="data" :pagination="true" :row-key="data => data.id_videoventoespacio">
			
			<template slot="editBtn" slot-scope="data">
                <a-button type="primary" :data-id="data.id_videoventoespacio" @click="ver(data.id_video)">
					Ver
				</a-button>
				<a-button type="primary" :data-id="data.id_videoventoespacio" @click="Editar(data)">
					Editar
				</a-button>
			</template>
		</a-table>
	</a-card>
	<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel" class="video-popup">
      <!-- <img alt="example" style="width: 100%" :src="previewImage" /> -->
       <youtube :video-id="videoId" ref="youtube" @playing="playing"   :width= "640"
            :height="360"  >
        </youtube>


		 <!-- <iframe id="ytplayer" type="text/html" width="640" height="360"
  :src="'https://www.youtube.com/embed/' +videoId +'?autoplay=0&origin=http://example.com'"
  frameborder="0"/> -->

    </a-modal>
</div>

	
	<!-- / Authors Table Card -->
</template>

<script>


import Vue from "vue";
import VueYoutube from "vue-youtube";
import axios from "axios";
const Swal = require("sweetalert2");
Vue.use(VueYoutube);

Vue.prototype.$eventHub = new Vue();

import { mapState } from 'vuex'

	export default ({
		props: {
			data: {
				type: Array,
				default: () => [],
			},
			columns: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
				// Active button for the "Authors" table's card header radio button group.
				authorsHeaderBtns: 'all',
				videoId:'lG0Ys-2d4MA',
			    previewVisible: false,
				portata:{}
			}
		},
		  computed: {
			...mapState(['url_base'])   ,
			player() {
				return this.$refs.youtube.player;
			},
		},
		methods:{
			 playVideo() {
				this.player.playVideo();
				},
				playing() {
				console.log("\o/ we are watching!!!");
				},
			ver(idvideo){
				this.previewVisible = true;
				this.videoId=idvideo;
			},
			Editar(data){				
			 Swal.fire({
				title: "Desea Remplazar Video?",
				text: "",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Si, Estoy de acuerdo!",
				}).then((result) => {
					if (result.value) {					
						this.portata={...data};				
						this.Remplazar(this.portata)
					}
				});
				
			},
			Remplazar(modelo){
				let me = this;
				const data = modelo;     
			    let url =me.url_base+ "Control/VideoPortada.php"; 
				axios({
					method: "POST",
					url: url,
					data: data
					})
					.then(function(response) {
						console.log(response);
						if (response.data.status == "200") {        
							me.MensajeOk("Registrado con Exito !")
						    me.$emit('Agrega-Tabla');
						//	  me.$eventHub.$emit('Listar')
						}
						else if(response.data.status="404"){
							Swal.fire({ icon: 'warning', text: response.data.response, timer: 3000,})
						}
					})
					.catch((error) => {
					console.log(error);
			});
			},
			handleCancel() {
				this.previewVisible = false;
				//   this.dialog = false
				this.player.pauseVideo()
			},
			 MensajeOk(mensaje){
				let me =this;
				Swal.fire({
					title: 'Exito!',
					text: mensaje,        
					icon: 'success',     
					showCancelButton: false,
					confirmButtonColor: '#3085d6',          
					confirmButtonText: 'Ok'
				}).then((result) => {
					if (result.isConfirmed) {
					
					}
			})
			},
		}
	})

</script>



<style lang="scss" scoped>
@import './blog-style.scss';
</style>