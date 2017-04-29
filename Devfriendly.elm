module Devfriendly exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


main : Html msg
main =
    ul [ id "towns" ]
        [ li [] [ text "Montpellier" ]
        , li [] [ text "Toulouse" ]
        , li [] [ text "Paris" ]
        , li [] [ text "Warsaw" ]
        ]
