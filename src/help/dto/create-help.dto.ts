import { URLCategory } from '../enums/URLCategory';

export class CreateHelpDto {
    id: number;

    category: URLCategory;

    title: string;

    url?: URL;

    createdOn: Date;

    modifiedOn: Date; 

}
