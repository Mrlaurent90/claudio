const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const fs = require( 'fs' );

// Un objet de config webpack par bloc (tableau → webpack compile en parallèle)
const blocksDir = path.resolve( __dirname, 'blocks' );
const blockNames = fs.readdirSync( blocksDir ).filter( ( name ) => {
	return fs.existsSync( path.join( blocksDir, name, 'index.js' ) );
} );

module.exports = blockNames.map( ( blockName ) => ( {
	...defaultConfig,
	entry: {
		index: path.resolve( blocksDir, blockName, 'index.js' ),
	},
	output: {
		path: path.resolve( blocksDir, blockName, 'build' ),
		filename: '[name].js',
		clean: true,
	},
} ) );
