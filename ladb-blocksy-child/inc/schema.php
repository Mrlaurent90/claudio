<?php
defined( 'ABSPATH' ) || exit;

add_action( 'wp_head', 'ladb_schema_local_business' );
function ladb_schema_local_business() {
	if ( ! is_front_page() ) {
		return;
	}
	$schema = [
		'@context'        => 'https://schema.org',
		'@type'           => 'LocalBusiness',
		'name'            => 'LADB — Vitrier Serrurier Miroitier Montpellier',
		'url'             => home_url( '/' ),
		'telephone'       => '+33686416925',
		'address'         => [
			'@type'           => 'PostalAddress',
			'streetAddress'   => '17 avenue Pierre Adhémar',
			'addressLocality' => 'Montpellier',
			'postalCode'      => '34090',
			'addressCountry'  => 'FR',
		],
		'geo'             => [
			'@type'     => 'GeoCoordinates',
			'latitude'  => 43.6047,
			'longitude' => 3.8772,
		],
		'openingHoursSpecification' => [
			[
				'@type'     => 'OpeningHoursSpecification',
				'dayOfWeek' => [ 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday' ],
				'opens'     => '00:00',
				'closes'    => '23:59',
			],
		],
		'aggregateRating' => [
			'@type'       => 'AggregateRating',
			'ratingValue' => '5',
			'reviewCount' => '47',
			'bestRating'  => '5',
			'worstRating' => '1',
		],
		'priceRange'      => '€€',
		'description'     => 'Vitrier, serrurier et miroitier à Montpellier disponible 24h/24 pour toutes urgences : vitrage cassé, serrure bloquée, miroir sur mesure.',
		'areaServed'      => [
			'@type'      => 'AdministrativeArea',
			'name'       => 'Hérault',
		],
		'serviceType'     => [ 'Vitrier', 'Serrurier', 'Miroitier' ],
	];
	echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT ) . '</script>' . "\n";
}
