interface Address {
  street: string;
  building: string;
  city: string;
  zipcode: string;
}

interface Company {
  name: string;
  scope: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
