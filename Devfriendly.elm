port module Devfriendly exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Json.Decode as Decode exposing (Decoder, field, list)


-- PORTS


port consoleJs : Town -> Cmd msg


port moveMap : Town -> Cmd msg



-- MODEL


type alias Model =
    { towns : List Town }


type alias Town =
    { name : String
    , latitude : Float
    , longitude : Float
    , defaultZoom : Int
    }


towns : Model
towns =
    let
        townsList =
            case jsonToTowns jsonTowns of
                Ok towns ->
                    Debug.log "Ok: " towns

                Err error ->
                    Debug.log ("Error: " ++ error) []
    in
        { towns = townsList }



-- UPDATE


type Msg
    = TownSelected Town


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        TownSelected town ->
            ( model, Cmd.batch [ consoleJs town, moveMap town ] )



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



-- MAIN


main : Program Never Model Msg
main =
    Html.program
        { init = ( towns, consoleJs (Town "" 0 0 0) )
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }


jsonToTowns : String -> Result String (List Town)
jsonToTowns json =
    Decode.decodeString (Decode.list townsDecoder) json



-- Decoder


townsDecoder : Decoder Town
townsDecoder =
    Decode.map4 Town
        (field "name" Decode.string)
        (field "lat" Decode.float)
        (field "lon" Decode.float)
        (field "defaultZoom" Decode.int)



-- data


jsonTowns : String
jsonTowns =
    """
[
    {
        "name": "Amsterdam",
        "lat": 52.3726,
        "lon": 4.9174,
        "defaultZoom": 13
    },
    {
        "name": "Antibes",
        "lat": 43.5822762,
        "lon": 7.069828,
        "defaultZoom": 13
    },
    {
        "name": "Berlin",
        "lat": 52.5169444,
        "lon": 13.4106924,
        "defaultZoom": 13
    }
]
    """
