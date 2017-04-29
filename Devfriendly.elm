module Devfriendly exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)


type Msg
    = TownSelected


type alias Model =
    { towns : List String }


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
        TownSelected ->
            ( Debug.log "" model, Cmd.none )


view : Model -> Html Msg
view model =
    ul [ id "towns" ]
        [ li [ onClick TownSelected ] [ text "Montpellier" ]
        , li [ onClick TownSelected ] [ text "Toulouse" ]
        , li [ onClick TownSelected ] [ text "Paris" ]
        , li [ onClick TownSelected ] [ text "Warsaw" ]
        ]


main : Program Never Model Msg
main =
    Html.program
        { init = ( towns, Cmd.none )
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
