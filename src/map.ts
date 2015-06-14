import {getUserLocation, LatLong} from './location'

interface Pin extends LatLong {
    name: string;
    id: number;
}

export class Map {

    constructor (target:string) {
        var self = this;
        this.createMap(target);
        getUserLocation(function (location) {
            self.map.getView().setCenter(
                ol.proj.transform(
                    [location.coords.longitude, location.coords.latitude],
                    'EPSG:4326',
                    'EPSG:3857'
                )
            );
        });
    }

    createMap (target:string) {
        var self = this;

        this.map = new ol.Map({
            target: target,
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.MapQuest({layer: 'osm'})
                }),
                self.createVectorLayer()
            ],
            view: new ol.View({
                center: ol.proj.transform([37.41, 8.82], 'EPSG:4326', 'EPSG:3857'),
                zoom: 6
            })
        });
    }

    createVectorLayer() {
        var self = this;
        self.vectorSource = new ol.source.Vector({});

        var iconStyle = new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                src: 'icon.png'
            }))
        });

        return new ol.layer.Vector({
            source: self.vectorSource,
            style: iconStyle
        });
    }

    addPin (pinInfo:Pin) {
        var self = this;
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([pinInfo.long, pinInfo.lat], 'EPSG:4326',
                'EPSG:3857')),
            name: pinInfo.name,
        });
        iconFeature.setId(pinInfo.id);

        self.vectorSource.addFeature(iconFeature);
    }

    updatePin (pinToUpdate:Pin) {
        var self = this;
        var pinFeature = self.vectorSource.getFeatureById(pinToUpdate.id);
        pinFeature.setGeometry(new ol.geom.Point(ol.proj.transform([pinToUpdate.long, pinToUpdate.lat], 'EPSG:4326',
                'EPSG:3857')))
    }
}
