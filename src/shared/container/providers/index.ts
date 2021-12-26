import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import { ICacheProvider } from './CacheProvider/ICacheProvider';
import { RedisCacheProvider } from './CacheProvider/implementations/RedisCacheProvider';
import { IDateProvider } from './DateProvider/IDateProvider';
import { DayJSProvider } from './DateProvider/implementations/DayJSProvider';
import { IHashProvider } from './HashProvider/IHashProvider';
import { BCryptHashProvider } from './HashProvider/implementations/BCryptHashProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { SendGridMailProvider } from './MailProvider/implementations/SendGridMailProvider';
import { IMailTemplateProvider } from './MailTemplateProvider/IMailTemplateProvider';
import { HandlebarsMailTemplateProvider } from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import { JwtTokenProvider } from './TokenProvider/implementations/JwtTokenProvider';
import { ITokenProvider } from './TokenProvider/ITokenProvider';

const providers = {
  redis: RedisCacheProvider,
  hash: BCryptHashProvider,
  mail: {
    ethereal: container.resolve(EtherealMailProvider),
    sendgrid: container.resolve(SendGridMailProvider),
  },
  mailTemplate: HandlebarsMailTemplateProvider,
  token: JwtTokenProvider,
  date: DayJSProvider,
};

container.registerSingleton<IHashProvider>('HashProvider', providers.hash);

container.registerSingleton<ICacheProvider>('CacheProvider', providers.redis);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.mailTemplate,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers.mail[mailConfig.driver],
);

container.registerSingleton<ITokenProvider>('TokenProvider', providers.token);

container.registerSingleton<IHashProvider>('HashProvider', providers.hash);

container.registerSingleton<IDateProvider>('DateProvider', providers.date);
