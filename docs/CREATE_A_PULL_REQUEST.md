## How to create a Pull Request

Befor you can start to work on the project, you need 

1. Always work on a feature branch that you create out of the `main` branch of the project.

  ```bash
  $ git checkout -b my_branch_name
  ```
  Note: the `-b` flag on the `checkout` command does 2 things: 1. creates a new branch, and 2. switches to that branch.

2. Do your thing. Add tests, and implementation code. When you have at least one commit, go ahead and create a **Work In Progress** pull request by adding a WIP label to the PR. **This is an important step in a open source project so please don't forget to do that.** 

3. Continue to do your thing... Note that every time you commit and push to your own repository (your fork), the PR will be updated with those commits. There is no reason to close the PR and open a new one when you make changes. Add a description to the PR based on the template and IF your code introduces new fuctionality that is visible to the end-user, please add screen shots of the new user unterface. (Don't forget to include screen shots for **both** desktop and mobile devices) 

4. Once you think that your PR is ready for final review by your peers, make sure that you request a review from at least one team member. Better yet, request a review fron 2 or 3 members, in case people are busy and can't spend time on the project at the moment. **The project is configured in a way that prevents your PR to be merged unless there is at least one review that approves it.**

5. The Reviewer will approve and merge your code if it is okay. If not, she/he can request changes to be made. In that case you will have to address any outstanding comments and add the requested changes. If you do not agree with the reviewers suggestions/requests, you need to address the comments on the PR itself, not in Slack or email, etc. 

6. More to come...