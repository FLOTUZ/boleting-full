import Stripe from "stripe";
import { prisma } from "@/server";

import { Pagination } from "../common";
import { PrismaError } from "../utils";
import { AccessType, Order, PaymentMethodType } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { CancelPaymentPath, SuccessPaymentPath } from "@/routes";

//
// Service for Order model
//

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-10-16",
});

export const OrderService = {
  async orders(pagination?: Pagination) {
    return prisma.order.findMany({
      ...pagination,
      where: { deleted: false },
    });
  },

  async order(id: number) {
    return await prisma.order.findUnique({ where: { id } });
  },

  async createFreeOrder(
    user_clientId: number,
    event_id: number,
    access_typeId: number,
    buyed_access_count: number = 1
  ) {
    const userClient = await prisma.userClient.findUniqueOrThrow({
      include: { orders: true },
      where: { id: user_clientId },
    });

    // TODO: make mantainer for verify this
    // only can buy twice for free
    userClient.orders.forEach((order) => {
      if (order.access_typeId === access_typeId) {
        throw new PrismaError({
          code: "BAD_REQUEST",
          message:
            "Solo puede hacer una compra por evento. Es posible que tengas una orden para este evento.",
        });
      }
    });

    const accessType = await prisma.accessType.findUniqueOrThrow({
      include: { event: true },
      where: { id: access_typeId },
    });

    const total_price: number =
      Number(buyed_access_count) * Number(accessType?.price);

    const order = await prisma.order.create({
      include: { payment_method: true },
      data: {
        eventId: event_id,
        individual_price: Number(accessType?.price),
        buyed_access_count,
        total_price,
        user_clientId,
        access_typeId,
        expiry_time: new Date(Date.now() + 1000 * 60 * 5), // 5minutes
        is_paid: true,
      },
    });

    await prisma.ticket.createMany({
      data: Array.from({ length: buyed_access_count }, (_, i) => ({
        eventId: accessType.eventId,
        access_typeId: accessType.id,
        serial_number: uuidv4(),
        orderId: order.id,
      })),
    });

    return order;
  },

  async createOpenVenueOrder(
    user_clientId: number,
    event_id: number,
    access_typeId: number,
    buyed_access_count: number = 1
  ) {
    const userClient = await prisma.userClient.findUniqueOrThrow({
      where: { id: user_clientId },
    });
    const accessType = await prisma.accessType.findUniqueOrThrow({
      include: { event: true },
      where: { id: access_typeId },
    });

    const total_price: number = buyed_access_count * Number(accessType?.price);

    const order = await prisma.order.create({
      include: { payment_method: true },
      data: {
        eventId: event_id,
        individual_price: Number(accessType?.price),
        buyed_access_count,
        total_price,
        user_clientId,
        access_typeId,
        expiry_time: new Date(Date.now() + 1000 * 60 * 5), // 5minutes
        is_paid: false,
      },
    });

    const ticket_fees = total_price * 0.07;
    const stripe_fee = (total_price + ticket_fees) * 0.0766;

    const total_fees = Math.round(ticket_fees + stripe_fee);

    await prisma.ticket.createMany({
      data: Array.from({ length: buyed_access_count }, (_, i) => ({
        eventId: accessType.eventId,
        access_typeId: accessType.id,
        serial_number: uuidv4(),
        orderId: order.id,
      })),
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "MXN",
            product_data: {
              name: `${accessType.event.name} - ${accessType.name}`,
              metadata: {
                id: accessType.id,
                name: accessType.name,
                event_id: accessType.eventId,
                price: Number(accessType.price),
              },
            },
            unit_amount: Number(accessType.price) * 100,
          },
          quantity: buyed_access_count,
        },

        {
          price_data: {
            currency: "MXN",
            product_data: {
              name: `Cargos por servicio x ${buyed_access_count}`,
              metadata: {
                name: "Cargos por servicio",
                price: total_fees,
              },
            },
            unit_amount: total_fees * 100,
          },
          quantity: 1,
        },
      ],
      currency: "MXN",
      mode: "payment",
      customer_email: userClient.email,
      success_url: `${process.env.BASE_URL}${SuccessPaymentPath(
        String(order.id)
      )}`,
      cancel_url: `${process.env.BASE_URL}${CancelPaymentPath(
        String(order.id)
      )}`,
    });

    return session.url;
  },

  async updateOrder(id: number, data: Order) {
    try {
      return await prisma.order.update({
        where: { id },
        data: { ...data },
      });
    } catch (error) {
      throw PrismaError.handle(error);
    }
  },

  async deleteOrder(id: number) {
    return await prisma.order.delete({
      where: { id },
    });
  },

  // ======================= FOR ANOTHER RESOLVERS =======================

  async currentClientOrders(id_user: number) {
    return await prisma.order.findMany({
      include: { event: true },
      where: { user_clientId: id_user, deleted: false },
    });
  },
};
