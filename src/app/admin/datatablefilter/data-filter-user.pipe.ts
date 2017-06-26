import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataUserPermissionFilter"
})
export class DataFilterUserPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.use_name.toLowerCase().indexOf(query.toLowerCase()) > -1 || row.use_nick_name.toLowerCase().indexOf(query.toLowerCase()) > -1 || row.use_last_name.toLowerCase().indexOf(query.toLowerCase()) > -1 || row.use_email.toLowerCase().indexOf(query.toLowerCase()) > -1 ||row.cou_description.toLowerCase().indexOf(query.toLowerCase()) > -1 || row.use_birthday.toLowerCase().indexOf(query.toLowerCase()) > -1 || row.use_create.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        return array;
    }
}

