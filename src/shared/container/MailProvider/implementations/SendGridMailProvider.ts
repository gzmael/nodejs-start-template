import mail, { MailService } from '@sendgrid/mail';
import mailConfig from '@config/mail';
import { ISendMailDTO } from '../dtos/ISendMailDTO';
import { IMailProvider } from '../IMailProvider';

class SendGridMailProvider implements IMailProvider {
  private client: MailService;

  constructor() {
    this.client = mail;
    this.client.setApiKey(process.env.SENDGRID_API_KEY || 'key');
  }

  async sendMail({
    subject,
    to,
    from,
    html,
    cc,
    text,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;
    await this.client
      .send({
        from: {
          name: from?.name || name,
          email: from?.email || email,
        },
        to: {
          email: to.email,
          name: to.name,
        },
        subject,
        text: text || '',
        html,
        cc,
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Mail send fails', error.response.body.errors);
      });
  }

  async sendMails(data: ISendMailDTO[]): Promise<void> {
    data.map(async ({ html, subject, to, cc, from, text }: ISendMailDTO) => {
      await this.sendMail({
        from,
        cc,
        to,
        subject,
        html,
        text,
      });
    });
  }
}

export { SendGridMailProvider };
