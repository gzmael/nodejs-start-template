/* eslint-disable no-console */
import nodemailer, { Transporter } from 'nodemailer';
import mailConfig from '@config/mail';
import { ISendMailDTO } from '../dtos/ISendMailDTO';
import { IMailProvider } from '../IMailProvider';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        console.error(`Failed to create a testing account. ${err.message}`);
      }

      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  }

  public async sendMail({
    subject,
    to,
    from,
    html,
    cc,
    text,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;
    try {
      const message = await this.client.sendMail({
        from: {
          name: from?.name || name,
          address: from?.email || email,
        },
        cc,
        to: {
          name: to.name,
          address: to.email,
        },
        text,
        subject,
        html,
      });

      console.log('Message sent: %s', message.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    } catch (err) {
      console.log('Error Ethereal', err);
    }
  }

  public async sendMails(data: ISendMailDTO[]): Promise<void> {
    data.map(async mail => {
      await this.sendMail({
        from: mail.from,
        cc: mail.cc,
        to: mail.to,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
      });
    });
  }
}

export { EtherealMailProvider };
