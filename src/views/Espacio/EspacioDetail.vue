 <template>
  <div><h5>Detalle Espacio</h5>
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 4,}">
    <a-form @submit.prevent="Validate">
      <a-row :gutter="24">


            <a-col :span="24" :md="4">
     
             <a-card hoverable style="width: 140px;background-color: black;">
                <img
                slot="cover"
                alt="example"
                :src="url_base+modelEspacio.photo"
                />
              
            </a-card>
       <div >
                 
    <center>
      <a-tooltip placement="top">
        <template slot="title">
          <span>Editar Foto</span>
        </template>   
  
          <a href="">                
          <label data-v-3a42fd9f="" data-v-10d1d8f2="" label="file" class="button file-input">
            <svg data-v-3a42fd9f="" width="30px" height="30px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload-cloud">
            <polyline data-v-3a42fd9f="" points="16 16 12 12 8 16">
              </polyline>
              <line data-v-3a42fd9f="" x1="12" y1="12" x2="12" y2="21"></line>
              <path data-v-3a42fd9f="" d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
              <polyline data-v-3a42fd9f="" points="16 16 12 12 8 16"></polyline></svg>
                <input data-v-3a42fd9f="" id="file" type="file" @change="uploadFile()"   ref="file"  style="display: none;">          
          </label>   
            </a>   
                </a-tooltip>
             </center>
        </div>
       

        </a-col>

      <!-- <a-col :span="24" :md="2">
          <a-form-item label="img">
               <b-form-file @change="onFileChange2" v-model="photo" placeholder="Seleccione un foto..." drop-placeholder="Suelta la imagen aquí..."></b-form-file>

          </a-form-item>
        </a-col> -->
        <a-col :span="24" :md="6">
          <a-form-item label="Nombre Espacio">
            <a-input placeholder="Nombres" v-model="modelEspacio.nombre_espacio">
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="24" :md="6">
          <a-form-item label="Direccion">
            <a-input placeholder="direcion" v-model="modelEspacio.direcion">
            </a-input>
          </a-form-item>
        </a-col>
      <a-col :span="12" :md="6">
          <a-form-item label="Destaca">
            <a-input placeholder="Destaca" v-model="modelEspacio.destaca">
            </a-input>
          </a-form-item>
        </a-col> 

    


      </a-row>

      <a-row :gutter="24">
          
        <!-- <a-col :span="24" :md="6">
          <a-form-item label="Destaca">
            <a-input placeholder="Destaca" v-model="modelEspacio.destaca">
            </a-input>
          </a-form-item>
        </a-col>     

       -->

      <a-col :span="24" :md="12">
          <a-form-item label="Mision">
            <a-textarea
                v-model="modelEspacio.mision"
                placeholder="Controlled autosize"
                :auto-size="{ minRows: 3, maxRows: 5 }"
                />
          </a-form-item>
        </a-col>
          <a-col :span="24" :md="12">
          <a-form-item label="Vision">
            <a-textarea
                v-model="modelEspacio.vision"
                placeholder="Controlled autosize"
                :auto-size="{ minRows: 3, maxRows: 5 }"
                />
          </a-form-item>
        </a-col>
        <!-- <a-col :span="24" :md="6">
        <a-form-item label="img">
          <b-form-file
            @change="onFileChange"
            v-model="photo"
            placeholder="Seleccione un foto..."
            drop-placeholder="Suelta la imagen aquí..."
          ></b-form-file>
        </a-form-item>
      </a-col> -->
     
        <!-- <a-col :span="12" :md="3">
          <a-form-item label="Logo">
            <a-upload
              list-type="picture-card"
              :file-list="fileList"
              :remove="handleRemove"
              @change="handleChange"
              :before-upload="beforeUpload"
              @preview="handlePreview"
            >
              <div v-if="fileList.length < 1">
                <a-icon type="plus" />
                <div class="ant-upload-text">
                  Clic
                </div>
              </div>
            </a-upload>
          </a-form-item>
        </a-col> -->

      
      </a-row>
     <a-row :gutter="24">
          <a-col :span="24" :md="12">
          <a-form-item label="Historia">
            <a-textarea
                v-model="modelEspacio.historia"
                placeholder="Controlled autosize"
                :auto-size="{ minRows: 3, maxRows: 5 }"
                />
          </a-form-item>
        </a-col>
          <a-col :span="24" :md="12">
          <a-form-item label="Objetivo">
            <a-textarea
                v-model="modelEspacio.objetivo"
                placeholder="Controlled autosize"
                :auto-size="{ minRows: 3, maxRows: 5 }"
                />
          </a-form-item>
        </a-col>      

        
    </a-row>
    <a-row :gutter="24">

        <a-col :span="24" :md="12">
          <a-form-item label="Colores">
              <div style="">             
            <v-input-colorpicker  v-model="modelEspacio.color" />
            <v-input-colorpicker style="margin-left:5px" v-model="modelEspacio.color2" />
            <!-- <a-input  v-model="modelEspacio.color" disabled>
            </a-input> -->
             </div> 
          </a-form-item>
        </a-col>
         <a-col :span="24" :md="12">
          <a-form-item label="Facebook">
            <a-input placeholder="facebook" v-model="modelEspacio.linkfacebook">
            </a-input>
          </a-form-item>
        </a-col>
    </a-row>
       <a-col :span="24" :md="3">
          <a-form-item label="Registrar">
            <a-button type="primary" html-type="submit" >
              GUARDAR ESPACIO
            </a-button>
          </a-form-item>      
        </a-col>
    </a-form>
	</a-card>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
        <Loanding :isVisible="isLoading"/>

  </div>
