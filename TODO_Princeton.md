
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


# Place excavated/collected
  MMO p24i changed ownership through E8 ;
      p7 took place at geonames:...



---

## ################## DONE ####################### ##

ObjectID:    
    MMO p1_is_identified_by E42 ;
        E42 p2_has_type aat:300404621 ; # repository numbers
        E42 rdf:value 3920 ;
        E42 rdfs:label "3920" .

ObjectNumber: 
  MMO p1_is_identified_by E42 ; 
    E42 p2_has_type aat:300312355 # accession numbers
    E42 p2  aat:300404670 # preferred terms;
    E42 rdf:value "x1944-203" ;
    E42 rdfs:label "x1944-203" .


Dated, DateBegin, DateEnd:
  MMO p108i E12
    E12 P4_has_time-span E52
      E52 rdfs:label 
      E52 p82b 

CreditLine
  MMO p67i is referred to by E33 ;
    p2 has_type aat:300026687 ;
    E33 rdfs:value "..."

Cat Rais
  MMO 67i E73 ;
    p2 has type aat:300026061 ;   # catalogues raisonnes
    rdfs:label "Zigrosser 61" .


Medium
  MMO p67i is referred to by E33 Linguistic Object
    p2 has type aat:300264237 ;
    E33 rdfs:value "charcoal and bla bla" ;

  MMO has_material [ charcoal], [graphite]
  MMO has_part [visual support ; has_material [paper]]


## Concept 
MMO p128 carries [ a E73 Info Obj ; p129 is about Type(subject) ]
  (with shortcut of dcterms:subject)


## Classification
MMO p41 [
  a E17
  p21 aat:300179869  # visual works
  p42 assigned aat:yyy
]
With shortcut  MMO p2 aat:yyy

## Style

MMO p41 [
  a E17 TypeAssignment ;
  p21 had general purpose  aat:300015646 ;   # styles and periods 
  P42 assigned aat:xxx ]
With shortcut:  MMO schema:genre aat:300107963


Media

MMO p138i has representation <image uri> .
  <image uri>  (rights and description etc as needed)

---

Place made

  MMO p108i E12
    E12 p7 took place at geonames:...



If no Geonames:
  E53 Place
     rdfs:label "label constructed from properties here"
      p87 is identified by E47 ;
         p2 aat:300387565  # latitude
         rdfs:value "..."" 
      p87 is identified by E47 ;
         p2 aat:300387567 # longitude
         rdfs:value "..."

(with shortcuts of schema:lat and schema:long)


# Need to think about linking departments to organizations?
Department
  MMO forms part of E19
    E19 has former or current keeper E74 Group ;
      E74 rdfs:label "Prints and Drawings" ;
      p107i is current or former member of E40 Legal Body;
        E40 rdfs:label "PUAM" .
---

Constituent Id:
Person a E39 Actor
  p1 identified by [
    a E42 Identifier ;
    p2 has type aat:300404621 ;
    rdfs:value 100
  ]

  Dates

Person a E39 
  p92i was brought into existence by [
    a E63 Beginning of Existence ;
    p4 has time-span [
      a E52
      rdfs:label "DisplayDate"
      p82a ...
      p82b ...
    ]
  ]

// might also have p7 took place at for where the person was born

Code:

Person a E39
  skos:exactMatch ulan:...

Constituent Cross References

Role:

Depicted:  
MMO p62 depicts Actor


MMO p108i E12
  p32 used general technique aat:...  # unless "artist" where no technique is inferred
  p14 carried out by <actor>  

  # if there are multiple:
  p consists of 
    E12 
      p32 used general technique aat:silversmithing
      p14 carried by <silversmith>
    E12 
      p32 used general technique aat:veneering
      p14 carried out by <veneerer>



Nationality:
Person a E39
  p107i is current or former memer of [
    a E74 Group ;
    rdfs:label "American" ;
    p2 has type aat:300379842 # nationality
  ]


skos:exactMatch ulan:500070794 

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
m





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