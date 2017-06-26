import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataRolePermissionFilter"
})
export class DataFilterRolePermissionPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.rol_name.toLowerCase().indexOf(query.toLowerCase()) > -1 || row.per_rest_url.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        return array;
    }
}

