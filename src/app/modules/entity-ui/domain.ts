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

export interface Stimmbericht extends BaseEntity {
  kalenderId: string;
  luftfeuchtigkeit: string;
  klavierstimmungVorher: string;
  klavierstimmungNachher: string;
  resonanzboden: string;
  stege: string;
  saiten: string;
  stimmwirbel: string;
  stimmstock: string;
  hammerkoepfe: string;
  mechanik: string;
  daempfer: string;
  tastatur: string;
  oberflaeche: string;
  rahmen: string;
  anmerkungen: string;
  oertlichkeit: string;
  transport: string;
  nacharbeit: string;
  zahlungsart: string;
  kostenvoranschlag: boolean;
}
