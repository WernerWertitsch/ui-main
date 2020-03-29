import {BaseEntity} from "../../shared/domain/base-domain";

export interface Person extends BaseEntity{
  lastname: string
  firstname: string;
  birthdate: Date;
  dateCreated: Date;
  email: string[];
  phone: string[];
}
