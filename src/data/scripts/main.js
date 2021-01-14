import { QUE_THEME_SWITCH } from './events-types';

// Managers
import { WindowThemesManager } from './theme-loader';
import { PageManager } from './page-manager';
import { ImageHandler } from './image-handler';

window.addEventListener(QUE_THEME_SWITCH, e => {
    WindowThemesManager.load(WindowThemesManager.current === 'darked' ? 'default' : 'darked');
});

export { WindowThemesManager as Theming, PageManager, ImageHandler };