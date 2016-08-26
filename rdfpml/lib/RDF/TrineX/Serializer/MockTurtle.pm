package RDF::TrineX::Serializer::MockTurtle;

use strict;
use warnings;
use utf8;
use parent 'RDF::TrineX::Serializer::MockTurtleSoup';

BEGIN {
  $RDF::TrineX::Serializer::MockTurtle::AUTHORITY = 'cpan:VALEXIEV';
  $RDF::TrineX::Serializer::MockTurtle::VERSION   = '0.001';
}

sub new {
  my $class = shift;
  my $self = $class->SUPER::new(@_);
  $self->{abbreviate} = qr{.}; # abbreviate all
  bless $self, $class
}

sub serialize_model_to_file
{
  my $self = shift;
  my ($fh, $model) = @_;

  local $self->{model} = $model;
  local $self->{p}     = $self->{prefixes}; ### changed from SUPER
  local $self->{B}     = 0;
  local $self->{b}     = {};

  my $bunches = $self->_divvy_up;
  $self->_sort_bunches($bunches);
  $self->_serialize_bunches($bunches, $fh);
}

1

__END__

=pod

=head1 NAME

RDF::TrineX::Serializer::MockTurtle - Serialize prettified turtle, using brief CURIEs

=head1 SYNOPSIS
This reads <mockturtle.ttl> twice: once to parse the turtle RDF, then to extract the prefixes and base.
Finally it serializes as turtle, preserving the prefixes and base.

 use RDF::Trine;
 use RDF::Prefixes::Curie;
 use RDF::TrineX::Serializer::MockTurtle;

 my $store = RDF::Trine::Store::Memory->new();
 my $model = RDF::Trine::Model->new($store);
 my $parser = RDF::Trine::Parser->new('turtle');
 $parser->parse_file_into_model (undef, "mockturtle.ttl", $model);

 my $prefixes = RDF::Prefixes::Curie->new ("mockturtle.ttl");
 my $ser = RDF::TrineX::Serializer::MockTurtle->new (prefixes=>$prefixes);
 $ser->serialize_model_to_file(\*STDOUT, $model);

Example content in <mockturtle.ttl>:

 @base     <http://museum1.org/>.
 @prefix : <http://museum2.org/>.                     # Another Museum
 @prefix aat:  <http://vocab.getty.edu/aat/>.         # Getty AAT
 @prefix cona: <http://vocab.getty.edu/cona/>.        # Getty CONA
 @prefix crm:  <http://www.cidoc-crm.org/cidoc-crm/>. # CIDOC CRM
 @prefix unit: <http://qudt.org/vocab/unit#>.         # QUDT Unit
 @prefix xsd:  <http://www.w3.org/2001/XMLSchema#>.

 cona:700000166-thing
   crm:P43_has_dimension cona:700000166-dim1.

 cona:700000166-dim1 a crm:E54_Dimension;
   crm:P2_has_type aat:300055645; # length
   crm:P90_has_value "220"^^xsd:double;
   crm:P91_has_unit unit:Meter.

 <obj/123> crm:P130_shows_features_of <http://museum2.org/obj/456>.

=head1 DESCRIPTION

This module prints pretty turtle, using L<RDF::TrineX::Serializer::MockTurtleSoup> (which see).
Instead of L<RDF::Prefixes> (which guesses prefixes from each URL),
this uses L<RDF::Prefixes::Curie> to turn URIs into QNames aggressively.
It uses local names with starting digit (allowed in Turtle 1.1) and slash/hash (not allowed in Turtle).
So it is mostly useful for generating illustrative examples, where shortness is of critical importance.

=head2 Options

The constructor takes the same options as
L<RDF::TrineX::Serializer::MockTurtleSoup> and L<RDF::Trine::Serializer::Turtle>,
with the following exceptions:

  namespaces => RDF::Prefixes::Curie->new("prefixes.ttl")

This is required: there are no fallback prefixes. ("prefixes" can be used as a synonym)

  abbreviate

This is not used, since all URLs are abbreviated maximally

=back

=head2 Methods

Provides the same API as L<RDF::TrineX::Serializer::MockTurtleSoup> and L<RDF::Trine::Serializer>.

=head1 BUGS

Please report any bugs to TODO.

=head1 AUTHOR

Vladimir Alexiev (valexiev) E<lt>vladimir.alexiev@ontotext.comE<gt>.

=head1 COPYRIGHT

Copyright 2015 Vladimir Alexiev

This library is free software; you can redistribute it and/or modify it
under the same terms as Perl itself.

=head1 DISCLAIMER OF WARRANTIES

THIS PACKAGE IS PROVIDED "AS IS" AND WITHOUT ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF
MERCHANTIBILITY AND FITNESS FOR A PARTICULAR PURPOSE.
