/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { BCryptHashProvider } from '@shared/container/providers/HashProvider/implementations/BCryptHashProvider';
import { app } from '@shared/infra/http/app';
import prisma from '@shared/infra/prisma';

describe('Authenticate User Controller', () => {
  beforeEach(async () => {
    const deleteUsers = prisma.user.deleteMany();
    prisma.$transaction([deleteUsers]);
  });

  it('Should be able authenticate a user', async () => {
    const hashProvider = new BCryptHashProvider();
    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'teste@test.com',
        password: await hashProvider.generateHash('asdqwe123'),
        status: 'ACTIVE',
      },
    });

    const response = await request(app).post('/sessions').send({
      email: 'teste@test.com',
      password: 'asdqwe123',
    });
    expect(response.body).toHaveProperty('token');
  });

  it('Should not be able to authenticate with celebrate errors', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'invalid-email',
      password: 'asdqwe12',
    });
    expect(response.statusCode).toEqual(400);
  });

  it('Should not be able to authenticate with invalid user', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'invalid@user.com',
        password: 'asdqwe12',
      })
      .expect(400);
    expect(response.body && response.body.message).toEqual(
      'Incorrect email/password combination.',
    );
  });

  it('Should not be able to authenticate with invalid password', async () => {
    const hashProvider = new BCryptHashProvider();
    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'teste@test.com',
        password: await hashProvider.generateHash('asdqwe123'),
        status: 'ACTIVE',
      },
    });
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'teste@test.com',
        password: 'asdqwe12',
      })
      .expect(400);
    expect(response.body && response.body.message).toEqual(
      'Incorrect email/password combination.',
    );
  });

  it('Should not be able to authenticate with inactive user', async () => {
    const hashProvider = new BCryptHashProvider();
    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'teste@test.com',
        password: await hashProvider.generateHash('asdqwe123'),
        status: 'INACTIVE',
      },
    });
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'teste@test.com',
        password: 'asdqwe12',
      })
      .expect(400);
    expect(response.body && response.body.message).toEqual(
      'This user cannot start a session.',
    );
  });
});
