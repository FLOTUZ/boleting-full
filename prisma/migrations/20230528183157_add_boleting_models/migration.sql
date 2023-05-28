/*
  Warnings:

  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ActivityLogType" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'LOGIN');

-- CreateEnum
CREATE TYPE "SeatSectionType" AS ENUM ('ASSIGNED_SEATTING', 'UNASSIGNED_SEATTING', 'AREAS_OF_INTEREST');

-- CreateEnum
CREATE TYPE "SeatAlignment" AS ENUM ('CENTER', 'LEFT_ALIGN', 'RIGHT_ALIGN');

-- CreateEnum
CREATE TYPE "SeatStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'TEMPORARILY_UNAVAILABLE', 'RESERVED', 'TAKEN');

-- CreateEnum
CREATE TYPE "PaymentMethodType" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'DEALER', 'OXXO');

-- CreateEnum
CREATE TYPE "CashLessType" AS ENUM ('VIRTUAL', 'PAPER_STICKY', 'PVC_CARD', 'BRACELET', 'RING', 'CUSTOM');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "last_name" VARCHAR(50) NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "deleted" DROP NOT NULL,
ALTER COLUMN "deleted" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Abilities" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Abilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserClient" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "UserClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "tittle" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "redirect_url" VARCHAR(255),
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER,
    "user_clientId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mail" (
    "id" SERIAL NOT NULL,
    "to" VARCHAR(255) NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "userId" INTEGER,
    "user_clientId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Mail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" SERIAL NOT NULL,
    "tittle" VARCHAR(50) NOT NULL,
    "description" VARCHAR(100),
    "useful_link" VARCHAR(255),
    "type" "ActivityLogType" NOT NULL,
    "userId" INTEGER,
    "userClientId" INTEGER,
    "applicationId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "token" VARCHAR(255) NOT NULL,
    "expires_in" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roleId" INTEGER NOT NULL,
    "deleted" BOOLEAN,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "event_key" VARCHAR(8),
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "event_location" VARCHAR(255) NOT NULL,
    "event_location_url" VARCHAR(255) NOT NULL,
    "date" DATE NOT NULL,
    "start_time" DATE,
    "end_time" DATE,
    "re_entry" BOOLEAN NOT NULL DEFAULT false,
    "event_logo_url" VARCHAR(255),
    "event_banner_url" VARCHAR(255),
    "hostId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSocialMedia" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(255),
    "url" VARCHAR(255) NOT NULL,
    "eventId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "EventSocialMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "EventCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccesType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "description" VARCHAR(255),
    "enter_and_exit_option" BOOLEAN DEFAULT false,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "AccesType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OwnerType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "description" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "OwnerType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "serial_number" VARCHAR(6) NOT NULL,
    "price" MONEY NOT NULL,
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "is_used" BOOLEAN DEFAULT false,
    "service_charge" MONEY NOT NULL,
    "eventId" INTEGER NOT NULL,
    "access_typeId" INTEGER,
    "owner_typeId" INTEGER,
    "buy_cartId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeatMap" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "backround_image_url" VARCHAR(255) NOT NULL,
    "image_height" INTEGER NOT NULL DEFAULT 0,
    "image_width" INTEGER NOT NULL DEFAULT 0,
    "eventId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SeatMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeatSection" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "section_index" VARCHAR(5) NOT NULL,
    "seat_alignment" "SeatAlignment" DEFAULT 'CENTER',
    "seat_section_type" "SeatSectionType" DEFAULT 'ASSIGNED_SEATTING',
    "icon_url" VARCHAR(255),
    "background_color" VARCHAR(7),
    "text_caption_color" VARCHAR(7),
    "capacity" INTEGER DEFAULT 0,
    "position_x" INTEGER DEFAULT 0,
    "position_y" INTEGER DEFAULT 0,
    "rotation" INTEGER DEFAULT 0,
    "seat_mapId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SeatSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeatRow" (
    "id" SERIAL NOT NULL,
    "row_index" VARCHAR(5) NOT NULL,
    "seat_sectionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SeatRow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" SERIAL NOT NULL,
    "unique_seat_number" VARCHAR(5) NOT NULL,
    "seat_price" MONEY NOT NULL,
    "seat_status" "SeatStatus" NOT NULL DEFAULT 'AVAILABLE',
    "seat_rowId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentCard" (
    "id" SERIAL NOT NULL,
    "is_credit_card" BOOLEAN NOT NULL DEFAULT true,
    "nick_name" VARCHAR(255) NOT NULL,
    "owner_name" VARCHAR(255) NOT NULL,
    "card_number" VARCHAR(255) NOT NULL,
    "expiration_date" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "user_clientId" INTEGER NOT NULL,
    "payment_methodId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" SERIAL NOT NULL,
    "payment_type" "PaymentMethodType" NOT NULL DEFAULT 'CREDIT_CARD',
    "description" VARCHAR(255),
    "payment_reference" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuyCart" (
    "id" SERIAL NOT NULL,
    "total_price" MONEY NOT NULL,
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "userClientId" INTEGER NOT NULL,
    "payment_methodId" INTEGER NOT NULL,
    "recibed_paymentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuyCart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentRecibed" (
    "id" SERIAL NOT NULL,
    "payment_date" TIMESTAMP NOT NULL,
    "payment_amount" MONEY NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "is_refunded" BOOLEAN NOT NULL DEFAULT false,
    "authorized_dealerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentRecibed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthorizedDealer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "telephone" VARCHAR(15) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "commision" MONEY NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "AuthorizedDealer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashlessDesign" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,
    "cashless_type" "CashLessType" NOT NULL,
    "virtual_image_url" VARCHAR(255),
    "paper_sticky_image_url" VARCHAR(255),
    "pv_card_image_url" VARCHAR(255),
    "paper_band_image_url" VARCHAR(255),
    "chip_area_image_url" VARCHAR(255),
    "band_image_url" VARCHAR(255),
    "ring_image_url" VARCHAR(255),
    "custom_design_plane_url" VARCHAR(255),
    "require_leds" BOOLEAN DEFAULT false,
    "number_of_leds" INTEGER,
    "led_color" VARCHAR(255),
    "require_batery" BOOLEAN DEFAULT false,
    "require_case" BOOLEAN DEFAULT false,
    "case_plane_image_url" VARCHAR(255),
    "unit_budget" MONEY NOT NULL,
    "aproximate_requered_units" INTEGER NOT NULL DEFAULT 0,
    "require_approval" BOOLEAN NOT NULL DEFAULT true,
    "is_aproved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CashlessDesign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cashless" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "it_was_already_refounded" BOOLEAN NOT NULL DEFAULT false,
    "user_clientId" INTEGER NOT NULL,
    "cashless_designId" INTEGER NOT NULL,
    "cashless_siteId" INTEGER NOT NULL,
    "cashless_cashierId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cashless_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashlessSite" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "where_is" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,
    "cashless_cashierId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CashlessSite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashlessRefill" (
    "id" SERIAL NOT NULL,
    "money" MONEY NOT NULL,
    "user_clientId" INTEGER NOT NULL,
    "cashlessId" INTEGER NOT NULL,
    "money_boxId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CashlessRefill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoneyBox" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "init_money" MONEY NOT NULL,
    "final_money" MONEY NOT NULL,
    "total_box_flow" MONEY NOT NULL,
    "cashless_cashierId" INTEGER NOT NULL,
    "opened_byId" INTEGER NOT NULL,
    "closed_byId" INTEGER NOT NULL,
    "open_at" TIMESTAMP(3) NOT NULL,
    "closed_at" TIMESTAMP(3),

    CONSTRAINT "MoneyBox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CashlessCashier" (
    "id" SERIAL NOT NULL,
    "cashier_name" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CashlessCashier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AbilitiesToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_users" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_staff_of_events" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_atendee_of_events" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Abilities_id_key" ON "Abilities"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Abilities_name_key" ON "Abilities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_id_key" ON "Role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserClient_id_key" ON "UserClient"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserClient_email_key" ON "UserClient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_id_key" ON "Notification"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_tittle_key" ON "Notification"("tittle");

-- CreateIndex
CREATE UNIQUE INDEX "Mail_id_key" ON "Mail"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityLog_id_key" ON "ActivityLog"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ActivityLog_tittle_key" ON "ActivityLog"("tittle");

-- CreateIndex
CREATE UNIQUE INDEX "Application_id_key" ON "Application"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Application_name_key" ON "Application"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Application_token_key" ON "Application"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Event_event_key_key" ON "Event"("event_key");

-- CreateIndex
CREATE UNIQUE INDEX "Event_name_key" ON "Event"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EventSocialMedia_id_key" ON "EventSocialMedia"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EventSocialMedia_name_key" ON "EventSocialMedia"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EventCategory_id_key" ON "EventCategory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EventCategory_name_key" ON "EventCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AccesType_id_key" ON "AccesType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AccesType_name_key" ON "AccesType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "OwnerType_id_key" ON "OwnerType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OwnerType_name_key" ON "OwnerType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_id_key" ON "Ticket"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_serial_number_key" ON "Ticket"("serial_number");

-- CreateIndex
CREATE UNIQUE INDEX "SeatMap_id_key" ON "SeatMap"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SeatSection_id_key" ON "SeatSection"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SeatRow_id_key" ON "SeatRow"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Seat_id_key" ON "Seat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentCard_id_key" ON "PaymentCard"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentCard_card_number_key" ON "PaymentCard"("card_number");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentCard_payment_methodId_key" ON "PaymentCard"("payment_methodId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethod_id_key" ON "PaymentMethod"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BuyCart_id_key" ON "BuyCart"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentRecibed_id_key" ON "PaymentRecibed"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AuthorizedDealer_id_key" ON "AuthorizedDealer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AuthorizedDealer_name_key" ON "AuthorizedDealer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CashlessDesign_id_key" ON "CashlessDesign"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Cashless_id_key" ON "Cashless"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Cashless_code_key" ON "Cashless"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Cashless_user_clientId_key" ON "Cashless"("user_clientId");

-- CreateIndex
CREATE UNIQUE INDEX "CashlessSite_id_key" ON "CashlessSite"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CashlessRefill_id_key" ON "CashlessRefill"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MoneyBox_id_key" ON "MoneyBox"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CashlessCashier_id_key" ON "CashlessCashier"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_AbilitiesToRole_AB_unique" ON "_AbilitiesToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_AbilitiesToRole_B_index" ON "_AbilitiesToRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_users_AB_unique" ON "_users"("A", "B");

-- CreateIndex
CREATE INDEX "_users_B_index" ON "_users"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_staff_of_events_AB_unique" ON "_staff_of_events"("A", "B");

-- CreateIndex
CREATE INDEX "_staff_of_events_B_index" ON "_staff_of_events"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_atendee_of_events_AB_unique" ON "_atendee_of_events"("A", "B");

-- CreateIndex
CREATE INDEX "_atendee_of_events_B_index" ON "_atendee_of_events"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClient" ADD CONSTRAINT "UserClient_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_clientId_fkey" FOREIGN KEY ("user_clientId") REFERENCES "UserClient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mail" ADD CONSTRAINT "Mail_user_clientId_fkey" FOREIGN KEY ("user_clientId") REFERENCES "UserClient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_userClientId_fkey" FOREIGN KEY ("userClientId") REFERENCES "UserClient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "EventCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSocialMedia" ADD CONSTRAINT "EventSocialMedia_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccesType" ADD CONSTRAINT "AccesType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_access_typeId_fkey" FOREIGN KEY ("access_typeId") REFERENCES "AccesType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_owner_typeId_fkey" FOREIGN KEY ("owner_typeId") REFERENCES "OwnerType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_buy_cartId_fkey" FOREIGN KEY ("buy_cartId") REFERENCES "BuyCart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatSection" ADD CONSTRAINT "SeatSection_seat_mapId_fkey" FOREIGN KEY ("seat_mapId") REFERENCES "SeatMap"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatRow" ADD CONSTRAINT "SeatRow_seat_sectionId_fkey" FOREIGN KEY ("seat_sectionId") REFERENCES "SeatSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_seat_rowId_fkey" FOREIGN KEY ("seat_rowId") REFERENCES "SeatRow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentCard" ADD CONSTRAINT "PaymentCard_payment_methodId_fkey" FOREIGN KEY ("payment_methodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentCard" ADD CONSTRAINT "PaymentCard_user_clientId_fkey" FOREIGN KEY ("user_clientId") REFERENCES "UserClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyCart" ADD CONSTRAINT "BuyCart_userClientId_fkey" FOREIGN KEY ("userClientId") REFERENCES "UserClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyCart" ADD CONSTRAINT "BuyCart_payment_methodId_fkey" FOREIGN KEY ("payment_methodId") REFERENCES "PaymentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyCart" ADD CONSTRAINT "BuyCart_recibed_paymentId_fkey" FOREIGN KEY ("recibed_paymentId") REFERENCES "PaymentRecibed"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentRecibed" ADD CONSTRAINT "PaymentRecibed_authorized_dealerId_fkey" FOREIGN KEY ("authorized_dealerId") REFERENCES "AuthorizedDealer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorizedDealer" ADD CONSTRAINT "AuthorizedDealer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashlessDesign" ADD CONSTRAINT "CashlessDesign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cashless" ADD CONSTRAINT "Cashless_user_clientId_fkey" FOREIGN KEY ("user_clientId") REFERENCES "UserClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cashless" ADD CONSTRAINT "Cashless_cashless_designId_fkey" FOREIGN KEY ("cashless_designId") REFERENCES "CashlessDesign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cashless" ADD CONSTRAINT "Cashless_cashless_siteId_fkey" FOREIGN KEY ("cashless_siteId") REFERENCES "CashlessSite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cashless" ADD CONSTRAINT "Cashless_cashless_cashierId_fkey" FOREIGN KEY ("cashless_cashierId") REFERENCES "CashlessCashier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashlessSite" ADD CONSTRAINT "CashlessSite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashlessSite" ADD CONSTRAINT "CashlessSite_cashless_cashierId_fkey" FOREIGN KEY ("cashless_cashierId") REFERENCES "CashlessCashier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashlessRefill" ADD CONSTRAINT "CashlessRefill_user_clientId_fkey" FOREIGN KEY ("user_clientId") REFERENCES "UserClient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashlessRefill" ADD CONSTRAINT "CashlessRefill_cashlessId_fkey" FOREIGN KEY ("cashlessId") REFERENCES "Cashless"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashlessRefill" ADD CONSTRAINT "CashlessRefill_money_boxId_fkey" FOREIGN KEY ("money_boxId") REFERENCES "MoneyBox"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyBox" ADD CONSTRAINT "MoneyBox_opened_byId_fkey" FOREIGN KEY ("opened_byId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyBox" ADD CONSTRAINT "MoneyBox_closed_byId_fkey" FOREIGN KEY ("closed_byId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoneyBox" ADD CONSTRAINT "MoneyBox_cashless_cashierId_fkey" FOREIGN KEY ("cashless_cashierId") REFERENCES "CashlessCashier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashlessCashier" ADD CONSTRAINT "CashlessCashier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbilitiesToRole" ADD CONSTRAINT "_AbilitiesToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Abilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbilitiesToRole" ADD CONSTRAINT "_AbilitiesToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users" ADD CONSTRAINT "_users_A_fkey" FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_users" ADD CONSTRAINT "_users_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_staff_of_events" ADD CONSTRAINT "_staff_of_events_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_staff_of_events" ADD CONSTRAINT "_staff_of_events_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_atendee_of_events" ADD CONSTRAINT "_atendee_of_events_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_atendee_of_events" ADD CONSTRAINT "_atendee_of_events_B_fkey" FOREIGN KEY ("B") REFERENCES "UserClient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
