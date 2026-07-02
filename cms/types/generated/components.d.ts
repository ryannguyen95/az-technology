import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksHighlight extends Struct.ComponentSchema {
  collectionName: 'components_blocks_highlights';
  info: {
    displayName: '\u0110i\u1EC3m n\u1ED5i b\u1EADt';
    icon: 'check';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeSubsection extends Struct.ComponentSchema {
  collectionName: 'components_home_subsections';
  info: {
    displayName: 'M\u1EE5c con (Sub-section)';
    icon: 'bulletList';
  };
  attributes: {
    parentCategory: Schema.Attribute.Relation<
      'oneToOne',
      'api::parent-category.parent-category'
    >;
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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
      'blocks.highlight': BlocksHighlight;
      'home.subsection': HomeSubsection;
      'seo.meta': SeoMeta;
    }
  }
}
