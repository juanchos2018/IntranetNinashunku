<template>

	<!-- Authors Table Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">Lista Organizaciones</h5>
				</a-col>				
			</a-row>
		</template>
		<a-table :columns="columns" :data-source="data" :pagination="true">
	    	<template slot="estado" slot-scope="estado">
				<a-tag class="tag-status" :class="estado ? 'ant-tag-primary' : 'ant-tag-muted'">
					{{ estado ? "ACTIVO" : "INACTIVO" }}
				</a-tag>
			</template>

			<template slot="editBtn" slot-scope="row">
				<a-button type="button" :data-id="row.id_organizacion"  @click="() => DetalleOrganizacion(row.id_organizacion)" >
					Detalle 
				</a-button>
			</template>

		</a-table>
	</a-card>
	<!-- / Authors Table Card -->

</template>

<script>
	export default {
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
			}
		},
		methods:{
			 DetalleOrganizacion(id_organizacion){   
				// 	 console.log("ddsd")      
				 console.log(id_organizacion)         
				this.$router.push({
					name: "OrganizacionDetail",
					params: { id_organizacion: id_organizacion},
				});
	    	},
		}
	}

</script>