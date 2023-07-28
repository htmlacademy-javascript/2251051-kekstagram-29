/* eslint-disable */

import './util.js';
import './data.js';
import './miniature-list.js';
import './big-picture.js';
import './miniature-list.js';
import './form.js';
import './picture-filters.js';
import './api.js';
import './filter-images.js';
import { setUserFormSubmit } from './form.js';
import { closeUserModal } from './big-picture.js';
import { renderErrorWindow, renderSuccessWindow } from './success-error-windows.js';
import { getData, sendData } from './api.js';
import { renderMiniatures } from './miniature-list.js';
import { debounce, showAlert } from './util.js';
import { getFilteredMiniatures, initFilter } from './filter-images.js';

setUserFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeUserModal()
    renderSuccessWindow();
  } catch {
    renderErrorWindow();
  }
});

try {
  const data = await getData();
  const debouncedGallery = debounce(renderMiniatures);
  initFilter(data, debouncedGallery);
  renderMiniatures(getFilteredMiniatures());
} catch (err) {
  showAlert(err.message);
}
