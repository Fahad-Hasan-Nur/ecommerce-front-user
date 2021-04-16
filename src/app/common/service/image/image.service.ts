import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMAGE_API } from '../../constants/api.constants';


@Injectable({
  providedIn: 'root',
})
export class ImageService {

  constructor(private _http: HttpClient) { }

  /**
   * Upload a new image.
   *
   * @param image
   * @returns image
   */
  public uploadImage(data: FormData):Observable<any> {
      return this._http.post(IMAGE_API.ADD_IMAGE, data);
  }
    /**
   * Returns list of products.
   *
   * @returns Product list
   */
  public getImageById(id): Observable<any> {
    return this._http.get(IMAGE_API.GET_IMAGE_BY_ID+id);
  }
}
