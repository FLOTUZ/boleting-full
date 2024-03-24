import { Event } from "@prisma/client";

import { Args } from "../common";
import { IGraphqlContext } from "../common/graphql.context";
import { AuthenticationError } from "../utils";

import { validateData } from "@/validations";
import { CreateEventValidator, UpdateEventValidator } from "@/validations";
import {
  AccessTypeService,
  EventService,
  EventSubCategoryService,
  ImageService,
  OrganizationService,
  TicketService,
  UserService,
} from "../services";
import { supabaseUploadFile } from "@/utils/supabase-upload.util";
import { base64Decoder } from "@/utils/file.util";

export const EventResolver = {
  Query: {
    events: async (
      _: any,
      { pagination }: Args,
      { id_organization }: IGraphqlContext
    ) => {
      return await EventService.events(pagination, id_organization!);
    },

    event: async (_: any, { id }: { id: number }, __: IGraphqlContext) => {
      return await EventService.event(id);
    },
    eventsByCategory: async (
      _: any,
      { categoryId }: { categoryId: number },
      __: IGraphqlContext
    ) => {
      return await EventService.eventsByCategory(categoryId);
    },

    eventsBySubcategory: async (
      _: any,
      { subCategoryId }: { subCategoryId: number },
      __: IGraphqlContext
    ) => {
      return await EventService.eventsBySubCategory(subCategoryId);
    },
    popular_events: async (
      _: any,
      { pagination }: Args,
      { id_organization }: IGraphqlContext
    ) => {
      return await EventService.popular_events(pagination);
    },

    search_events: async (
      _: any,
      { query, pagination }: { query: string } & Args,
      __: IGraphqlContext
    ) => {
      if (query.length < 3) return [];
      return await EventService.searchEvents(query, pagination);
    },
  },

  Mutation: {
    createEvent: async (
      _: any,
      {
        data,
      }: {
        data: Event & {
          event_sub_categories: number[];
          base_64_event_logo: string;
          base_64_event_banner: string;
        };
      },
      { id_user, id_organization }: IGraphqlContext
    ) => {
      if (!id_user) throw new AuthenticationError("User not authenticated");
      await validateData({ schema: CreateEventValidator, data });

      // Remove base64 event logo and banner properties form data object
      const {
        base_64_event_logo: event_logo,
        base_64_event_banner: event_banner,
        ...payload
      } = data;

      if (!event_logo) {
        // Decode base64 event logo and banner
        const logo = await base64Decoder(event_logo!);
        payload.event_logoId = (await supabaseUploadFile({ file: logo })).id;
      }

      if (!event_banner) {
        const banner = await base64Decoder(event_banner!);
        // Upload logo and banner to supabase
        payload.event_bannerId = (
          await supabaseUploadFile({ file: banner })
        ).id;
      }

      return await EventService.createEvent(id_user, id_organization!, payload);
    },

    updateEvent: async (
      _: any,
      {
        id,
        data,
      }: {
        id: number;
        data: Event & {
          event_sub_categories: number[];
          base_64_event_logo: string;
          base_64_event_banner: string;
        };
      },
      __: IGraphqlContext
    ) => {
      await validateData({ schema: UpdateEventValidator, data: data });

      const {
        base_64_event_logo: event_logo,
        base_64_event_banner: event_banner,
        ...payload
      } = data;

      if (event_logo) {
        // Decode base64 event logo and banner
        const logo = await base64Decoder(event_logo!);
        payload.event_logoId = (await supabaseUploadFile({ file: logo })).id;
      }

      if (event_banner) {
        const banner = await base64Decoder(event_banner!);
        // Upload logo and banner to supabase
        payload.event_bannerId = (
          await supabaseUploadFile({ file: banner })
        ).id;
      }

      return await EventService.updateEvent(id, payload);
    },

    deleteEvent: async (_: any, { id }: Event, __: IGraphqlContext) => {
      return await EventService.deleteEvent(id);
    },
  },

  Event: {
    createdBy: async ({ id }: Event, _: any, __: IGraphqlContext) => {
      return await EventService.createdBy(id);
    },

    event_sub_categories: async (
      { id }: Event,
      _: any,
      __: IGraphqlContext
    ) => {
      return await EventSubCategoryService.eventSubCategoriesByCategoryEventId(
        id
      );
    },

    access_types: async ({ id }: Event, _: any, __: IGraphqlContext) => {
      return await AccessTypeService.accessTypesByEventId(id);
    },

    selled_tickets: async ({ id }: Event, _: any, __: IGraphqlContext) => {
      return await TicketService.selledTicketsByEvent(id);
    },

    staff: async ({ id }: Event, _: any, __: IGraphqlContext) => {
      return await UserService.staffByEvent(id);
    },

    organization: async (
      { organizationId }: Event,
      _: any,
      __: IGraphqlContext
    ) => {
      return await OrganizationService.organization(organizationId);
    },
    event_logo: async (
      { event_logoId }: Event,
      _: any,
      __: IGraphqlContext
    ) => {
      return event_logoId ? await ImageService.image(event_logoId) : null;
    },

    event_banner: async (
      { event_bannerId }: Event,
      _: any,
      __: IGraphqlContext
    ) => {
      return event_bannerId ? await ImageService.image(event_bannerId) : null;
    },
  },
};
