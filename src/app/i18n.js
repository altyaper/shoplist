import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  'en-US': {
    translation: {
      task_label: 'Task',
      add_task: 'Add new Task',
      tasks_title: 'Tasks',
      completed_task: 'Completed!',
      delete_confirm_message: 'Are you sure you want to delete all the tasks?',
      create_task_title: 'Create new task',
      empty_tasks: 'NO TASKS YET',
      delete_on_complete_label: 'Delete on complete',
    }
  },
  'es-MX': {
    translation: {
      task_label: 'Tarea',
      add_task: 'Agregar nueva tarea',
      tasks_title: 'Tareas',
      completed_task: 'Completada!',
      delete_confirm_message: 'Estas seguro que quieres eliminar todas las tareas?',
      create_task_title: 'Crear nueva tarea',
      empty_tasks: 'NO HAY TAREAS',
      delete_on_complete_label: 'Eliminar al completar',
    }
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug: true,
    resources,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;