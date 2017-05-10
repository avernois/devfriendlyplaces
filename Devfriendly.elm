port module Devfriendly exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Json.Decode as Decode exposing (Decoder, field, list)
import Http


-- PORTS


port moveMap : Town -> Cmd msg


port addPlaces : List Place -> Cmd msg



-- MODEL


type alias Model =
    { towns : List Town
    , places : List Place
    , selectedTown : String
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
    | GetPlaces (Result Http.Error (List Place))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        TownSelected town ->
            case (town.name /= model.selectedTown) of
                True ->
                    let
                        placesUrl =
                            placesUrlFor town.name
                    in
                        ( { model | selectedTown = town.name }, Cmd.batch [ moveMap town, loadPlaces placesUrl ] )

                False ->
                    ( model, Cmd.none )

        GetTowns (Ok towns) ->
            ( { model | towns = towns }, Cmd.none )

        GetTowns (Err error) ->
            let
                _ =
                    Debug.log "Get Towns Failed" error
            in
                ( { model | towns = [] }, Cmd.none )

        GetPlaces (Ok places) ->
            ( { model | places = List.append model.places places }, addPlaces places )

        GetPlaces (Err error) ->
            let
                _ =
                    Debug.log "Get Towns Failed" error
            in
                ( { model | places = [] }, Cmd.none )



-- VIEW


viewTowns : Model -> Html Msg
viewTowns model =
    let
        townsLi =
            List.map (\town -> li [ onClick (TownSelected town), attribute "data-selected-town" (toString (model.selectedTown == town.name)) ] [ text town.name ]) model.towns
    in
        ul [ id "towns" ] townsLi


view : Model -> Html Msg
view model =
    viewTowns model



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


baseUrl : String
baseUrl =
    "http://localhost:8000/locations/"


placesUrlFor : String -> String
placesUrlFor town =
    baseUrl ++ (String.toLower town) ++ ".json"


townsUrl : String
townsUrl =
    "http://localhost:8000/locations/locations.json"


main : Program Never Model Msg
main =
    let
        initialModel =
            { towns = [], places = [], selectedTown = "toulouse" }
    in
        Html.program
            { init = ( initialModel, Cmd.batch [ loadPlaces (placesUrlFor initialModel.selectedTown), loadTowns townsUrl ] )
            , view = view
            , update = update
            , subscriptions = \_ -> Sub.none
            }
