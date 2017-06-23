/* global APP */
import { DeviceErrorDialog } from './components';
import { openDialog } from '../dialog';
import UIEvents from '../../../../service/UI/UIEvents';

import { MiddlewareRegistry } from '../redux';

import {
    SET_AUDIO_INPUT_DEVICE,
    SET_AUDIO_OUTPUT_DEVICE,
    SET_VIDEO_INPUT_DEVICE,
    SHOW_DEVICE_ERROR
} from './actionTypes';

/**
 * Implements the middleware of the feature base/devices.
 *
 * @param {Store} store - Redux store.
 * @returns {Function}
 */
// eslint-disable-next-line no-unused-vars
MiddlewareRegistry.register(store => next => action => {
    switch (action.type) {
    case SET_AUDIO_INPUT_DEVICE:
        APP.UI.emitEvent(UIEvents.AUDIO_DEVICE_CHANGED, action.deviceId);
        break;
    case SET_AUDIO_OUTPUT_DEVICE:
        APP.UI.emitEvent(UIEvents.AUDIO_OUTPUT_DEVICE_CHANGED, action.deviceId);
        break;
    case SET_VIDEO_INPUT_DEVICE:
        APP.UI.emitEvent(UIEvents.VIDEO_DEVICE_CHANGED, action.deviceId);
        break;
    case SHOW_DEVICE_ERROR:
        store.dispatch(openDialog(DeviceErrorDialog, {
            micError: action.micError,
            cameraError: action.cameraError
        }));
        break;
    }

    return next(action);
});
