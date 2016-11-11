
# Need to think about actual editions?
Edition:
  MMO p46i forms part of E19
    E19 rdfs:label "edition of about 30"

# Dimensions schema shortcut?
Dimensions
  MMO schema:height [ E54 p90_ ; p91_]
  MMO schema:width []

# Not modeled language yet
MMO rdfs:label "Sestiere..." ;
  p102_has_title E35 ;
    p72 has language E56   ### lingvoj
      E56 rdfs:label "English"  ### if it was


# Dimension Parts are not modeled yet
MMO p46 is composed of E18    
  p2 has type [  ] ;
  rdfs:label "sheet"
  has dimension 
    p2 has type aat:width
    has value 17.7
    has unit cm
  has dimension
    p2 has type aat:height
    has value 23
    has unit cm
  has material aat:paper


# Place excavated/collected
  MMO p24i changed ownership through E8 ;
      p7 took place at geonames:...



---

DisplayName:
Person a E39 Actor
  rdfs:label "Laurie Anderson" ;
    p1 identified by [
      a E41 Appellation 
      p2 aat:300404670
      rdfs:value "Laurie Anderson"
      p139 has alternative form <alpha-sort-uri>
      p106 is composed of [
        a E41 Appellation ;
        p2 aat:300404651 # given name
        rdfs:value "Laurie"
      ], [
        a E41 Appellation ;
        p2 aat:300404652 # family name
        rdfs:value "Anderson"
      ], [
        // and other name parts per mapping
      ]
    ]

middle name: 300404654
prefix / name title:  300404845
suffix:  300404662

AlphaSort:
Person a E39 Actor 
  p1 identified by [
    a E41 Appellation 
    p2 type:  aat:300404672  # inverted term
    rdfs:value "Anderson, Laurie"


Nationality:
Person a E39
  p107i is current or former memer of [
    a E74 Group ;
    rdfs:label "American" ;
    p2 has type aat:300379842 # nationality
  ]


Biography:

Person a E39 
  p129i is subject of [
    a E33 ;
    p2 has type aat:300080102 ;
    rdfs:value "..."
  ]




Former Attribution:

??????

All the rest:
  



Plus shortcuts:

  dc:description "..." ;
  schema:familyName "Anderson" ;
  schema:givenName "Laurie" ;
  skos:exactMatch ulan:500070794 
  schema:birthDate ...
    ...





Exhibitions
{
"ExhibitionID":942,
"ExhTitle":"Modernist Art: Prints, Drawings, and Photographs",
"DisplayDate":"September 9, 2006 - January 14, 2007",
"BeginISODate":"2006-09-09",
"EndISODate":"2007-01-14",
"InHouse":0,
"Traveling":0,
"OnlineHistory":1,
"PrincetonPublic":0,
"ExhDepartment":"Exhibitions",
"PrimaryImageID":85058,
"ExhCitation":"Modernist Art: Prints, Drawings, and Photographs: Princeton University Art Museum (9 September 2006 — 14 January 2007)",
"SponsorCreditLine":null
},