<template>
<div>
	<a-table :columns="columns" :data-source="data" :pagination="true">	
			<template slot="editBtn" slot-scope="row">
				<a-button type="primary" :data-id="row.key" >
					Borrar
				</a-button>
			</template>
	</a-table>
</div>

	<!-- / Authors Table Card -->

</template>

<script>
	export default ({
        name:'tabla-artes-orga',
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
	})

</script>