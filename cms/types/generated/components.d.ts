import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksFaq extends Struct.ComponentSchema {
  collectionName: 'components_blocks_faqs';
  info: {
    displayName: 'FAQ';
    icon: 'question';
  };
  attributes: {
    items: Schema.Attribute.Component<'blocks.faq-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_faq_items';
  info: {
    displayName: 'FAQ Item';
    icon: 'question';
  };
  attributes: {
    a: Schema.Attribute.Text & Schema.Attribute.Required;
    q: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksRichText extends Struct.ComponentSchema {
  collectionName: 'components_blocks_rich_texts';
  info: {
    displayName: 'Rich Text (HTML)';
    icon: 'align-left';
  };
  attributes: {
    heading: Schema.Attribute.String;
    html: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface BlocksSpecAccordion extends Struct.ComponentSchema {
  collectionName: 'components_blocks_spec_accordions';
  info: {
    displayName: 'Spec Accordion';
    icon: 'apps';
  };
  attributes: {
    rows: Schema.Attribute.Component<'blocks.spec-row', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksSpecRow extends Struct.ComponentSchema {
  collectionName: 'components_blocks_spec_rows';
  info: {
    displayName: 'Spec Row';
    icon: 'apps';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SeoMeta extends Struct.ComponentSchema {
  collectionName: 'components_seo_metas';
  info: {
    displayName: 'SEO Meta';
    icon: 'search';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    ogImage: Schema.Attribute.Media<'images'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.faq': BlocksFaq;
      'blocks.faq-item': BlocksFaqItem;
      'blocks.rich-text': BlocksRichText;
      'blocks.spec-accordion': BlocksSpecAccordion;
      'blocks.spec-row': BlocksSpecRow;
      'seo.meta': SeoMeta;
    }
  }
}
