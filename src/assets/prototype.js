const prototypes = function() {
  Set.prototype.toggle = function(item) {
    if (this.has(item)) {
      this.delete(item);
    } else {
      this.add(item);
    }
  };
}

export default prototypes;