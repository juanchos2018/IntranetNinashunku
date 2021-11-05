<template>

	<!-- Authors Table Card -->
	<a-card :bordered="false" class="dashboard-bar-line header-solid">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">Mensajes</h5>
				</a-col>
				
			</a-row>
		</template>
		<a-table :columns="columns" :data-source="data" :pagination="true" :row-key="data => data.id_mensaje">
			
			
		</a-table>
	</a-card>
	<!-- / Authors Table Card -->

</template>

<script>
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
			}
		},
		methods:{
			Editar(id){
				//console.log(id)
			}
		}
	})

</script>