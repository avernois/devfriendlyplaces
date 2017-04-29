port module Devfriendly exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)


type Msg
    = TownSelected Town


type alias Model =
    { towns : List Town }


type alias Town =
    String


towns : Model
towns =
    { towns =
        [ "Toulouse"
        , "Montpellier"
        , "Warswaw"
        , "Barcelona"
        ]
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        TownSelected town ->
            ( model, consoleJs town )


viewTowns : List Town -> Html Msg
viewTowns towns =
    let
        townsLi =
            List.map (\town -> li [ onClick (TownSelected town) ] [ text town ]) towns
    in
        ul [ id "towns" ] townsLi


view : Model -> Html Msg
view model =
    viewTowns model.towns


port consoleJs : Town -> Cmd msg


main : Program Never Model Msg
main =
    Html.program
        { init = ( towns, consoleJs "" )
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
