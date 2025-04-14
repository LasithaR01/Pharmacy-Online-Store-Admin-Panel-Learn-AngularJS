import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './list/list.component';
// import { KanbanboardComponent } from './kanbanboard/kanbanboard.component';
// import { CreatetaskComponent } from './createtask/createtask.component';

const routes: Routes = [
    {
        path: 'list',
        component: ProductListComponent
    },
    // {
    //     path: 'kanban',
    //     component: KanbanboardComponent
    // },
    // {
    //     path: 'create',
    //     component: CreatetaskComponent
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule { }
