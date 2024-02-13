-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_payment_methodId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "payment_methodId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_payment_methodId_fkey" FOREIGN KEY ("payment_methodId") REFERENCES "PaymentMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;
