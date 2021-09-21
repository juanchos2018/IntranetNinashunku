<template>
  <div>
    
    <a-row type="flex" :gutter="24">
      <a-col
        :span="12"
        :xl="6"
        class="mb-24"
        v-for="item in itemOrganizaciones"
        :key="item.id_organizacion"
      >
        <card-organizacion
          :id_organizacion="item.id_organizacion"
          :nombre="item.nombreorga"
          :descripcion="item.descripcion"
        ></card-organizacion>
        <!-- / Salary Card -->
      </a-col>
    </a-row>
 

  </div>
</template>

<script>
import axios from "axios";
const Swal = require("sweetalert2");
import WidgetSalary from "@/components/Widgets/WidgetSalary";
import CardOrganizacion from "@/components/Widgets/CardOrganizacion";
export default {
  name: "mis-organizaciones",
  components: {
    WidgetSalary,
    CardOrganizacion,
  },
  data() {
    return {
      itemOrganizaciones: [],
     
    };
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
				}
		  },
  mounted() {
    this.ListMisOrganizaciones();
  },
  methods: {
    ListMisOrganizaciones() {
      let me = this;
      let id_usuario = 1;
      var items = [];
      let url = "listMisOrga/" + id_usuario;
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          me.itemOrganizaciones = response.data.result;
        //  console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
  },
};
</script>

<style></style>
