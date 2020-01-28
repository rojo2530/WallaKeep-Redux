import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.init({
  // we init with resources
  resources: {
    en: {
      translations: {
        Introduction: "Introduction",
        Home: "Home",
        "Create Advert": "Create Advert",
        "Type": "Type",
        "all": "all",
        "Tag": "Tag",
        "Minimal Price": "Minimal Price",
        "Maximal Price": "Maximal Price",
        "buy": "buy",
        "sell": "sell",
        "Search": "Search",
        "Search Advert": "Search Advert",
        "Detail": "Detail",
        "Edit": "Edit",
        "Money Back Guarantee": "Money Back Guarantee",
        "International Delivery": "International Delivery",
        "Name": "Name", 
        "Description": "Description",
        "Price": "Price",
        "Photo": "Photo",
        "Tags": "Tags",
        "Logout": "Logout"
      }
    },
    es: {
      translations: {
        Introduction: "Introducción",
        Home: "Inicio",
        "Create Advert": "Crear Anuncio",
        "Type": "Tipo",
        "all": "Todos",
        "Tag": "Categoría",
        "Minimal Price": "Precio Mínimo",
        "Maximal Price": "Precio Máximo",
        "buy": "compra",
        "sell": "venta",
        "Search": "Buscar",
        "Search Advert": "Buscar Anuncio",
        "Detail": "Detalle",
        "Edit": "Editar",
        "Money Back Guarantee": "Devolución de dinero garantizada",
        "International Delivery": "Entrega Internacional",
        "Name": "Nombre",
        "Description": "Descripción",
        "Price": "Precio",
        "Photo": "Foto",
        "Tags": "Categorías",
        "Logout": "Salir"
      }
    },
  },
  fallbackLng: "en",
  debug: true,
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false, 
  interpolation: {
    escapeValue: false, 
    formatSeparator: ","
  },
  react: {
    wait: true
  }
});

export default i18n;