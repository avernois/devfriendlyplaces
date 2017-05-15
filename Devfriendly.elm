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


type alias TownSlug =
    String


type alias Town =
    { name : String
    , latitude : Float
    , longitude : Float
    , defaultZoom : Int
    }


type alias Place =
    { name : String
    , latitude : Float
    , longitude : Float
    }



-- UPDATE


type Msg
    = TownSelected String
    | GetTowns (Result Http.Error (List Town))
    | GetPlaces (Result Http.Error (List Place))
    | UrlChange Navigation.Location


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UrlChange location ->
            ( model, Cmd.none )

        TownSelected townName ->
            let
                townSlug =
                    (slugifyTownName townName)

                selectedTown =
                    model.towns
                        |> List.filter (\t -> (slugifyTownName t.name) == townSlug)
                        |> List.head
            in
                case selectedTown of
                    Just town ->
                        let
                            placesUrl =
                                placesUrlFor townSlug

                            townUrl =
                                "#" ++ (slugifyTownName town.name)
                        in
                            ( { model | selectedTown = (slugifyTownName town.name) }
                            , Cmd.batch
                                (case List.member town.name model.visitedTowns of
                                    True ->
                                        [ moveMap town, Navigation.newUrl townUrl ]

                                    False ->
                                        [ moveMap town, loadPlaces placesUrl, Navigation.newUrl townUrl ]
                                )
                            )

                    Nothing ->
                        ( model, Cmd.none )

        GetTowns (Ok towns) ->
            let
                defaultTown =
                    towns
                        |> List.filter (\t -> (slugifyTownName t.name) == model.selectedTown)
                        |> List.head
            in
                case defaultTown of
                    Just town ->
                        let
                            placesUrl =
                                placesUrlFor town.name
                        in
                            ( { model | towns = towns }
                            , Cmd.batch [ moveMap town, loadPlaces placesUrl ]
                            )

                    Nothing ->
                        ( { model | towns = towns }, Cmd.none )

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
                    | places = List.append model.places places
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
        select [ id "towns", onChange TownSelected ] townsOption


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



-- MAIN


defaultTown : TownSlug
defaultTown =
    "montpellier"


baseUrl : String
baseUrl =
    "http://localhost:8000/locations/"


slugifyTownName : String -> String
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


placesUrlFor : String -> String
placesUrlFor townSlug =
    baseUrl ++ townSlug ++ ".json"


townsUrl : String
townsUrl =
    "http://localhost:8000/locations/locations.json"


main : Program Never Model Msg
main =
    let
        initialTown location =
            case (String.dropLeft 1 location.hash) of
                "" ->
                    defaultTown

                hash ->
                    hash

        initialModel location =
            ( { towns = [], places = [], selectedTown = initialTown location, visitedTowns = [] }
            , Cmd.batch [ loadPlaces (placesUrlFor (initialTown location)), loadTowns townsUrl ]
            )
    in
        Navigation.program UrlChange
            { init = initialModel
            , view = view
            , update = update
            , subscriptions = \_ -> Sub.none
            }
