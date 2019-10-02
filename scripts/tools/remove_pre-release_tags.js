'use strict';

const exec = require('child_process').exec;

// All tags older than this date will be deleted.
const cutOffDate = new Date('2019-10-02');

fetchTagsFromRemote()
  .then(getAllTags)
  .then(removeTags);

async function fetchTagsFromRemote() {
  console.log('Sync local tag list with remote solution...');
  await execCommand('git fetch -p');
}

async function getAllTags() {

  const command = 'git log --tags --simplify-by-decoration --pretty="format:%ai %d"';
  const results = await execCommand(command);

  const splitResults = results.split('\n');

  console.log('Filter tags with matching date');
  const resultsWithMatchingDate = splitResults.filter((entry) => {
    const datePart = entry.split('(')[0].trim();
    const tagDate = new Date(datePart);
    return cutOffDate > tagDate;
  });

  if (resultsWithMatchingDate.length === 0) {
    console.log('No matching tags found');
    return [];
  }

  const regExp = /v\d.*-(pre|alpha|beta)[^),]+/g
  const matches = resultsWithMatchingDate.join('\n').match(regExp) || [];

  if (!matches || matches.length === 0) {
    console.log('No matching tags found');
    return [];
  }

  // Some tags are stored like "2018-09-20 10:28:11 +0200  (tag: v2.2.0-pre-b48, tag: v2.2.0-pre-b47)"
  // Meaing there is more than one tag in a row.
  const flattenedResults = [];
  for (const tag of matches) {
    const multipleTags = tag.indexOf(',') > -1;
    if (multipleTags) {
      flattenedResults.push(...tag.split(', tag: '))
    } else {
      flattenedResults.push(tag);
    }
  }

  console.log(`Found ${flattenedResults.length} matching tags to remove`);
  flattenedResults.forEach((tag) => console.log(tag));

  return flattenedResults;
}

async function removeTags(tagsToRemove) {

  if (tagsToRemove.length === 0) {
    console.log('Nothing to do here. Exiting.');
    process.exit(0);
  }

  const concattedTags = tagsToRemove.join(' ');

  console.log('Delete tags from remote solution');
  await execCommand(`git push --delete origin ${concattedTags}`);

  console.log('Delete tags locally');
  await execCommand('git fetch --prune origin +refs/tags/*:refs/tags/*');
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
