import { NgModule } from '@angular/core';
import { EnvVariables } from './env.token';
import { devVariables } from './dev';
import { prodVariables } from './prod';
import { stagingVariables } from './staging';
// import { qaVariables } from './qa';

declare const process: any; // Typescript compiler will complain without this

export function environmentFactory() {
  if(process.env.NODE_ENV === 'development'){
    return devVariables;
  }
  else if(process.env.NODE_ENV === 'staging'){
    return stagingVariables;
  }
  else if(process.env.NODE_ENV === 'production'){
    return prodVariables;
  }

  return process.env.IONIC_ENV === 'prod' ? prodVariables : devVariables;
}

@NgModule({
  providers: [
    {
      provide: EnvVariables,
      // useFactory instead of useValue so we can easily add more logic as needed.
      useFactory: environmentFactory
    }
  ]
})
export class EnvironmentsModule {}