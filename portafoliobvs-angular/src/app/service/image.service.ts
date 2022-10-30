import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, list, getDownloadURL} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string = "";
  url2: string = "";

  constructor(private storage: Storage) { }

  public uploadImageP($event: any, name: string){
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `imagesP/`+ name)
    uploadBytes(imgRef, file)
    .then(response => (this.getImages()))
    .catch(error => console.log(error)
    )
  }

  getImages(){
    const imagesRef = ref(this.storage, 'imagesP')
    list(imagesRef)
    .then(async response => {
      for(let item of response.items){
        this.url = await getDownloadURL(item);
        console.log("La URL es " + this.url);
        
      }
  })
    .catch(error => console.log(error))
    

  }

  public uploadImageS($event: any, name: string){
    const file = $event.target.files[0];
    const imgRefS = ref(this.storage, `imagesSkillP/`+ name)
    uploadBytes(imgRefS, file)
    .then(response => (this.getImagesS()))
    .catch(error => console.log(error)
    )
  }


  getImagesS(){
    const imagesRefS = ref(this.storage, 'imagesSkillP')
    list(imagesRefS)
    .then(async response => {
      for(let item of response.items){
        this.url2 = await getDownloadURL(item);
        console.log("La URL es " + this.url2);
        
      }
  })
    .catch(error => console.log(error))
    

  }
}