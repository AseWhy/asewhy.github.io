// Route
import { ThemesManager } from './modules/theme-loader';
import { PageManager } from './modules/page-manager';
import { ImageHandler } from './modules/image-handler';
import { HookManager } from './modules/hook-manager';
import { AdminApi } from './modules/admin-api';

export { ThemesManager, PageManager, ImageHandler, HookManager, AdminApi };

HookManager.registerHooks(ThemesManager, PageManager, ImageHandler, AdminApi);