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
 - Côte Basque: [cote-basque.devfriendlyplaces.net][cote-basque]
 - Cumbria: [cumbria.devfriendlyplaces.net][cumbria]
 - Dakar: [dakar.devfriendlyplaces.net][dakar]
 - Foix: [foix.devfriendlyplaces.net][foix]
 - Lille: [lille.devfriendlyplaces.net][lille]
 - London: [london.devfriendlyplaces.net][london]
 - Lyon: [lyon.devfriendlyplaces.net][lyon]
 - Marseille: [marseille.devfriendlyplaces.net][marseille]
 - Montauban: [montauban.devfriendlyplaces.net][montauban]
 - Montpellier: [montpellier.devfriendlyplaces.net][montpellier]
 - Nantes: [nantes.devfriendlyplaces.net][nantes]
 - Oxford: [oxford.devfriendlyplaces.net][oxford]
 - Paris: [paris.devfriendlyplaces.net][paris]
 - Pays Cathare: [pays-cathare.devfriendlyplaces.net][pays-cathare]
 - Saint-Louis: [saint-louis.devfriendlyplaces.net][saint-louis]
 - Toulon: [toulon.devfriendlyplaces.net][toulon]
 - Toulouse: [toulouse.devfriendlyplaces.net][toulouse]

Contribute
----------
### Add places to an existing location
That is easy, just edit the json file `locations/yourlocation.json` and submit a pull request (where `yourlocation` is the name of your location).

### Add a new location
There are two steps:

* add your location information in the `locations/locations.json` file. Look how other locations are defined. All field are mandatory.
* create the new `locations/yourlocation.json` file, see the example below.

### Exemple of yourlocation.json
``yourlocation.json`` example, to adjust to your needs:

```json

{ "places": [
    {
      "name": "Coworking Reykjavik",
      "openHours": "24/7",
      "lat": 64.157015,
      "lon": -21.941714,
      "address": "Fiskislóð 101 Reykjavík",
      "type" : "coworking",
      "power": {"available": true, "comment": "look under the table"},
      "wifi": {"available": true, "comment": "ask people around to get the code"},
      "url": "http://www.reykjavikcoworking.is/",
      "comment": "noisy at lunch hours"
    },
    {
      "name": "Another stuff... etc.",
      "lat" : 43.607378,
      "lon" : 1.4399286
    }
  ]
}

```

please note:

* The ``places`` is a list, you can append several places.
* For more readbility, the fields "name", "lat" and "long" are mandatory. Add as many details as needed to provide complete information.
* "comment" are optional

Once your pull request is merged and deployed, your map will be accessible at http://yourlocation.devfriendlyplaces.net.


### Improve code / add feature
Open issue, fork, commit and pull request. But you already know that :)

Please, don't improve code/add new feature and add new places/locations in the same pull request.


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
[saint-louis]: http://saint-louis.devfriendlyplaces.net
[toulouse]: http://toulouse.devfriendlyplaces.net
[toulon]: http://toulon.devfriendlyplaces.net
