import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { UpdateWorkerService } from 'buglens';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .then(appRef => {
    const updateWorker = appRef.injector.get(UpdateWorkerService);

    // Ensure your custom worker is registered & updated
    updateWorker.checkForUpdate();
  })
  .catch(err => console.error(err));
