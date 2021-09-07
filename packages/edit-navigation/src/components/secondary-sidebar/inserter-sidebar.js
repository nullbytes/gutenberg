/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { close } from '@wordpress/icons';
import { __experimentalLibrary as Library } from '@wordpress/block-editor';
import { useViewportMatch } from '@wordpress/compose';
import { useRef } from '@wordpress/element';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { store as editNavigationStore } from '../../store';

function InserterSidebar() {
	const isMobileViewport = useViewportMatch( 'medium', '<' );

	const { isInserterOpened } = useSelect( ( select ) => {
		return {
			isInserterOpened: select( editNavigationStore ).isInserterOpened(),
		};
	} );

	const { setIsInserterOpened } = useDispatch( editNavigationStore );

	const inserterDialogRef = useRef();
	const inserterDialogProps = {};

	// Don't display if not opened.
	if ( ! isInserterOpened ) {
		return null;
	}

	return (
		<div
			ref={ inserterDialogRef }
			{ ...inserterDialogProps }
			className="edit-widgets-layout__inserter-panel"
		>
			<div className="edit-widgets-layout__inserter-panel-header">
				<Button
					icon={ close }
					onClick={ () => setIsInserterOpened( false ) }
				/>
			</div>
			<div className="edit-widgets-layout__inserter-panel-content">
				<Library
					showInserterHelpPanel
					shouldFocusBlock={ isMobileViewport }
				/>
			</div>
		</div>
	);
}

export default InserterSidebar;