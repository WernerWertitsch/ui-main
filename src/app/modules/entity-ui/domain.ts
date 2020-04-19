import {BaseEntity} from "../../shared/domain/base-domain";

export interface Person extends BaseEntity{
  lastname: string
  firstname: string;
  birthdate: Date;
  dateCreated: Date;
  email: string[];
  phone: string[];
}

export interface Address extends BaseEntity {
  type: string;
  addressline1: string;
  addressline2: string;
  zip: string;
  city: string;
  country: string;
}
