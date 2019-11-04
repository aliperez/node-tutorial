var _ = require('underscore');

// First, require assumes input is a core module
// There is no core module called underscore
// So it looks for a file or folder
// In order to reference file or folder need ./ 
// So require function moves on to third step,
// it assumes underscore exists in node_modules

var result = _.contains([1, 2, 3], 2);

console.log(result);