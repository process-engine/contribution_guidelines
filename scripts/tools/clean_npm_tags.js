'use strict';

const exec = require('child_process').exec;

let packageName; // Set through environment variable.
let branchPrefix = 'feature'; // Can be overwritten by environment variable.

// This is to prevent the user from deleting tags like latest, alpha or beta.
// Note that develop has become obsolete with the introduction of the alpha and beta versions
const allowedTagNames = ['feature', 'hotfix', 'release', 'betafix', 'develop'];

readCommandLineArgs()
  .then(verifyPackageName)
  .then(findMatchingNpmTags)
  .then(removeNpmTags);

async function readCommandLineArgs() {

  console.log('Parsing command line arguments...');
  const packageNameArg = process.env.PACKAGE_NAME;
  if (!packageNameArg) {
    console.error(`ERROR: Must provide a value for environment variable PACKAGE_NAME! This is required for 'npm dist-tag' commands to work!`);
    process.exit(1);
  }

  packageName = packageNameArg;

  const branchPrefixArg = process.env.BRANCH_PREFIX;
  if (branchPrefixArg !== undefined) {

    const isAllowedTag = allowedTagNames.find((tag) => tag === branchPrefixArg);
    if (!isAllowedTag) {
      console.error(`ERROR: BRANCH_PREFIX can only be one of the following values: `, allowedTagNames.join(' '));
      process.exit(1);
    }
    branchPrefix = branchPrefixArg;
  }

  return Promise.resolve(packageName);
}

async function verifyPackageName() {
  try {
    console.log('Verifying package name...');
    await execCommand(`npm view ${packageName}`)
  } catch (error) {
    console.error(`ERROR: ${packageName} was not found in the npm registry!`);
    process.exit(1);
  }
}

async function findMatchingNpmTags() {
  console.log('Retrieving npm tags...');
  const tagsAsString = await execCommand(`npm dist-tag ls ${packageName}`);

  const allTags = tagsAsString.split('\n');

  console.log(`Filter tags with '${branchPrefix}' prefix...`);
  const matchingTags = allTags.filter((tag) => tag.startsWith(branchPrefix));

  // NOTE: npm lists its tags like so: "feature~unhandled_promise_rejection_stacktrace: 0.1.3-71476da6-b1";
  // We must remove the linked version before we can use the tag name.
  const plainTags = matchingTags.map((tag) => tag.split(':')[0]);

  console.log(`Found ${plainTags.length} matching npm tags:`);
  plainTags.forEach((tag) => console.log(tag));

  return plainTags;
}

async function removeNpmTags(tagsToRemove) {

  console.log('Removing npm tags. This could take a while...');
  // NOTE: 'npm dist-tag rm' does NOT accept multiple arguments. So we must run this command for each tag we want to remove.
  // Using a "classic" for here to speed things up a little.
  for(let i = 0; i < tagsToRemove.length; i++) {
    const tag = tagsToRemove[i];
    console.log(`Removing tag: ${tag}`);
    await execCommand(`npm dist-tag rm ${packageName} ${tag}`);
  }
  console.log('Done!');
}

async function execCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      resolve(stdout)
    });
  });
}
