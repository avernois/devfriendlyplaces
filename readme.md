Dev friendly places
===================
A collection of nice places where developers can work fine and some useful informations about these places (wifi ? power ? ...) on the map of a location.

Current locations
-----------------
 - Toulouse: [toulouse.devfriendlyplaces.net][toulouse]
 - Toulon: [toulon.devfriendlyplaces.net][toulon]
 - Bordeaux: [bordeaux.devfriendlyplaces.net][bordeaux]
 - Lille: [lille.devfriendlyplaces.net][lille]
 - Lyon: [lyon.devfriendlyplaces.net][lyon]
 - Cumbria: [cumbria.devfriendlyplaces.net][cumbria]
 - Paris: [paris.devfriendlyplaces.net][paris]
 - London: [london.devfriendlyplaces.net][london]
 - Côte Basque [cote-basque.devfriendlyplaces.net][cote-basque]

Contribute
----------
### Add places to an existing location
That is easy, just edit the json file `places/yourlocation.json` and submit a pull request (where `yourlocation` is the name of your location).

### Add your location
Add a file in the `places` directory called `yourlocation.json` and add place informations.

location.json example, to adjust to your needs:

```json

{ "location":
  {
    "name": "mylocationname",
    "lat" : 64.138171,
    "lon" : -21.928711,
    "defaultZoom": "10"
  },
  "places": [
    {
      "name": "Coworking Reykjavik",
      "openHours": "24/7",
      "lat": 64.157015,
      "lon": -21.941714,
      "address": "Fiskislóð 101 Reykjavík",
      "type" : "coworking",
      "power": {"available": true},
      "wifi": {"available": true},
      "url": "http://www.reykjavikcoworking.is/"
    },
    {
      "name": "Another stuff... etc.",
      "openHours": "8:00 - 18:00"
    }
  ]
}

```

please note that the ``places`` is a list, append as many places as you want.


Once your pull request is merged and deployed, your map will be accessible at http://yourlocation.devfriendlyplaces.net.


### Improve code / add feature
Open issue, fork, commit and pull request. But you already know that :)

[toulouse]: http://toulouse.devfriendlyplaces.net
[toulon]: http://toulon.devfriendlyplaces.net
[bordeaux]: http://bordeaux.devfriendlyplaces.net
[lille]: http://lille.devfriendlyplaces.net
[lyon]: http://lyon.devfriendlyplaces.net
[cumbria]: http://cumbria.devfriendlyplaces.net
[paris]: http://paris.devfriendlyplaces.net
[london]: http://london.devfriendlyplaces.net
[cote-basque]: http://cote-basque.devfriendlyplaces.net
