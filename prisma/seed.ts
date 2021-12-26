/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import { BCryptHashProvider } from '@shared/container/providers/HashProvider/implementations/BCryptHashProvider';

const prisma = new PrismaClient();

async function main() {
  const hash = new BCryptHashProvider();

  const jezmael = await prisma.user.upsert({
    where: {
      email: 'jezmael@baitasolucoes.com.br',
    },
    update: {},
    create: {
      email: 'jezmael@baitasolucoes.com.br',
      name: 'Jezmael',
      status: 'ACTIVE',
      type: 'ADMIN',
      password: await hash.generateHash('asdqwe123'),
    },
  });

  console.log({ jezmael });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
