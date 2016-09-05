# Bugs

# Improvements

* [ ] Make a better homepage
* [ ] Solve the RDFPUML problem
* [ ] Add a Readme
* [ ] Look into getting rid of the odd WHERE UNION (with the new graph)
* [ ] Document the SPARQL
* [ ] Optimize Test Runner for only needed type of query.
* [ ] Update header for FAQ and homepage
* [ ] Make the report.
* [ ] Pre-commit hook for building?

### Data Needed for Objects

* [ ] Add bibliography
* [ ] Add exhibition history
* [ ] Add Provenance
* [ ] Object Rights
* [ ] Culture
* [ ] Add qualifier to dates?
* [ ] Edition?
* [ ] INscription
* [ ] Named Period
* [ ] Keywords?
* [ ] Conservation?

### Data Needed for People

* [ ] Fill this out

### Questions

* [ ] Ask about better graph optimization techniques?

---

* [X] "Warning: Unknown prop `turtle` on <div> tag." on modal display
* [X] Move the Modal into the header
* [X] Improve the hashing, to handle search endpoint
* [X] Abstract away the Objectness (to handle other things)
* [X] Stick this behind a route
* [X] JSON export
* [X] Github Issue Link
* [X] Loading button state for turtle gets
* [X] Move the object ID into the <header></header>


---

Multiple routes

/ index
- / object (same thing, just pass in the route and use that to trigger a filter on the data)
  / full graph - needs to 