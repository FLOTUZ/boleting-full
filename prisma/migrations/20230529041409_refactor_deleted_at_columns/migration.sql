/*
  Warnings:

  - Made the column `deleted` on table `AccesType` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `ActivityLog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `Application` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `AuthorizedDealer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `CashlessCashier` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `CashlessDesign` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `CashlessSite` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `EventCategory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `EventSocialMedia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `Mail` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `Notification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `OwnerType` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `Role` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `SeatMap` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `SeatRow` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `SeatSection` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `Ticket` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deleted` on table `UserClient` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Abilities" ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "AccesType" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "ActivityLog" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "AuthorizedDealer" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "BuyCart" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Cashless" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "CashlessCashier" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "CashlessDesign" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "CashlessRefill" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "CashlessSite" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "EventCategory" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "EventSocialMedia" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Mail" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "MoneyBox" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "OwnerType" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "PaymentCard" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "PaymentMethod" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "PaymentRecibed" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Seat" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "SeatMap" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "SeatRow" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "SeatSection" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "UserClient" ALTER COLUMN "deleted" SET NOT NULL,
ALTER COLUMN "deleted" SET DEFAULT false;
