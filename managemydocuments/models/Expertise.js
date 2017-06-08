var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Expertise Model
 * ==========
 */

var Expertise = new keystone.List('Expertise', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
});

var myStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: '/models/files',
    publicPath: '/files'
  }
});

Expertise.add({
    title: { type: String, required: true, label: 'Nome do Arquivo' },
    attachment: { type: Types.File, required: false, storage: myStorage, label: 'Anexo' },
    author: { type: Types.Relationship, ref: 'User', index: true , label: 'Autor'},
    description: { type: Types.Html, wysiwyg: true, height: 400, label: 'Descrição' },
});

Expertise.schema.virtual('content.full').get(function () {
    return this.content.extended || this.content.brief;
});

Expertise.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Expertise.register();
