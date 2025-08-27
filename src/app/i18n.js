import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  "en-US": {
    translation: {
      task_label: "Item",
      add_task: "Add new item",
      tasks_title: "Pending",
      completed_task: "Picked!",
      delete_confirm_message: "Are you sure you want to delete all the items?",
      create_task_title: "Create new item",
      edit_task_title: "Edit item",
      empty_tasks: "Your list is empty",
      empty_tasks_two: "Nothing here yet… start adding your groceries!",
      delete_on_complete_label: "Delete on picked",
      create_task: "ADD ITEM",
      save_item: "SAVE ITEM",
      delete_item: "DELETE ITEM",
      share_list_aria: "Share shopping list",
      shopping_list: "Shopping List",
      no_pending_items: "No pending items to share",
      list_copied: "List copied to clipboard!",
      save: "Save",
      delete: "Delete",
      cancel: "Cancel",
      edit_item: "Edit item",
      popular_items: "Popular Items",
      show_more: "Show More",
      welcome_title: "Welcome to ShopList!",
      welcome_message:
        "This is a simple shopping list application. We are happy to see you here.",
      get_started: "Get Started",
    },
  },
  "es-MX": {
    translation: {
      task_label: "Nombre del producto",
      add_task: "Agregar a la lista",
      tasks_title: "Mi súper lista 🛒",
      completed_task: "¡Agarrado!",
      empty_tasks_two:
        "Nada por aquí aún… ¡échale lo que se te antoje del súper!",
      delete_confirm_message: "¿Seguro que quieres borrar toda la lista?",
      create_task_title: "Apunta algo nuevo",
      empty_tasks: "NI UNA COSITA TODAVÍA 👀",
      delete_on_complete_label: "Borrar al agarrar",
      create_task: "¡ECHAR AL CARRITO! 🛒",
      delete_item: "ELIMINAR ARTICULO",
      share_list_aria: "Compartir mi súper lista",
      shopping_list: "Súper Lista 🛍️",
      edit_task_title: "Editar producto",
      no_pending_items: "No tienes nada pendiente para compartir",
      list_copied: "¡Lista copiada, compártela ya! 📋✨",
      save: "Guardar",
      delete: "Eliminar",
      cancel: "Cancelar",
      edit_item: "Editar producto",
      popular_items: "Productos Populares",
      show_more: "Ver más",
      welcome_title: "¡Bienvenid@ a ShopList! 🎉",
      welcome_message:
        "Aquí podrás armar tu lista del súper fácil y rápido. ¡Nos alegra verte por aquí!",
      get_started: "¡Vamos allá! 🚀",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: true,
    resources,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
