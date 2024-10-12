import type { Struct, Schema } from '@strapi/strapi';

export interface TipTip extends Struct.ComponentSchema {
  collectionName: 'components_tip_tips';
  info: {
    displayName: 'Tip';
  };
  attributes: {
    Nazev: Schema.Attribute.String & Schema.Attribute.Required;
    Popis: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ObrazekObrazky extends Struct.ComponentSchema {
  collectionName: 'components_obrazek_obrazkies';
  info: {
    displayName: 'Obrazky';
  };
  attributes: {};
}

export interface DetailProgramDetaily extends Struct.ComponentSchema {
  collectionName: 'components_detail_program_detailies';
  info: {
    displayName: 'ProgramDetaily';
  };
  attributes: {
    Detaily: Schema.Attribute.RichText;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'tip.tip': TipTip;
      'obrazek.obrazky': ObrazekObrazky;
      'detail.program-detaily': DetailProgramDetaily;
    }
  }
}
