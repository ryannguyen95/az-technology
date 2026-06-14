import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksCta extends Struct.ComponentSchema {
  collectionName: 'components_blocks_ctas';
  info: {
    displayName: 'CTA';
    icon: 'cursor';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    sub: Schema.Attribute.Text;
  };
}

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

export interface BlocksFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_blocks_feature_items';
  info: {
    displayName: 'Feature Item';
    icon: 'check';
  };
  attributes: {
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksFeatureList extends Struct.ComponentSchema {
  collectionName: 'components_blocks_feature_lists';
  info: {
    displayName: 'Feature List';
    icon: 'bulletList';
  };
  attributes: {
    items: Schema.Attribute.Component<'blocks.feature-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksProcessStep extends Struct.ComponentSchema {
  collectionName: 'components_blocks_process_steps_items';
  info: {
    displayName: 'Process Step';
    icon: 'arrowRight';
  };
  attributes: {
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksProcessSteps extends Struct.ComponentSchema {
  collectionName: 'components_blocks_process_steps';
  info: {
    displayName: 'Process Steps';
    icon: 'arrowRight';
  };
  attributes: {
    steps: Schema.Attribute.Component<'blocks.process-step', true>;
    title: Schema.Attribute.String;
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
      Schema.Attribute.CustomField<'plugin::ckeditor5.CKEditor'>;
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
      'blocks.cta': BlocksCta;
      'blocks.faq': BlocksFaq;
      'blocks.faq-item': BlocksFaqItem;
      'blocks.feature-item': BlocksFeatureItem;
      'blocks.feature-list': BlocksFeatureList;
      'blocks.process-step': BlocksProcessStep;
      'blocks.process-steps': BlocksProcessSteps;
      'blocks.rich-text': BlocksRichText;
      'blocks.spec-accordion': BlocksSpecAccordion;
      'blocks.spec-row': BlocksSpecRow;
      'seo.meta': SeoMeta;
    }
  }
}
