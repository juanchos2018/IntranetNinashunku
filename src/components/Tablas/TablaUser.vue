<template>

	<!-- Authors Table Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">Lista Usuarios</h5>
				</a-col>
				
			</a-row>
		</template>
		<a-table :columns="columns" :data-source="data" :pagination="true" :row-key="data => data.id_usuario">
			<template slot="estado" slot-scope="estado">
				<a-tag class="tag-status" :class="estado ? 'ant-tag-primary' : 'ant-tag-muted'">
					{{ estado ? "ACTIVO" : "INACTIVO" }}
				</a-tag>
			</template>
			<template slot="editBtn" slot-scope="data">
				<a-button type="primary" :data-id="data.id_usuario" @click="Editar(data.id_usuario)">
					Editar
				</a-button>
			</template>

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