port module Devfriendly exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Json.Decode as Decode exposing (Decoder, field, list)
import Http


-- PORTS


port moveMap : ( Town, List Place ) -> Cmd msg



-- MODEL


type alias Model =
    { towns : List Town
    , places : List Place
    }


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
    = TownSelected Town
    | GetTowns (Result Http.Error (List Town))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        TownSelected town ->
            ( model, moveMap ( town, model.places ) )

        GetTowns (Ok towns) ->
            ( { model | towns = towns }, Cmd.none )

        GetTowns (Err error) ->
            let
                _ =
                    Debug.log "Get Towns Failed" error
            in
                ( { model | towns = [] }, Cmd.none )



-- VIEW


viewTowns : List Town -> Html Msg
viewTowns towns =
    let
        townsLi =
            List.map (\town -> li [ onClick (TownSelected town) ] [ text town.name ]) towns
    in
        ul [ id "towns" ] townsLi


view : Model -> Html Msg
view model =
    viewTowns model.towns



-- Commands


loadTowns : String -> Cmd Msg
loadTowns url =
    Decode.list townDecoder
        |> Http.get townsUrl
        |> Http.send GetTowns



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


townsUrl : String
townsUrl =
    "http://localhost:8000/towns.json"


main : Program Never Model Msg
main =
    let
        initialModel =
            { towns = [], places = placesDecode jsonPlaces }
    in
        Html.program
            { init = ( initialModel, loadTowns townsUrl )
            , view = view
            , update = update
            , subscriptions = \_ -> Sub.none
            }


jsonPlaces : String
jsonPlaces =
    """
[
    {
        "name": "Café Contretemps",
        "lat": 43.600479,
        "lon": 1.442523
    },
    {
        "name": "Le Café Cerise",
        "lat": 43.600071,
        "lon": 1.440335
    },
    {
        "name": "La fabrique",
        "lat": 43.607378,
        "lon": 1.4399286
    },
    {
        "name": "Brasserie Père Léon",
        "lat": 43.600474,
        "lon": 1.443858999999975
    },
    {
        "name": "The George and Dragon",
        "lat": 43.607414,
        "lon": 1.4396000000000413
    },
    {
        "name": "L'impro",
        "lat": 43.602984,
        "lon": 1.4416109999999662
    },
    {
        "name": "Les coudes sur la table",
        "lat": 43.607103,
        "lon": 1.439847
    },
    {
        "name": "Le Cyrano",
        "lat": 43.6039657,
        "lon": 1.4472385
    },
    {
        "name": "Ombres blanches",
        "lat": 43.603361,
        "lon": 1.442201
    }
]
"""