</template>

<script>
import axios from "axios";
const Swal = require("sweetalert2");
import Loanding from './../Loanding/Loanding'

//const je = require("json-encrypt");
import { mapState } from 'vuex'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  components: {Loanding},
  props: ["id_espacio"],

  data() {
    return {
      isLoading: false,

      fileList: [],
      itemUsuario: [],
      previewVisible: false,
      estaodousuario: true,
      validate: false,
      uploading: false,    
      photo: null,
      previewImage: "",
      file: "",
      modelEspacio: {
        id_espacio:0,
        nombre_espacio: "",
        fecha_creacion: "",
        direcion: "",
        telefono: "",
        destaca: "",
        mision:'',
        vision:'',
        color:'',
          color2:'',
            linkfacebook:'',
        objetivo:'',
        historia:'',
        estado: 1,       
        photo: "",
        id_organizacion: 1,
        id_usuario:0,
      },
      errors: {
        nombre_espacio: false,
        fecha_creacion: false,
        direcion: false,
        telefono: false,
        destaca: false,     
        id_organizacion: false,
      },
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
  computed: {
       ...mapState(['url_base'])
  },
  mounted() {
   /// this.getUsers();
    this.InfoEspacio();
  },
  methods: {
    Validate,
    loadImage,
    uploadFile: function(){
              let me =this;
              me.isLoading=true;
              me.file = this.$refs.file.files[0];
              //this.path = URL.createObjectURL(this.$refs.file.files[0]);
              const data = new FormData();              
              data.append("tipo", "edit");
              data.append('photo', me.file);              
              data.append('id_espacio', me.modelEspacio.id_espacio);   
              let url= me.url_base+'Control/espacioList.php';          
              axios({
              method: "POST",
              url: url,
              data: data,
              headers: { "Content-Type": "multipart/form-data" },
            })
              .then(function(response) {   
                me.isLoading=false;
                console.log(response);    
                if (response.data.status == "200") {
                  me.MensajeOk("Registrado con Exito !");
                  me.InfoEspacio();
                } else if ((response.data.status == "404")) {
                  Swal.fire({
                    icon: "warning",
                    text: response.data.response,
                    timer: 3000,
                  });
              }
              })
              .catch((error) => {
                  console.log("errror  :");
                  console.log(error);
                  me.isLoading=false;
              });
     },
     onFileChange2(e) {
  // e.preventDefault();
         let me = this;
         me.modelEspacio.photo= e.target.files[0];     
        let url= me.url_base+'Control/espacioList.php';          
        let data = new FormData();
         data.append("tipo", "edit");
         data.append('id_espacio', me.modelEspacio.id_espacio);   
         data.append("photo", me.modelEspacio.photo);;
     
        me.isLoading = true;
        axios({
          method: "POST",
          url: url,
          data: data,
          headers: { "Content-Type": "application/json"},
        })
          .then(function (response) {
             if (response.data.status == "200") {
                  me.MensajeOk("Registrado con Exito !");
            } else {
              Swal.fire({ icon: 'error', text: 'A ocurrido un error', timer: 3000,})
            }
            me.isLoading = false;
          })
          .catch((error) => {
            Swal.fire({ icon: 'error', text: 'A ocurrido un error', timer: 3000,})
            me.isLoading = false;
         });
     },
     AddProduct() { 
      
    },

    InfoEspacio(){
      let me = this;      
      //let url = "espacioInfo/" + id_espacio;
      let url = me.url_base+ "Control/espacioList.php?id_espacio=" + me.id_espacio;
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
           // console.log(response)
           me.modelEspacio = response.data.result;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      //  console.log(file);
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
       // console.log(file.preview);
      }
      ///  this.previewImage = file.url || file.preview;
      this.previewImage = this.fileList[0].thumbUrl;  
      this.previewVisible = true;
    },
    
   
    onFileChange(e) {
    //  this.modelEquipo.photo = e.target.files[0];
             var     foto=new Image();
             foto.src= e.target.files[0];    
            var img = new Image();
            var URL = window.URL || window.webkitURL;
            var img = new Image();
            img.src = URL.createObjectURL(e.target.files[0]);       
            img.onload = function () {
                var ancho = img.width;
                var alto = img.height
               // console.log(ancho + ' ' + alto);
            }              
 
    },  
    handleChange(e) {
      this.modelEspacio.photo = e.file;
      this.fileList = e.fileList;
        ///  foto.src= e.target.files[0];   
        if ( this.fileList.length>0) {
        var img = new Image();
        var URL = window.URL || window.webkitURL;
        var img = new Image();
        img.src = URL.createObjectURL(e.file);      
        img.onload = function () {
            var ancho = img.width;
            var alto = img.height

        }     
       }                

    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },

    handleProvinceChange(value) {
      this.modelEspacio.id_usuario = value;
    },
    updateEspacio() {     
      let me = this; 
      let url =me.url_base+ "Control/espacioList.php"; 
   //   me.modelEspacio.estado = me.estaodousuario == true ? 1 : 0;      
     let data =me.modelEspacio;
      axios({
        method: "PUT",
        url: url,
        data: data    
      })
        .then(function(response) {
       //   console.log(response);
          if (response.data.status == "200") {        
             me.MensajeOk("Actualizado con Exito !")
             me.InfoEspacio();
          }
           else if(response.data.status="404"){
              Swal.fire({ icon: 'warning', text: response.data.response, timer: 3000,})
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    limpiar(){
      this.modelEspacio.nombre_espacio="";
      this.modelEspacio.direcion="";
      this.fileList=[];
    },
    getUsers() {
      let me = this;
      var items = [];
     // let url = "usuarioList";
        let url = me.url_base+ "Control/usuarioList.php";
      axios({
        method: "GET",
        url: url,
      })
        .then(function(response) {
          items = response.data;
          items.map(function(x) {
            if (x.id_tipousuario!=1) {
                me.itemUsuario.push({
                text: x.nombre+"-"+x.apellido,
                value: x.id_usuario,
            });
            }
            
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ConsultaUsurioEspacio(id_usuario){
        let me = this;
        let url = me.url_base+ "Control/Consulta.php?id_usuario="+id_usuario;
        axios({
           method: "GET",
           url: url,
         })
        .then(function(response) {
           // console.log(response);
            if (response.data.nroregistros>0) {
                Swal.fire(
                  'Ups?',
                  'Este usario ya esta jefe de otro espacio',
                  'info'
                )
            }else{
                 me.AddEspacio();
            }

        })
        .catch((error) => {
          console.log(error);
        });
    },
    MensajeOk(mensaje){
        Swal.fire({
            title: 'Exito!',
            text: mensaje,        
            icon: 'success',     
            showCancelButton: false,
            confirmButtonColor: '#3085d6',          
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
                //    this.ClearText();
                   this.validate = false;
            }
       })
    }

  },
};

function loadImage(imagen) {
 
    var _URL = window.URL || window.webkitURL;
    var img = new Image();
    img.src = _URL.createObjectURL(imagen);
    img.onload = function () {
        var ancho = img.width;
        var alto = img.height
        //console.log(ancho + ' ' + alto);
    }
}

function Validate() {
 
  this.errors.nombre_espacio = this.modelEspacio.nombre_espacio == "" ? true : false;
  this.errors.direcion = this.modelEspacio.direcion == "" ? true : false;
  this.errors.destaca =  this.modelEspacio.destaca == "" ? true : false;

  //this.errors.id_organizacion =  this.modelEspacio.id_organizacion == 0 ? true : false;

  if (this.errors.nombre_espacio) {
    this.validate = true;
    Swal.fire({
      icon: "warning",
      text: "Verifique que campos necesarios esten llenados",
      timer: 2000,
    });
    return false;
  } else {
    this.validate = false;
  }
 
  if (this.errors.direcion) {
    this.validate = true;
    Swal.fire({
      icon: "warning",
      text: "Verifique que campos necesarios esten llenados",
      timer: 2000,
    });
    return false;
  } else {
    this.validate = false;
  }

  if (this.errors.destaca) {
    this.validate = true;
    Swal.fire({
      icon: "warning",
      text: "Verifique que campos necesarios esten llenados",
      timer: 2000,
    });
    return false;
  } else {
    this.validate = false;
  }

  let me = this;

  if (!this.validate) {
    Swal.fire({
      title: "Desea Editar?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Estoy de acuerdo!",
    }).then((result) => {
      if (result.value) {
          this.updateEspacio();
      }
    });
  }
}
</script>

<style>
.center-cropped {
  object-fit: none; /* Do not scale the image */
  object-position: center; /* Center the image within the element */
  height: 100px;
  width: 100px;
}
</style>
