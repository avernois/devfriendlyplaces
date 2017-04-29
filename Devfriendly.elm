port module Devfriendly exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)


type Msg
    = TownSelected Town


type alias Model =
    { towns : List Town }


type alias Town =
    { name : String
    , latitude : Float
    , longitude : Float
    }


towns : Model
towns =
    { towns =
        [ Town "Toulouse" 43.607378 1.4399286
        , Town "Montpellier" 43.6100219 3.8741615
        , Town "Warswaw" 52.229676 21.012229
        , Town "Barcelona" 41.3911671 2.1362266
        , Town "Lisle sur Tarn" 43.852799 1.810783
        ]
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        TownSelected town ->
            ( model, Cmd.batch [ consoleJs town, moveMap town ] )


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


port consoleJs : Town -> Cmd msg


port moveMap : Town -> Cmd msg


main : Program Never Model Msg
main =
    Html.program
        { init = ( towns, consoleJs (Town "" 0 0) )
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
