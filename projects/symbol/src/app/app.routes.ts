import type { Routes } from '@angular/router';
import { pageSymbolRoutes } from './pages/page-symbol/page-symbol.routes';

export const routes: Routes = [
  {
    path: '',
    children: pageSymbolRoutes,
  },
];
