import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'student',
        loadChildren: () => import('./student/student.module').then(m => m.StudentAppStudentModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.StudentAppProductModule)
      },
      {
        path: 'user-1',
        loadChildren: () => import('./user-1/user-1.module').then(m => m.StudentAppUser1Module)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class StudentAppEntityModule {}
