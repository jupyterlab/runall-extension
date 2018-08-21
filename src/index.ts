import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the runall-extension extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'runall-extension',
  autoStart: true,
  activate: (app: JupyterLab) => {
    console.log('JupyterLab extension runall-extension is activated!');
  }
};

export default extension;
