-- CreateEnum
CREATE TYPE "TRANSACTION_TYPE" AS ENUM ('INFLUX', 'OUTFLUX');

-- CreateEnum
CREATE TYPE "CATEGORY" AS ENUM ('HEALTH', 'MARKET', 'LEISURE');

-- CreateEnum
CREATE TYPE "TRANSACTION_STATUS" AS ENUM ('PLANNED', 'COMPLETED');

-- CreateTable
CREATE TABLE "Tb_user" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tb_user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Tb_transactions" (
    "transaction_id" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "influx_outflux" "TRANSACTION_TYPE" NOT NULL DEFAULT 'OUTFLUX',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "TRANSACTION_STATUS" NOT NULL DEFAULT 'COMPLETED',
    "tb_userUser_id" TEXT NOT NULL,
    "tb_categoryCategory_id" TEXT NOT NULL,

    CONSTRAINT "Tb_transactions_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "Tb_category" (
    "category_id" TEXT NOT NULL,
    "name" "CATEGORY",
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tb_category_pkey" PRIMARY KEY ("category_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tb_user_email_key" ON "Tb_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tb_user_cpf_key" ON "Tb_user"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Tb_user_phone_key" ON "Tb_user"("phone");

-- AddForeignKey
ALTER TABLE "Tb_transactions" ADD CONSTRAINT "Tb_transactions_tb_userUser_id_fkey" FOREIGN KEY ("tb_userUser_id") REFERENCES "Tb_user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tb_transactions" ADD CONSTRAINT "Tb_transactions_tb_categoryCategory_id_fkey" FOREIGN KEY ("tb_categoryCategory_id") REFERENCES "Tb_category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
