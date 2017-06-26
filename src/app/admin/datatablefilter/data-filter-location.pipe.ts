import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataLocationFilter"
})
export class DataFilterLocationPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.loc_father.toLowerCase().indexOf(query.toLowerCase()) > -1 || row.loc_description.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        return array;
    }
}


