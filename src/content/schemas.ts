import { z } from 'zod';
export const schemas = {
  pages: {
    home: z.object({
      "avatars": z.array(z.object({
        "id": z.string(),
        "color": z.string(),
        "initial": z.string()
      })),
      "headlineWords": z.array(z.string()),
      "pricingTiers": z.array(z.object({
        "id": z.string(),
        "name": z.string(),
        "priceMonthly": z.number(),
        "priceAnnual": z.number(),
        "description": z.string(),
        "features": z.array(z.string()),
        "cta": z.string(),
        "popular": z.boolean()
      })),
      "testimonials": z.array(z.object({
        "id": z.string(),
        "name": z.string(),
        "role": z.string(),
        "company": z.string(),
        "quote": z.string(),
        "avatar": z.string()
      })),
      "faqs": z.array(z.object({
        "id": z.string(),
        "q": z.string(),
        "a": z.string()
      }))
    }),
    about: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "mission": z.object({
        "headline": z.string(),
        "body": z.string(),
        "values": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "team": z.array(z.object({
        "id": z.string(),
        "name": z.string(),
        "role": z.string(),
        "bio": z.string(),
        "avatar": z.string()
      })),
      "stats": z.array(z.object({
        "id": z.string(),
        "value": z.string(),
        "label": z.string()
      })),
      "cta": z.object({
        "headline": z.string(),
        "body": z.string(),
        "buttonText": z.string()
      })
    }),
    preorder: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "perks": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "description": z.string()
      })),
      "fomo": z.object({
        "spotsLeft": z.string(),
        "deadline": z.string()
      })
    }),
    contact: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "channels": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "detail": z.string()
      })),
      "form": z.object({
        "heading": z.string(),
        "successTitle": z.string(),
        "successBody": z.string(),
        "submitLabel": z.string(),
        "sendingLabel": z.string()
      })
    })
  }
};
export type Schemas = typeof schemas;