const TextifyMixin = {

  toBlessedContent() {
    return this.toString();
  },

  toText() {
    // TODO: Remove {..}
    return this.toBlessedContent();
  },

  toBlessedContentLine() {
    return this.toBlessedContent().replace(/\n+/g, ' ');
  },

  toTextLine() {
    return this.toText().replace(/\n+/g, ' ');
  },
};


export default TextifyMixin;
