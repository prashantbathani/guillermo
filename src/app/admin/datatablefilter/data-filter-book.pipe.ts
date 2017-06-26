import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataBookFilter"
})
export class DataFilterBookPipe implements PipeTransform {
    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row.boo_name.toLowerCase().indexOf(query.toLowerCase()) > -1 || row.boo_description.toLowerCase().indexOf(query.toLowerCase()) > -1);
        }
        return array;
    }
}

