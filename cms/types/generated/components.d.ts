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
    products: Schema.Attribute.Relation<'manyToMany', 'api::product.product'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsCategoryList extends Struct.ComponentSchema {
  collectionName: 'components_sections_category_lists';
  info: {
    description: 'M\u1ED9t kh\u1ED1i trang ch\u1EE7 hi\u1EC3n th\u1ECB l\u01B0\u1EDBi c\u00E1c danh m\u1EE5c (m\u1ED7i danh m\u1EE5c = 1 \u00F4).';
    displayName: 'Kh\u1ED1i l\u01B0\u1EDBi danh m\u1EE5c';
    icon: 'grid';
  };
  attributes: {
    categories: Schema.Attribute.Relation<
      'manyToMany',
      'api::category.category'
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsProductList extends Struct.ComponentSchema {
  collectionName: 'components_sections_product_lists';
  info: {
    description: 'M\u1ED9t kh\u1ED1i trang ch\u1EE7 hi\u1EC3n th\u1ECB danh s\u00E1ch s\u1EA3n ph\u1EA9m, c\u00F3 th\u1EC3 chia th\u00E0nh nhi\u1EC1u m\u1EE5c con.';
    displayName: 'Kh\u1ED1i danh s\u00E1ch s\u1EA3n ph\u1EA9m';
    icon: 'bulletList';
  };
  attributes: {
    parentCategory: Schema.Attribute.Relation<
      'oneToOne',
      'api::parent-category.parent-category'
    >;
    products: Schema.Attribute.Relation<'manyToMany', 'api::product.product'>;
    subsections: Schema.Attribute.Component<'home.subsection', true>;
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
      'sections.category-list': SectionsCategoryList;
      'sections.product-list': SectionsProductList;
      'seo.meta': SeoMeta;
    }
  }
}
