<template>
  <div>
    <a-row :gutter="24" type="flex">
      <a-col :span="24" class="mb-24">
        <h5>Datos Organizacion</h5>

    

          <center>
         
            <img src="images/redjuvenil.png" width="270" height="300" alt="" />
          </center>
      
        <!-- <a-button type="primary" @click="AddOganizacion">
          AGREGAR OTGANIZACION
        </a-button> -->

        <!-- <tabla-organizacion
          :data="itemsOrganizaciones"
          :columns="table1Columns"
        ></tabla-organizacion>
       -->
      </a-col>
    </a-row>
  </div>
</template>

<script>
import axios from "axios";

// "Projects" table component.

export default {
  components: {},
  data() {
    return {
      modelOrga: {
        nombre: "NinashunKu",
        photo: "",
      },
    };
  },
  created() {
    const currentPath = this.$router.history.current.path;
    if (!this.$session.exists()) {
      this.$router.push("/login").catch((err) => {
        if (
          err.name !== "NavigationDuplicated" &&
          !err.message.includes(
            "Evitó la navegación redundante a la ubicación actual"
          )
        ) {
          console(err);
        }
      });
    }
  },
  mounted() {
    // this.organizacionList();
  },
  methods: {
    InfoOrganizacion() {},
    AddOganizacion() {
      this.$router.push({ name: "OrganizacionAdd" });
    },
    organizacionList() {
      let me = this;
      var items = [];
      let url = "organizacionList";
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          me.itemsOrganizaciones = response.data;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss"></style>
