const author = process.env.VERCEL_GIT_COMMIT_AUTHOR_LOGIN;
const branch = process.env.VERCEL_GIT_COMMIT_REF;

// If the branch is `gh-pages`, ignore the build.
if (branch === 'gh-pages') {
  console.log(`🛑 Ignoring build for this branch (author: ${author}, branch: ${branch})`);
  process.exit(0); // Return `0` to skip the build.
}

console.log(`✅ Proceeding with the build (author: ${author}, branch: ${branch})`);
process.exit(1); // Return `1` to proceed with the build.
