/*
  Warnings:

  - You are about to drop the column `buy_cartId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the `BuyCart` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "PaymentMethodType" ADD VALUE 'NONE';

-- DropForeignKey
ALTER TABLE "BuyCart" DROP CONSTRAINT "BuyCart_payment_methodId_fkey";

-- DropForeignKey
ALTER TABLE "BuyCart" DROP CONSTRAINT "BuyCart_recibed_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "BuyCart" DROP CONSTRAINT "BuyCart_user_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_buy_cartId_fkey";

-- AlterTable
ALTER TABLE "PaymentMethod" ALTER COLUMN "payment_type" SET DEFAULT 'NONE';

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "buy_cartId",
ADD COLUMN     "orderId" INTEGER;

-- DropTable
DROP TABLE "BuyCart";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "total_price" MONEY NOT NULL,
    "is_paid" BOOLEAN DEFAULT false,
    "user_clientId" INTEGER NOT NULL,
    "payment_methodId" INTEGER NOT NULL,
    "authorized_dealerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_clientId_fkey" FOREIGN KEY ("user_clientId") REFERENCES "UserClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_payment_methodId_fkey" FOREIGN KEY ("payment_methodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_authorized_dealerId_fkey" FOREIGN KEY ("authorized_dealerId") REFERENCES "AuthorizedDealer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
