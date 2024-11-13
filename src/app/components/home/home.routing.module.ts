import { DashboardComponent } from '../dashboard/dashboard.component';
import { ChatProducaoComponent } from '../chat-producao/chat-producao.component' ;
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ChatProducaoComponent,
  },
  {
    path: 'home',
    component: DashboardComponent,
  },
  {
    path: '**',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
