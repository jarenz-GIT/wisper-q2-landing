import React from 'react'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import caseStudy from './sanity/schemas/case-study'
import customerType from './sanity/schemas/customer-type'
import faq from './sanity/schemas/faq'
import pricingPackage from './sanity/schemas/pricing-package'
import siteSettings from './sanity/schemas/site-settings'

function WisperStudioIcon() {
  return React.createElement('img', {
    src: '/images/brand/wisper-studio-icon.svg',
    alt: 'Wisper Studios',
    style: {
      display: 'block',
      width: '1.5em',
      height: '1.5em',
      objectFit: 'contain',
    },
  })
}

export default defineConfig({
  name: 'wisper-studios',
  title: 'Wisper Studios',
  icon: WisperStudioIcon,
  projectId: '9uv9qcbo',
  dataset: 'production',
  studio: {
    components: {
      logo: WisperStudioIcon,
    },
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings'),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== 'siteSettings',
            ),
          ]),
    }),
  ],
  schema: {
    types: [caseStudy, customerType, faq, pricingPackage, siteSettings],
  },
})
