// Route
import { ThemesManager } from './modules/theme-loader';
import { PageManager } from './modules/page-manager';
import { ImageHandler } from './modules/image-handler';
import { HookManager } from './modules/hook-manager';

export { ThemesManager, PageManager, ImageHandler, HookManager };

HookManager.registerHooks(ThemesManager, PageManager, ImageHandler);