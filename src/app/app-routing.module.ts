import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { AuthGuardService } from './auth-guard.service';
import { canDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }
    ]
  },
  {
    path: 'servers', canActivateChild: [AuthGuardService], component: ServersComponent, children: [
      { path: ':id', component: ServerComponent, resolve: { selectedServer: ServerResolver } },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [canDeactivateGuard] }
    ]
  },
  //{ path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
  { path: '**', redirectTo: "/not-found" }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
    /* Usado para servidores/clientes mais antigos, 
    onde não tem a configuração de retornar o index.html em caso de um 404 (rota nao encontrada (no backend)). */
    // RouterModule.forRoot(routes, {useHash: true}) 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
