interface IMailConfig {
  driver: 'ethereal' | 'sendgrid';

  defaults: {
    from: {
      email: string;
      name: string;
    };
    to: {
      email: string;
      name: string;
    };
    app: string;
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'jezmael@baitasolucoes.com.br',
      name: 'Jezmael Basilio',
    },
    to: {
      email: 'jezmaelbasilio@gmail.com',
      name: 'Jezmael Basilio',
    },
    app: 'NodeJS Boilerplate',
  },
} as IMailConfig;
