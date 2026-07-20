export class CreateCustomerDTO {
  comercial_profile: {
    first_name: string;
    last_name: string;
  };
  customer_documents: {
    type: string;
    document: string;
    is_primary: boolean;
  };
  customer_addresses: [
    {
      label: string;
      recipient_name: string;
      phone: string;
      postal_code: string;
      street: string;
      number: string;
      neighborhood: string;
      city: string;
      state: string;
      country: string;
    }
  ];
  customer_contacts: [
    {
      type: string;
      value: string;
      is_primary: boolean;
    }
  ]
}