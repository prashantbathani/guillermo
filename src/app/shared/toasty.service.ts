import { Injectable } from "@angular/core";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from "ng2-toasty";

@Injectable()
export class toastyService {

    constructor(private toastyService: ToastyService) {
    }

    addToast(type, title, message) {

        switch (type) {
            case 'Default': this.toastyService.default({
                title: title,
                msg: message,
                showClose: true,
                timeout: 5000,
                theme: "material"
            }); break;
            case 'Info': this.toastyService.info({
                title: title,
                msg: message,
                showClose: true,
                timeout: 5000,
                theme: "material"
            }); break;
            case 'Success': this.toastyService.success({
                title: title,
                msg: message,
                showClose: true,
                timeout: 5000,
                theme: "material"
            }); break;
            case 'Wait': this.toastyService.wait({
                title: title,
                msg: message,
                showClose: true,
                timeout: 0,
                theme: "material",
            }); break;
            case 'Error': this.toastyService.error({
                title: title,
                msg: message,
                showClose: true,
                timeout: 5000,
                theme: "material"
            }); break;
            case 'Warning': this.toastyService.warning({
                title: title,
                msg: message,
                showClose: true,
                timeout: 5000,
                theme: "material"
            }); break;
        }

    }

    removeToast() {
        this.toastyService.clearAll();
    }
}