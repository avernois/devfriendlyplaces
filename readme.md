Dev friendly places
===================
A collection of nice places where developers can work fine and some useful informations about these places (wifi ? power ? ...) on the map of a location.

Current locations
-----------------
 - Albi [albi.devfriendlyplaces.net][albi]
 - Amsterdam [amsterdam.devfriendlyplaces.net][amsterdam]
 - Berlin: [berlin.devfriendlyplaces.net][berlin]
 - Bordeaux: [bordeaux.devfriendlyplaces.net][bordeaux]
 - Côte Basque [cote-basque.devfriendlyplaces.net][cote-basque]
 - Cumbria: [cumbria.devfriendlyplaces.net][cumbria]
 - Lille: [lille.devfriendlyplaces.net][lille]
 - London: [london.devfriendlyplaces.net][london]
 - Lyon: [lyon.devfriendlyplaces.net][lyon]
 - Marseille [marseille.devfriendlyplaces.net][marseille]
 - Montauban [montauban.devfriendlyplaces.net][montauban]
 - Montpellier [montpellier.devfriendlyplaces.net][montpellier]
 - Paris: [paris.devfriendlyplaces.net][paris]
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
      "url": "http://www.reykjavikcoworking.is/"
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

[toulouse]: http://toulouse.devfriendlyplaces.net
[toulon]: http://toulon.devfriendlyplaces.net
[berlin]: http://berlin.devfriendlyplaces.net
[bordeaux]: http://bordeaux.devfriendlyplaces.net
[lille]: http://lille.devfriendlyplaces.net
[lyon]: http://lyon.devfriendlyplaces.net
[cumbria]: http://cumbria.devfriendlyplaces.net
[paris]: http://paris.devfriendlyplaces.net
[london]: http://london.devfriendlyplaces.net
[cote-basque]: http://cote-basque.devfriendlyplaces.net
[amsterdam]: http://amsterdam.devfriendlyplaces.net
[albi]: http://albi.devfriendlyplaces.net
[marseille]: http://marseille.devfriendlyplaces.net
[montauban]: http://montauban.devfriendlyplaces.net
[montpellier]: http://montpellier.devfriendlyplaces.net
