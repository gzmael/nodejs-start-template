-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PATIENT', 'PARTNER', 'ADMIN');

-- CreateEnum
CREATE TYPE "StatusUser" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "TypeUserToken" AS ENUM ('ACTIVE', 'REFRESH', 'PASSWORD');

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "publicId" UUID NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "lastName" VARCHAR,
    "socialNumber" VARCHAR,
    "cellphone" VARCHAR,
    "avatar" VARCHAR,
    "type" "Role" NOT NULL DEFAULT E'PATIENT',
    "status" "StatusUser" NOT NULL DEFAULT E'INACTIVE',
    "addressId" BIGINT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserToken" (
    "id" BIGSERIAL NOT NULL,
    "publicId" UUID NOT NULL,
    "userId" BIGINT NOT NULL,
    "token" VARCHAR NOT NULL,
    "type" "TypeUserToken" NOT NULL DEFAULT E'ACTIVE',
    "expiresDate" TIMESTAMP(6) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_socialNumber_key" ON "User"("socialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_cellphone_key" ON "User"("cellphone");

-- AddForeignKey
ALTER TABLE "UserToken" ADD CONSTRAINT "UserToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
