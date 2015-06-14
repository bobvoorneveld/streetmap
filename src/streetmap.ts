import {ComponentAnnotation as Component, ViewAnnotation as View} from 'angular2/angular2';

import {Map} from './map';

@Component({
    selector: 'streetmap'
})

@View({
    templateUrl: 'streetmap.html'
})

export class Streetmap {

    constructor() {
        this.pins = [
            {id: 1, lat: 53.0641389, long: 6.6511138999999995, name: 'Testing pin'},
            {id: 2, lat: 53.1641389, long: 6.7511138999997995, name: 'Testing pin2'}
        ];
        var self = this;
        self.map = new Map('map');
        self.pins.forEach(pin => {
            self.map.addPin(pin);
        });

        self.looping();
    }

    looping() {
        var self = this;
        setInterval(function() {
            self.pins.forEach(pin => {
                pin.lat += 0.1;
                pin.long += 0.1;
                self.map.updatePin(pin);
            })
        }, 2000);
    }
}
