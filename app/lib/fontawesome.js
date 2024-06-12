// lib/fontawesome.js
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/pro-solid-svg-icons'; // Pro Solid icons
import { far } from '@fortawesome/pro-regular-svg-icons'; // Pro Regular icons
import { fal } from '@fortawesome/pro-light-svg-icons'; // Pro Light icons
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false; // Prevent Font Awesome from automatically adding the CSS
library.add(fas, far, fal); // Add all icon sets to the library
