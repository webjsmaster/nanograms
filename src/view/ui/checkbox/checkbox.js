import View from '../../../util/view.js';
import styles from './checkbox.module.scss';
import ElementCreator from '../../../util/element-creator.js';
import svgMoon from '../../../assets/moon.svg';
import svgSun from '../../../assets/sun.svg';
import svgVolume from '../../../assets/voice-volume.svg';
import svgMute from '../../../assets/voice-mute.svg';

export class Checkbox extends View {
    /**
     * @param {'theme' | 'sound'} type
     * @param {function} callback
     */
    constructor(type, callback) {
        /**
         * @type {import('../util/element-creator.js').ElementParams} params
         */
        const params = {
            tag: 'div',
            classNames: [styles.wrapper],
        };

        super(params);
        this.configureView(type, callback);
    }

    configureView(type, callback) {
        const wrapper = this.elementCreator.getElement();

        const value = type === 'theme' ? 'darkmode-toggle' : 'sound-toggle';

        this.input = new ElementCreator({
            tag: 'input',
            classNames: [styles.input],
            attribute: [
                { id: 'type', value: 'checkbox' },
                { id: 'id', value },
            ],
            callback: [{ event: 'change', callback }],
        }).getElement();

        const label = new ElementCreator({
            tag: 'label',
            classNames: [styles.label, type === 'theme' ? styles.theme : styles.sound],
            attribute: [
                { id: 'for', value },
            ],
        }).getElement();

        const svgMoonHtml = `${svgMoon}`;
        const svgSunHtml = `${svgSun}`;
        const svgVolumeHtml = `${svgVolume}`;
        const svgMuteHtml = `${svgMute}`;

        label.insertAdjacentHTML('beforeend', type === 'theme' ? svgSunHtml : svgVolumeHtml);
        label.insertAdjacentHTML('beforeend', type === 'theme' ? svgMoonHtml : svgMuteHtml);

        wrapper.append(this.input, label);
    }

    setValue(check) {
        this.input.checked = check;
    }
}
