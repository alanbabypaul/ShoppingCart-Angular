import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toaster: ToastrService ) { }

  showSuccess(msg:string) {
    this.toaster.success( msg);
}


showError(msg:string) {
  this.toaster.error( msg);
}



showWarning(msg:string) {
  this.toaster.warning( msg);
}
}
