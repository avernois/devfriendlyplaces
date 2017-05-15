port module Devfriendly exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as Decode exposing (Decoder, field, list)
import Http
import Navigation


-- PORTS


port moveMap : Town -> Cmd msg


port addPlaces : List Place -> Cmd msg



-- MODEL


type alias Model =
    { towns : List Town
    , places : List Place
    , selectedTown : TownSlug
    , visitedTowns : List TownSlug
    }


type alias Place =
    { name : String
    , latitude : Float
    , longitude : Float
    }



-- UPDATE


type Msg
    = TownOnChange String
    | GetTowns (Result Http.Error (List Town))
    | GetPlaces (Result Http.Error (List Place))
    | UrlChange Navigation.Location


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UrlChange location ->
            let
                townSlug =
                    urlToTownSlug location

                town =
                    findTown townSlug model.towns
            in
                case town of
                    Just town ->
                        ( { model | selectedTown = townSlug }
                        , Cmd.batch (cmdsDisplayTown town model.visitedTowns)
                        )

                    Nothing ->
                        let
                            _ =
                                Debug.log "Not a town" townSlug
                        in
                            ( model, Cmd.none )

        TownOnChange townName ->
            let
                hash =
                    "#" ++ slugifyTownName townName
            in
                ( model, Navigation.newUrl hash )

        GetTowns (Ok towns) ->
            let
                hash =
                    "#" ++ model.selectedTown
            in
                ( { model | towns = towns }, Navigation.newUrl hash )

        GetTowns (Err error) ->
            let
                _ =
                    Debug.log "Get Towns Failed" error
            in
                ( { model | towns = [] }, Cmd.none )

        GetPlaces (Ok places) ->
            let
                visitedTowns =
                    let
                        isVisited =
                            List.member model.selectedTown model.visitedTowns
                    in
                        case isVisited of
                            True ->
                                model.visitedTowns

                            False ->
                                [ model.selectedTown ] ++ model.visitedTowns
            in
                ( { model
                    | places = places ++ model.places
                    , visitedTowns = visitedTowns
                  }
                , addPlaces places
                )

        GetPlaces (Err error) ->
            let
                _ =
                    Debug.log "Get Towns Failed" error
            in
                ( { model | places = [] }, Cmd.none )



-- VIEW


onChange : (String -> msg) -> Html.Attribute msg
onChange tagger =
    on "change" (Decode.map tagger Html.Events.targetValue)


viewMenu : Model -> Html Msg
viewMenu model =
    let
        townsOption =
            List.map
                (\town ->
                    option
                        [ selected (model.selectedTown == (slugifyTownName town.name)) ]
                        [ text town.name ]
                )
                (List.sortBy .name model.towns)
    in
        select [ id "towns", onChange TownOnChange ] townsOption


view : Model -> Html Msg
view model =
    viewMenu model



-- Commands


loadTowns : String -> Cmd Msg
loadTowns url =
    Decode.list townDecoder
        |> Http.get url
        |> Http.send GetTowns


loadPlaces : String -> Cmd Msg
loadPlaces url =
    Decode.list placeDecoder
        |> Http.get url
        |> Http.send GetPlaces


cmdsDisplayTown : Town -> List TownSlug -> List (Cmd Msg)
cmdsDisplayTown town visitedTowns =
    let
        townSlug =
            slugifyTownName town.name

        isVisited =
            List.member townSlug visitedTowns
    in
        case isVisited of
            False ->
                [ moveMap town, loadPlaces (placesUrlFor townSlug) ]

            True ->
                [ moveMap town ]



-- Decoder


townDecoder : Decoder Town
townDecoder =
    Decode.map4 Town
        (field "name" Decode.string)
        (field "lat" Decode.float)
        (field "lon" Decode.float)
        (field "defaultZoom" Decode.int)


placeDecoder : Decoder Place
placeDecoder =
    Decode.map3 Place
        (field "name" Decode.string)
        (field "lat" Decode.float)
        (field "lon" Decode.float)


placesDecode : String -> List Place
placesDecode jsonPlaces =
    let
        result =
            Decode.decodeString (Decode.list placeDecoder) jsonPlaces
    in
        case result of
            Ok places ->
                places

            Err error ->
                []



-- Towns


type alias TownSlug =
    String


type alias Town =
    { name : String
    , latitude : Float
    , longitude : Float
    , defaultZoom : Int
    }


slugifyTownName : String -> TownSlug
slugifyTownName town =
    town
        |> String.toLower
        |> String.map
            (\c ->
                case c of
                    ' ' ->
                        '-'

                    'é' ->
                        'e'

                    'è' ->
                        'e'

                    'à' ->
                        'a'

                    _ ->
                        c
            )


urlToTownSlug : Navigation.Location -> TownSlug
urlToTownSlug location =
    case location.hash of
        "" ->
            defaultTown

        hash ->
            String.dropLeft 1 hash


findTown : TownSlug -> List Town -> Maybe Town
findTown townSlug towns =
    towns
        |> List.filter (\t -> (slugifyTownName t.name) == townSlug)
        |> List.head



-- MAIN


defaultTown : TownSlug
defaultTown =
    "toulouse"


townsUrl : String
townsUrl =
    "http://localhost:8000/locations/locations.json"


baseUrl : String
baseUrl =
    "http://localhost:8000/locations/"


placesUrlFor : TownSlug -> String
placesUrlFor townSlug =
    baseUrl ++ townSlug ++ ".json"


main : Program Never Model Msg
main =
    let
        initialModel location =
            let
                townSlug =
                    urlToTownSlug location
            in
                ( { towns = []
                  , places = []
                  , selectedTown = townSlug
                  , visitedTowns = []
                  }
                , Cmd.batch [ loadTowns townsUrl ]
                )
    in
        Navigation.program UrlChange
            { init = initialModel
            , view = view
            , update = update
            , subscriptions = \_ -> Sub.none
            }
