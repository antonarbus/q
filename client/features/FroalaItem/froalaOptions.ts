export const froalaOptions = {
  toolbarInline: true,
  fontSizeSelection: true,
  charCounterCount: false,
  tabSpaces: 4,
  toolbarButtons: {
    moreText: {
      buttons: ['fontSize', 'textColor', 'backgroundColor', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'inlineClass', 'inlineStyle', 'clearFormatting'],
      buttonsVisible: 3,
    },
    moreParagraph: {
      buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
      buttonsVisible: 3,
    },
    moreRich: {
      buttons: ['insertLink', 'insertTable', 'insertImage', 'insertVideo', 'emoticons', 'embedly', 'fontAwesome', 'specialCharacters', 'insertFile', 'insertHR', 'html'],
      buttonsVisible: 4,
    }
  },
  fontFamily: { Roboto: 'Roboto', Arial: 'Arial', Georgia: 'Georgia', Tahoma: 'Tahoma', Verdana: 'Verdana', Helvetica: 'Helvetica', 'Trebuchet MS': 'Trebuchet MS', 'Times New Roman': 'Times New Roman', Garamond: 'Garamond', 'Courier New': 'Courier New', 'Brush Script MT': 'Brush Script MT' },
  placeholderText: 'Type text, insert links, drop files or pictures...',
  tableInsertHelper: false,
  tableInsertMaxSize: 12,
  // https://froala.com/wysiwyg-editor/docs/concepts/image/upload/
  // imageUploadURL: './../phps/upload_image.php',
  // fileUploadURL: './../phps/upload_file.php',
  // videoUploadURL: './../phps/upload_video.php',
  fileMaxSize: 1024 * 1024 * 30,
  // https://froala.com/wysiwyg-editor/docs/events/
  events: {
    // https://froala.com/wysiwyg-editor/docs/events/#image.removed
    'image.removed': function ($img) {
      // Do something here.
      console.log(this)
      console.log($img.attr('src'))
    },
    'paste.before': function () {
      console.log('paste before - froala')
      // addToUndoArr()
    },
    // https://froala.com/wysiwyg-editor/docs/events/#paste.after
    'paste.after': function () {
      console.log('paste after - froala')
      // addToUndoArr()
    },
    initialized: function () {
      // $('a[href*="froala"]').parent().remove()
    },
    'toolbar.show': function () {
      // console.log('toolbar on')

    },
    'toolbar.hide': function () {
      // console.log('toolbar off')
    }
  },
  key:
    'AVB8B-21D4B3B2E1F1G1uB-33B-21cyoF-10yB-7G-7gB-22zzE2wkA-7gC7B7D6B4E4F3D2I3H2C5==',
}
