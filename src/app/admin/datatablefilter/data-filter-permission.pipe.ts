import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataPermissionFilter"
})
export class DataFilterPermissionPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.per_name.toLowerCase().indexOf(query.toLowerCase()) > -1 || row.per_description.toLowerCase().indexOf(query.toLowerCase()) > -1 || row.per_rest_url.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        return array;
    }
}


