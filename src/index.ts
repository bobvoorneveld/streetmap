import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap} from 'angular2/angular2';
import {Streetmap} from 'streetmap';

@Component({
  selector: 'main'
})

@View({
  directives: [Streetmap],
  template: `
    <streetmap></streetmap>
  `
})

class Main {

}

bootstrap(Main);
