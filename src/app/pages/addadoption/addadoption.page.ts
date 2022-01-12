import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdoptionService } from 'src/app/services/adoption.service';
import { mimeType } from './mime-type.validator';
import { Post } from './post.model';


@Component({
  selector: 'app-addadoption',
  templateUrl: './addadoption.page.html',
  styleUrls: ['./addadoption.page.scss'],
})
export class AddadoptionPage implements OnInit {
  public post: Post;
  form: FormGroup;
  imgPreviewToUrl: string;
   private mode = 'create';
 private postID: string;
 
 
  constructor(public postService: AdoptionService,
              public route: ActivatedRoute,private router:Router
             ) {
  }
 
   // tslint:disable-next-line:typedef
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null,
        {validators: [Validators.required, Validators.minLength(3)] }),
      content: new FormControl(null,
        {validators: [Validators.required]}),
      image: new FormControl(null,
        {validators: [Validators.required], asyncValidators: [mimeType]}),
      age: new FormControl(null,
          {validators: [Validators.required]}),
          ville: new FormControl(null,
            {validators: [Validators.required]}),
            race: new FormControl(null,
              {validators: [Validators.required]}),
              cetegorie: new FormControl(null,
                {validators: [Validators.required]}),
                tel: new FormControl(null,
                  {validators: [Validators.required]}),

    });
    // @ts-ignore
    
  }
 
   // tslint:disable-next-line:typedef
     onImagePicked(event: Event) {
     const file = (event.target as HTMLInputElement).files[0];
     this.form.patchValue({ image: file});
     this.form.get('image').updateValueAndValidity();
     const reader = new FileReader();
     reader.onload = () => {
       this.imgPreviewToUrl = reader.result as string;
     };
     reader.readAsDataURL(file);
 
     }
   
 
   onSavePost() {
   
      this.postService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image,
        this.form.value.age,
        this.form.value.ville,
        this.form.value.race,
        this.form.value.cetegorie,
        this.form.value.tel
      );
    
    this.form.reset();
  }
  close(){
    this.router.navigateByUrl('/menu/adoption');
  }
 
 }
 

  
