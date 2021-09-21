<template>
	<div id="app">
		<component :is="layout">
			<router-view />
		</component>
	</div>
</template>

<script>

	export default ({
		computed: {
			// Sets components name based on current route's specified layout, defaults to
			// <layout-default></layout-default> component.
			layout() {
				return "layout-" + ( this.$route.meta.layout || "default" ).toLowerCase() ;
			}
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
				}else{
					// this.$session.destroy();
					console.log("logueado app")
				}
		  }
	})
	
</script>

<style lang="scss">
</style>