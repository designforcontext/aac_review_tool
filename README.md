# AAC Review Tool

This project was developed between 2016 and 2017 as part of the American Art Collaborative, and was used to review data mappings exposed via SPARQL endpoints against a target model, developed collaboratively by David Newbury, Rob Sanderson, Vladimir Alexiev, Duane Degler, and others in the AAC project.  Many of these mappings went on to become the basis of the http://linked.art project.

This also contains records of discussions that went on throughout the project, for review by the team designing the target model, as well as those implementing the mappings and providing the source data.

This project also provided a first pass at developing some of the software that was used in the AAC Browse App.  Some of the decisions in this project are not best practices--but it informed the decisions that we continue to build tools with.

This project is open-sourced as a reference for future projects, not as an ongoing concern.  The Linked.art model has continued to evolve beyond this initial draft, and future iterations of this project should be built using the SHeX or Shacl validation models, not the custom queries used by this project.  In addition, much of the discussion has been superceded as we learn more about what is and isn't possible within a collaborative linked data environment.

## How it Works

The review tool is designed to help museum domain experts and semantic modelers work together by providing a shared place to discuss modeling.  It does this by providing a visual interface for reviewing both the conceptual modeling and specific implementations of that modeling work in RDF.

Specifically, it maps concepts from [CDWA](http://www.getty.edu/research/publications/electronic_publications/cdwa/) into specific graph shapes implemented in [CIDOC-CRM](http://www.cidoc-crm.org).  For each of the threee core entity types (Objects, Actors, and Events), a list of CDWA concepts has been mapped to a specific SPARQL query, that can be used to generate visualizations, exampe queries, and be executed against an external SPARQL endpoint to see whether a given entity implements that pattern.

Each concept is expressed using a single YAML file, kept in thethe `/data/fields` directory.  THese yaml files express both presentational data (such as a description and a sort order), validation rules (such as cardnality), and four SPARQL concepts:

* a set of `values`, which are the free variables that would need to be replaced to execute this query.
* a `select` clause, which describes the 'important' variables that would be returned by executing the query.  These don't represent all the values that might be set by the query, but would typically be the ones that would have to be mapped, as opposed to structural values that help disambiguate or provide semantics to the graph shape
* a `construct` clause, which describes the shape of the returned subgraph.  This represents the mapping of the proposed graph shape that contains all of the variables in the `select` clause.
* a `where` clause, which is often similar or identical to the `construct` shape, but may indicate other patterns that could contain the data, or what parts of the query are optional and which are required.

Using this set of SPARQL constructs, you can construct queries that, when executed against a SPARQL endpoint, either return values (to fill out a table) or a RDF document (to display as TTL).  You can also use the CONSTRUCT shape to generate visualizations of the graph shape.

## Technical Details

This project is built on top of React (on the front end) and Sinatra (on the back end).  It also includes a version of Vladimir Alexiev's [RDFPuml](https://github.com/duraspace/pcdm/wiki/Diagrams-with-rdfpuml) tool to generate the data (which is included as a dependency, not as part of the released code).

The cookbook portion is a basic markdown-to-html part, and doesn't need much elaboration.

The review tool itself is written in React, and is pretty simple.  No routing (beyond the explicitly set `ENTITY_TYPE`, included inline in each view).  It's probably useful to know that the list of available SPARQL endpoints is hardcoded into `/site/react/index.jsx` as the `SEARCH_DATA` constant.

The Sinatra portion of the review tool has several backend queries:

* `/search` executes a SPARQL search against a provided endpoint and returns a JSON object with the results of both a `select` query and a `construct` query as well as the queries themselves.
* `/full_graph` returns the results of running EVERY query for a given type and merging their results.  _(This functionality was experimental, the results sub-par, and it performed terribly.  For the Browse app, this was done with a single query, and future versions might construct a UNION of the queries somehow that does a better job of this.  Composing subgraphs into efficient    queries is an interesting research topic.)_
* `/graph` returns an SVG representation of the RDF shape.  _(The code to do this is...objectively pretty terrible.  It writes a munged version of the RDF data to a tempfile, runs that tempfile through a perl script to return a PUML object, base64 encodes that data, and then calls out to an externally-hosted service to convert that into an SVG.  The SVG is then written to disk, which is cached and returned on subsequent calls.  This is not a very good solution.)_

Finally, there was an initial attempt to try and do some clever things with blank nodes and `owl:sameAs` in the code to try and produce a hierarchial Turtle representation that was semantically identical to, but more legible than, the default graph representation.  This turned out to be a terrible custom implementation of JSON-LD, written in turtle, without any of the benefits.  Please, learn from my mistakes, and don't do that.  The code still exists as a warning to future implementers.


## Installing the Project

The project assumes that you have a working installation of both NPM and Ruby on your system.  It has been devloped on a Mac, and works on at least two different computers, but that's not a strong guarantee of cross-compatibility.

You can install the dependencies using:

```
gem install foreman bundler
bundle install
npm install
```

## Running the Project

The various bits of code needed to run the project are packaged up within a `Procfile`, which can be used both on Heroku (where this project was hosted) and locally, using the [Foreman](https://github.com/ddollar/foreman) tool.  If that tool is installed locally (which if would be if you followed the above instructions), you can run the project with

```
foreman start
```

which will start up both the React compilation via Webpack, the Sinatra server, and the SASS watcher for stylesheet compilation.

*(Note that this is not at all a production-ready system.  There are kludgy bits throughout.)*