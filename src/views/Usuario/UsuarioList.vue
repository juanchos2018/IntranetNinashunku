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
        <TablaUser :data="itemUser" :columns="table1Columns"></TablaUser>
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
  },
};
</script>

<style lang="scss"></style>
