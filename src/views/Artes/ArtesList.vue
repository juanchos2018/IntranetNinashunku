
<template>
	<div>
		
		<a-row :gutter="24" type="flex">
         
			<a-col :span="24" class="mb-24">
                 <a-button type="primary" @click="AddArte">
          AGREGAR ARTE
        </a-button>
			
				<TablaArtes
					:data="itemsArte"
					:columns="table1Columns"
				></TablaArtes>	
			</a-col>
		</a-row>	
	</div>
</template>

<script>
import axios from "axios";
	// "Authors" table component.

	// "Projects" table component.
	import TablaArtes from '@/components/Tablas/TablaArtes' ;
	
	// "Authors" table list of rows and their properties.	
	export default ({
		components: {			
			TablaArtes,
		},
		data() {
			return {
				itemsArte:[],
				// Associating "Authors" table data with its corresponding property.
				 table1Columns : [
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
			}
		},
		mounted(){
			this.artesList()
		},
		methods:{ 
			  AddArte() {
      //  this.$router.push({ name: 'UsuariosAdd', params: { id } })
      		this.$router.push({ name: "ArtesAdd" });
    	},
		  artesList() {
      let me = this;
      var items = [];
      let url = "artesList";
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          me.itemsArte = response.data;
          //	console.log(response)
        })
        .catch((error) => {
          console.log(error);
        });
    },
		}
	})

</script>

<style lang="scss">
</style>