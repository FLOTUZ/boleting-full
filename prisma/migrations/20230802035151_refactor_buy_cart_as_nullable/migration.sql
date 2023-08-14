-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_buy_cartId_fkey";

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "buy_cartId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_buy_cartId_fkey" FOREIGN KEY ("buy_cartId") REFERENCES "BuyCart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
