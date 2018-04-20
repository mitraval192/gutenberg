/**
 * WordPress dependencies
 */
import { unwrap, replaceTag } from '@wordpress/utils';

/**
 * Internal dependencies
 */
import { isPhrasingContent } from './utils';

/**
 * Browser dependencies
 */
const { ELEMENT_NODE } = window.Node;

function isBlockContent( node, schema = {} ) {
	return schema.hasOwnProperty( node.nodeName.toLowerCase() );
}

export default function( node, doc, schema ) {
	if ( node.nodeType !== ELEMENT_NODE ) {
		return;
	}

	if ( node.nodeName === 'SPAN' ) {
		const { fontWeight, fontStyle } = node.style;

		if ( fontWeight === 'bold' || fontWeight === '700' ) {
			node = replaceTag( node, 'strong', doc );
		} else if ( fontStyle === 'italic' ) {
			node = replaceTag( node, 'em', doc );
		}
	} else if ( node.nodeName === 'B' ) {
		node = replaceTag( node, 'strong', doc );
	} else if ( node.nodeName === 'I' ) {
		node = replaceTag( node, 'em', doc );
	}

	if (
		isPhrasingContent( node ) &&
		node.hasChildNodes() &&
		Array.from( node.childNodes ).some( ( child ) => isBlockContent( child, schema ) )
	) {
		unwrap( node );
	}
}
