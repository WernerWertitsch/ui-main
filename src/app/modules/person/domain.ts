interface BaseEntity {
  id: string;
}

export interface Person {
  id: string;
  lastname: string
  firstname: string;
  birthdate: Date;
  dateCreated: Date;
  email: string[];
  phone: string[];
}
