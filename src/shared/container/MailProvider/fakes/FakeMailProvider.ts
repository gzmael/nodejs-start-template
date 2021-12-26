import { ISendMailDTO } from '../dtos/ISendMailDTO';
import { IMailProvider } from '../IMailProvider';

class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }

  public async sendMails(data: ISendMailDTO[]): Promise<void> {
    data.forEach((mail: ISendMailDTO): void => {
      this.sendMail(mail);
    });
  }
}

export { FakeMailProvider };
