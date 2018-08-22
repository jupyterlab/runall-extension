import {
  IDisposable
} from '@phosphor/disposable';

import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  ToolbarButton
} from '@jupyterlab/apputils';

import {
  DocumentRegistry
} from '@jupyterlab/docregistry';

import {
  NotebookPanel, INotebookModel
} from '@jupyterlab/notebook';

import '../style/index.css';


class RunAllCellsButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {

  constructor(app: JupyterLab) {
    this.app = app;
  }

  readonly app: JupyterLab;

  createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
    // Create the on-click callback for the toolbar button.
    let runAllCells = () => {
      this.app.commands.execute('notebook:run-all-cells');
    };

    // Create the toolbar button
    let button = new ToolbarButton({
      className: 'runAllCellsButton',
      iconClassName: 'fa fa-fast-forward',
      onClick: runAllCells,
      tooltip: 'Run All Cells'
    });

    // Add the toolbar button to the notebook
    panel.toolbar.insertItem(6, 'runAllCells', button);

    // The ToolbarButton class implements `IDisposable`, so the
    // button *is* the extension for the purposes of this method.
    return button;
  }
}


function activate(app: JupyterLab): void {
  let buttonExtension = new RunAllCellsButtonExtension(app);
  app.docRegistry.addWidgetExtension('Notebook', buttonExtension);
  app.contextMenu.addItem({
    selector: '.jp-Notebook',
    command: 'notebook:run-all-cells',
    rank: -0.5
  });
}


const extension: JupyterLabPlugin<void> = {
  id: 'runall-extension',
  autoStart: true,
  activate
};


export default extension;
