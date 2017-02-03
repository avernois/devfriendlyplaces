Dev friendly places
===================
A collection of nice places where developers can work fine and some useful informations about these places (wifi ? power ? ...) on the map of a location.

Current locations
-----------------
 - Albi: [albi.devfriendlyplaces.net][albi]
 - Angers: [angers.devfriendlyplaces.net][angers]
 - Amsterdam: [amsterdam.devfriendlyplaces.net][amsterdam]
 - Arles: [arles.devfriendlyplaces.net][arles]
 - Barcelona: [barcelona.devfriendlyplaces.net][barcelona]
 - Berlin: [berlin.devfriendlyplaces.net][berlin]
 - Bordeaux: [bordeaux.devfriendlyplaces.net][bordeaux]
 - Cumbria: [cumbria.devfriendlyplaces.net][cumbria]
 - Dakar: [dakar.devfriendlyplaces.net][dakar]
 - Foix: [foix.devfriendlyplaces.net][foix]
 - Lille: [lille.devfriendlyplaces.net][lille]
 - London: [london.devfriendlyplaces.net][london]
 - Lyon: [lyon.devfriendlyplaces.net][lyon]
 - Marseille: [marseille.devfriendlyplaces.net][marseille]
 - Montpellier: [montpellier.devfriendlyplaces.net][montpellier]
 - Nantes: [nantes.devfriendlyplaces.net][nantes]
 - Oxford: [oxford.devfriendlyplaces.net][oxford]
 - Paris: [paris.devfriendlyplaces.net][paris]
 - Saint-Étienne: [saint-etienne.devfriendlyplaces.net][saint-etienne]
 - Saint-Louis: [saint-louis.devfriendlyplaces.net][saint-louis]
 - Toulon: [toulon.devfriendlyplaces.net][toulon]
 - Toulouse: [toulouse.devfriendlyplaces.net][toulouse]

Contribute
----------
### What kind of place can I add?
Devfriendlyplaces is meant to list places that are not meant for work, but where you could without having to justify yourself or feeling judged or not welcome.
For example coffee shop, library, theater hall, ...
If when thinking to that place you can say yes to the two following questions:

* do I feel comfortable to work here?
* could I go there for reasons not related to work?

then they are nice places to add. Both criteria are mandatory.

### Add places to an existing location
That is easy, just edit the json file `locations/yourlocation.json` and submit a pull request (where `yourlocation` is the name of your location).

### Add a new location
There are two steps:

* add your location information in the `locations/locations.json` file. Look how other locations are defined. All field are mandatory.
* create the new `locations/yourlocation.geojson` file, see the example below.

### Exemple of yourlocation.geojson
``yourlocation.geojson`` example, to adjust to your needs:

```json
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [7.735684, 48.583358]
            },
            "properties": {
                "name": "Graffalgar",
                "openHours": "Monday - Saturday, 07h00 - 00h00, Sunday, 07h00 - 15h00",
                "address":  "17 Rue Déserte",
                "type" : "Hotel & Cafetaria",
                "wifi": {
                    "available": true
                },
                "power": {
                    "available": true
                },
                "url": "http://www.graffalgar-hotel-strasbourg.com/"
            }
        }
    ]
}

```

please note:

* The file is a [geojson](http://geojson.org/geojson-spec.html) standard file.
* The property "name" is mandatory. Add as many details as needed to provide complete information.
* The coordinates are mandatory and order is: longitude, latitude.
* "comment" are optional

Once your pull request is merged and deployed, your map will be accessible at http://yourlocation.devfriendlyplaces.net.


### Improve code / add feature
Open issue, fork, commit and pull request. But you already know that :)

Please, don't improve code/add new feature and add new places/locations in the same pull request.

### Unit testing
We now can run unit tests against devfriendlyplaces code. You can start them by two ways:
* from your favorite browser, open the file test/index.html
* from the console
  * you first need to have a valid yarn installation. Then
    * `yarn nstall`
  * then `yarn test`

[albi]: http://albi.devfriendlyplaces.net
[angers]: http://angers.devfriendlyplaces.net
[amsterdam]: http://amsterdam.devfriendlyplaces.net
[arles]: http://arles.devfriendlyplaces.net
[barcelona]: http://barcelona.devfriendlyplaces.net
[berlin]: http://berlin.devfriendlyplaces.net
[bordeaux]: http://bordeaux.devfriendlyplaces.net
[cote-basque]: http://cote-basque.devfriendlyplaces.net
[cumbria]: http://cumbria.devfriendlyplaces.net
[dakar]: http://dakar.devfriendlyplaces.net
[foix]: http://foix.devfriendlyplaces.net
[lille]: http://lille.devfriendlyplaces.net
[london]: http://london.devfriendlyplaces.net
[lyon]: http://lyon.devfriendlyplaces.net
[marseille]: http://marseille.devfriendlyplaces.net
[montauban]: http://montauban.devfriendlyplaces.net
[montpellier]: http://montpellier.devfriendlyplaces.net
[nantes]: http://nantes.devfriendlyplaces.net
[oxford]: http://oxford.devfriendlyplaces.net
[paris]: http://paris.devfriendlyplaces.net
[pays-cathare]: http://pays-cathare.devfriendlyplaces.net
[saint-etienne]: http://saint-etienne.devfriendlyplaces.net
[saint-louis]: http://saint-louis.devfriendlyplaces.net
[toulouse]: http://toulouse.devfriendlyplaces.net
[toulon]: http://toulon.devfriendlyplaces.net
