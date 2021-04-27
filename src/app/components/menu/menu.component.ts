import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Menu} from '../../models/menu';
import {User} from '../../models/user';
import {MenuService} from '../../services/menu.service';
import {UserService} from '../../services/user.service';
import {Settings} from '../../models/settings';
import {HttpClient} from '@angular/common/http';
import {UploadService} from '../../services/upload.service';
import {register} from 'ts-node';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild('idMarcaSi') dataIdMarcaSi: string;
  @ViewChild('idMarcaNo') dataIdMarcaNo: string;
  @ViewChild('idNameProducto') dataIdNameProducto: string;
  @ViewChild('idNameProductoUpdate') dataIdNameProductoUpdate: string;
  @ViewChild('idEmpresaProducto') dataIdEmpresaProducto: string;
  @ViewChild('idDescripcion') dataIdDescripcion: string;
  @ViewChild('idPrecioProducto') dataIdPrecioProducto: string;
  @ViewChild('idPrecioProductoSi') dataIdProductoSi: string;
  @ViewChild('idPrecioProductoNo') dataProductoNo: string;
  @ViewChild('idVigencia') dataIdVigencia: string;
  @ViewChild('idVigenciaSi') dataIdVigenciaSi: string;
  @ViewChild('idVigenciaNo') dataIdVigenciaNo: string;
  // @ViewChild('idImagen') dataIdImagen: string;
  // @ViewChild('idAnexos') dataIdAnexos: string;

  public nombreProducto;
  public descripcionProducto;
  public marcaProducto;
  public vigencia;
  public precio;
  public statusProductoMarca = true;
  public statusPrecio = true;
  public vigenciaProducto = true;
  public menu: Menu;
  public token;
  public status;
  public identity;
  public saveMenu = false;
  public menuData;
  public validNombre = false;
  public validDetalles = false;
  public productUpdate;
  public deleteProductNotification = false;
  public image;
  public selectImage;
  public statusRegister = false;
  public progressRegister = 0;
  files: File[] = [];


  public updateNombre;
  public updateDetalles;
  public updatePrecio;
  public updateVigencia;
  public updateEmpresa;
  public updateImagen;
  public updateAnexos;
  public updateUser;
  public productId;

  constructor(
   private _menuService: MenuService,
   private _userService: UserService,
   private _http: HttpClient,
   private _uploadService: UploadService
  ) {
    this.identity = this._userService.getIdentity();
    this.descripcionProducto = 'Aquí va la descripción del producto, escribe algo en la sección de' +
      ' registro';
    this.nombreProducto = 'Nombre producto';
    this.marcaProducto = 'Marca';
    this.vigencia = '12/12/2100';
    this.precio = '0'
    this.menu = new Menu(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      this.identity._id,
    );
  }

  ngOnInit(): void {
    this.token = this._userService.getToken();
    this.uploadImage();
    this.getMenu();
  }

  getMenu(){
    this._menuService.getMenu(this.identity._id, this.token).subscribe((data)=> {
      this.menuData = data.menus;
    })
  }

  uploadImage(){
   /* var bar = document.getElementById('js-progressbar');
    UIkit.upload('.js-upload', {

      url: '',
      multiple: true,

      beforeSend: function () {
        console.log('beforeSend', arguments);
      },
      beforeAll: function () {
        console.log('beforeAll', arguments);
      },
      load: function () {
        console.log('load', arguments);
      },
      error: function () {
        console.log('error', arguments);
      },
      complete: function () {
        console.log('complete', arguments);
      },

      loadStart: function (e) {
        console.log('loadStart', arguments);

        bar.removeAttribute('hidden');
        bar.max = e.total;
        bar.value = e.loaded;
      },

      progress: function (e) {
        console.log('progress', arguments);

        bar.max = e.total;
        bar.value = e.loaded;
      },

      loadEnd: function (e) {
        console.log('loadEnd', arguments);

        bar.max = e.total;
        bar.value = e.loaded;
      },

      completeAll: function () {
        console.log('completeAll', arguments);

        setTimeout(function () {
          bar.setAttribute('hidden', 'hidden');
        }, 1000);

        alert('Upload Completed');
      }

    });*/
  }

  empresaProducto(value){
    if (value === 'si'){
      this.statusProductoMarca = true;
    } else {
      this.statusProductoMarca = false;
      this.dataIdEmpresaProducto = '';
      this.updateEmpresa = '';
    }
  }

  precioProducto(value){
    if (value === 'si'){
      this.statusPrecio = true;
    } else {
      this.statusPrecio = false;
      this.precio = '';
      this.updatePrecio = '';
    }
  }

  estatusVigencia(value){
    if (value === 'si'){
      this.vigenciaProducto = true;
    } else {
      this.vigenciaProducto = false;
      this.vigencia = '';
      this.updateVigencia = '';
    }
  }

  nombreProductoData(value){
    if (value === ""){
      this.nombreProducto = 'Nombre Producto';
    } else {
      if (value.length <= 26){
        this.validNombre = false;
        this.nombreProducto = value;
        this.updateNombre = value;
      } else {
        this.validNombre = true;
        this.nombreProducto = 'Nombre producto';
      }
    }
  }

  marcaProductoData(value){
    if (value === ""){
      this.marcaProducto = 'Marca';
    } else {
      this.marcaProducto = value;
      this.updateEmpresa = value;
    }
  }

  descripcionProductoData(value){
    console.log(value.length);
    if (value === ""){
      this.descripcionProducto = 'Aquí va la descripción del producto, escribe algo en la sección de registro';
    } else {
      if (value.length <= 45){
        this.validDetalles = false;
        this.descripcionProducto = value;
        this.updateDetalles = value;
      } else {
        this.validDetalles = true;
        this.descripcionProducto = 'Aquí va la descripción del producto, escribe algo en la sección de registro';
      }
    }
  }

  precioProductoData(value){
    console.log(value.length);
    if (value === ""){
      this.precio = '0';
    } else {
      this.precio = value;
      this.updatePrecio = value;
    }
  }

  vigenciaProductoData(value){
    if (value === ""){
      this.vigencia = '00/00/0000';
    } else {
      this.vigencia = value
      this.updateVigencia = value;
      console.log(value)
    }
  }

  onFileSelected(event){
    this.selectImage = event.target.files[0];
  }


  onSubmit(form){
    this.progressRegister = 5;
    const file_data = this.files[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset','images-vxosplatform');
    data.append('cloud_name', 'vxosplatform');
    this.statusRegister = true;
    this._uploadService.uploadImage(data).subscribe((data) => {
      if(data){
        this.progressRegister = 65;
        console.log(data);
        this.image = 'https://res.cloudinary.com/vxosplatform/image/upload/c_scale,h_713,w_1000/v1597631715/' + data.public_id + '.' + data.format;
        this.registerItemMenu(form, this.image);
      }
    });


  }

  registerItemMenu(form, image){
    console.log(image);
    this.menu.imagen = image;
    this._menuService.registerMenu(this.menu, this.token).subscribe(
      response => {
        form.reset();
        this.saveMenu = true;
        this.files = [];
        setTimeout (() => {
          this.statusRegister = false;
          this.progressRegister = 99;
          this.getMenu();
        }, 200);
        setTimeout (() => {
          this.saveMenu = false;
        }, 5000);
      },
      error => {
        console.log(error as any);
      });
  }

  onSearchChange(searchValue: string): void {
    console.log(searchValue);
    if (searchValue !== ' '){
      this._menuService.search(this.identity._id, {nombre: searchValue}).subscribe(
        response => {
          console.log(response.search);
          this.menuData = response.search;
        }, error => {
          // tslint:disable-next-line:prefer-const
          let errorMessage = error as any;
          console.log(errorMessage);
          if (errorMessage != null){
            this.status = 'error';
          }
        }
      );
    }
  };

  updateProduct(){
    // this.changeSettings = true;
    console.log(this.updateVigencia);
    console.log(this.dataIdNameProductoUpdate);
    this._menuService.getMenuId(this.productId, this.token).subscribe((data) => {
      console.log(data.menus[0].imagen);
    });
    const file_data = this.files[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset','images-vxosplatform');
    data.append('cloud_name', 'vxosplatform');
    this._uploadService.uploadImage(data).subscribe((data) => {
      if(data){
        console.log(data);
        this.image = 'https://res.cloudinary.com/vxosplatform/image/upload/c_scale,h_713,w_1000/v1597631715/' + data.public_id + '.' + data.format;
        this.updateExecute(this.image);
      }
    });


  }

  updateExecute(image ?){

    this.productUpdate = {
      _id: this.productId,
      nombre: this.updateNombre,
      detalles: this.updateDetalles,
      precio: this.updatePrecio,
      vigencia: this.updateVigencia,
      empresa: this.updateEmpresa,
      imagen: image,
      anexos: '',
      user: this.identity._id,
    };
    console.log(this.productUpdate);
    this._menuService.updateMenu(this.productUpdate, this.token).subscribe(
      response => {
        if (!response.menu){
          this.status = 'error';
        } else {
          this.status = 'success';
        }

      },
      error => {
        // tslint:disable-next-line:prefer-const
        let errorMessage = error as any;
        console.log(errorMessage);

        if (errorMessage != null){
          this.status = 'error';
        }
      }
    );
    setTimeout (() => {
      this.saveMenu = true;
      this.getMenu();
    }, 200);
    setTimeout (() => {
      this.saveMenu = false;
    }, 5000);
  }

  checkDataUpdate(update){
    console.log(update);
    this.updateNombre = update.nombre;
    this.updateDetalles = update.detalles;
    this.updatePrecio = update.precio;
    this.updateVigencia = update.vigencia;
    this.updateEmpresa = update.empresa;
    this.updateImagen = update.imagen;
    this.updateAnexos = update.anexos;
    this.updateUser = update.user
    this.productId = update._id;
  }

  deleteProducto(){
    this._menuService.deleteMenu(this.token, this.productId).subscribe((data) => {
        this.deleteProductNotification = true;
      setTimeout (() => {
        this.getMenu();
      }, 200);
      setTimeout (() => {
        this.deleteProductNotification = false;
      }, 5000);
    })
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }


}
