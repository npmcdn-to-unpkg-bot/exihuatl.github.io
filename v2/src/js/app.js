import GeminiScrollbar from 'gemini-scrollbar';
import menu from './_menu';

window.onload = () => {
  document.querySelector('.preloader').remove();


  const gemini = new GeminiScrollbar({
    element: document.querySelector('.content'),
    autoshow: true,
  });
  gemini.create();

  menu();
};
