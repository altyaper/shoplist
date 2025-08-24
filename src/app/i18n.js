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
    },
  },
  "es-MX": {
    translation: {
      task_label: "Artículo",
      add_task: "Agregar nuevo artículo",
      tasks_title: "Lista de compras",
      completed_task: "¡Agarrado!",
      delete_confirm_message:
        "¿Estás seguro que quieres eliminar todos los artículos?",
      create_task_title: "Agregar nuevo artículo",
      empty_tasks: "NO HAY ARTÍCULOS",
      delete_on_complete_label: "Eliminar al agarrar",
      create_task: "AGREGAR ARTÍCULO",
      delete_item: "ELIMINAR ARTICULO",
      share_list_aria: "Compartir lista de compras",
      shopping_list: "Lista de Compras",
      no_pending_items: "No hay artículos pendientes para compartir",
      list_copied: "¡Lista copiada al portapapeles!",
      save: "Guardar",
      delete: "Eliminar",
      cancel: "Cancelar",
      edit_item: "Editar articulo",
      popular_items: "Artículos Populares",
      show_more: "Mostrar Más",
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
