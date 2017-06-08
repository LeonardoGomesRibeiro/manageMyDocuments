var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * File Model
 * ==========
 */

var File = new keystone.List('File', {
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

File.add({
    title: { type: String, required: true, label: 'Nome do Arquivo' },
    attachment: { type: Types.File, storage: myStorage, label: 'Anexo' },
    state: { type: Types.Select, options: 'rascunho, publicado', default: 'rascunho', index: true, label: 'Estado do arquivo' },
    author: { type: Types.Relationship, ref: 'User', index: true , label: 'Autor'},
    publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' }, label: 'Data de Publicação' },
    content: {
        brief: { type: Types.Html, wysiwyg: true, height: 150, label: 'Resumo Breve'},
        extended: { type: Types.Html, wysiwyg: true, height: 400, label: 'Resumo Longo' },
    }
});

File.schema.virtual('content.full').get(function () {
    return this.content.extended || this.content.brief;
});

File.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
File.register();
