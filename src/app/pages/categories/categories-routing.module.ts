import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { CreatecategoryComponent } from './createcategory/createcategory.component';
// import { KanbanboardComponent } from './kanbanboard/kanbanboard.component';
// import { CreatetaskComponent } from './createtask/createtask.component';

const routes: Routes = [
    {
        path: 'list',
        component: ListComponent
    },
    // {
    //     path: 'kanban',
    //     component: KanbanboardComponent
    // },
    {
        path: 'create',
        component: CreatecategoryComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule { }
