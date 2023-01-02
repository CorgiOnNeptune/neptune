# Git Workflow w/ PRs

## NEVER CODE ON MAIN/MASTER

---

## Update Master Branch

1. Open your forked repo
2. Sync master branch of your forked repo to the original repo

![](https://i.imgur.com/ds6KOZd.png)

3. Make sure you are on your master branch locally
4. Make sure you have no outstanding changes

```bash
> git status
On branch master

> git pull
> git status
Your branch is up to date with 'origin/master'.
```

4. There should not be any conflicts. If there are, you may have outstanding changes locally or one of us made changes directly to a master branch.
5. If there are untracked files, you should be safe to move to the appropriate branch and commit them.

&nbsp;

## Make a new branch and Pull Request

1. Complete [^above^](#make-sure-your-main-branch-is-up-to-date) to make sure your master branch is up to date.
2. Create a new branch from your up to date master.

```bash
> git checkout master
> git status
On branch master
Your branch is up to date with 'origin/master'.

> git checkout -b feature/newBranchName
```

3. Now code and make plenty of commits along the way.
4. When your branch is ready:
5. AGAIN make sure your [master branch is up to date](#make-sure-your-master-branch-is-up-to-date).
6. Merge your master to your feature branch.

```bash
> git status
On branch feature/newBranchName
Your branch is up to date with 'origin/feature/newBranchName'.

nothing to commit, working tree clean

> git merge master

> git status (Check it auto-merged correctly)
On branch feature/newBranchName
Your branch is ahead of 'origin/feature/newBranchName' by x commits.

nothing to commit, working tree clean

> git push (To publish the merge changes, if any)
> git status
On branch feature/newBranchName
Your branch is up to date with 'origin/feature/newBranchName'.

nothing to commit, working tree clean
```

7. Go to [main repo](https://github.com/CorgiOnNeptune/midterm).
8. Click Pull requests -> New pull request
9. Branch comparison should look something like this:
   ![](https://i.imgur.com/6vdk90E.png)
10. Double-check your file changes don't have anything unintended and submit the pull request.

&nbsp;

## After PR merged

1. Make sure to [sync your master branch](#make-sure-your-master-branch-is-up-to-date) again.
2. Then `git checkout master` locally and make sure you are up-to-date.
   - Feel free to delete the completed branch both in your forked repo, and on your local system (`git branch -d feature/localBranchName`) if you are not going to use that branch again.
   - Run `git fetch -p` to clean-up your remote-tracking references if you have deleted the branch.
