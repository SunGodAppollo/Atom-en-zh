'use babel';

import TyPackageView from './ty-package-view';
import { CompositeDisposable } from 'atom';

export default {

  tyPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.tyPackageView = new TyPackageView(state.tyPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.tyPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ty-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.tyPackageView.destroy();
  },

  serialize() {
    return {
      tyPackageViewState: this.tyPackageView.serialize()
    };
  },

  toggle() {
    console.log('TyPackage was toggled!');
    editor = atom.workspace.getActiveTextEditor()
    //获得全部的文本
    //words = editor.getText().split(/\s+/).length
    //获得选中的文本
    words = editor.getSelectedText()
    this.tyPackageView.fun(words);
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
