import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { mimeType } from '../addadoption/mime-type.validator';
import { Store } from '../store/store.model';

@Component({
  selector: 'app-addstore',
  templateUrl: './addstore.page.html',
  styleUrls: ['./addstore.page.scss'],
})
export class AddstorePage implements OnInit {
  public store: Store;
  form: FormGroup;
  imgPreviewToUrl: string;

  constructor(public storeService: StoreService, public route: ActivatedRoute,private router:Router) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.form = new FormGroup({
      nom: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      prix: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
      tel: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      desc: new FormControl(null, { validators: [Validators.required] }),
    });
    // @ts-ignore
  }

  // tslint:disable-next-line:typedef
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreviewToUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    this.storeService.addPost(
      this.form.value.nom,
      this.form.value.prix,
      this.form.value.image,
      this.form.value.tel,
      this.form.value.desc
    );

    this.form.reset();
  }

  close(){
    this.router.navigateByUrl('/menu/store');
  }
}
