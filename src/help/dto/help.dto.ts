import { URLCategory } from '../enums/URLCategory';

export default class HelpDto {
    id: number;

    category: URLCategory;

    title: string;

    url?: URL;

    createdOn: Date;

    modifiedOn: Date; 

}
