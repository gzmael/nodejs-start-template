interface IMailContact {
  name: string;
  email: string;
}

interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  html: string;
  text?: string;
  cc?: string | undefined;
}

export { ISendMailDTO };
