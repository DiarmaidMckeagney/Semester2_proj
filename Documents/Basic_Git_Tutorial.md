# Basic Github Tutorial
#### created by Diarmaid McKeagney

This tutorial will go over the basics of creating a new branch, using github desktop, commiting code, creating pull requests, raising issues, and documentation.

## Table of Contents

1. [Branches](#branches)<br>
    1.1. [Step 1: Open Branches Menu](#step-1-open-branches-menu)<br>
    1.2. [Step 2: New Branch](#step-2-new-branch)<br>
    1.3. [Step 3:  Giving your Branch a Name](#step-3-giving-your-branch-a-name)<br>
2. [GitHub Desktop](#github-desktop)<br>
3. [Commits](#commits)<br>
    3.1. [Step 1: Titling your Commit](#step-1-titling-your-commit)<br>
    3.2. [Step 2: Adding a description](#step-2-adding-a-description)<br>
    3.3. [Step 3: Commiting and Pushing the Origin](#step-3-commiting-and-pushing-the-origin)<br>
4. [Pull Requests](#pull-requests)<br>
    4.1. [Step 1: Getting to the Pull Request Menu](#step-1-getting-to-the-pull-request-menu)<br>
    4.2. [Step 2: Titling, Describing, and Labeling Your Pull Request](#step-2-titling-describing-and-labeling-your-pull-request)<br>
    4.3. [Step 3: Approval](#step-3-approval)<br>
5. [Issue Tracker](#issue-tracker)<br>
6. [Documentation](#documentation)<br>


## Branches

Branches are a way to work on code yourself without affecting the main codebase. There is a main branch which will hold the final version of the code. There is a dev branch which we will use to develop new features. We will pull the code from the dev branch and push it to the main branch every week or so (TBD) as a new version. All group members need to create a branch for themselves. This branch will come off of the dev branch. I have called my branch "diarmaid's-branch". I think this is a good way of making it clear who's code is who.

### Step 1: Open Branches Menu

Open the main code section of the project and click on the button that tells you how many branches there are (where the mouse is clicking in the below pictured)

<img src="/Documents/Tutorial_pics/branch/creating_new_branch_step_1.png" alt="Opening the branch menu"/>

### Step 2: New Branch

You should now be on a new menu that shows you all the branches. Next you want to click on the "New Branch" option.

<img src="/Documents/Tutorial_pics/branch/creating_new_branch_step_2.png" alt="Branches Menu" />

### Step 3: Giving your Branch a Name

Now just enter the name for your branch and make sure it's source is the dev branch. Then hit "create new branch" and its done.

<img src="/Documents/Tutorial_pics/branch/creating_new_branch_step_3.png" alt="Creating new branch Menu option" />

Now whenever you commit your code, it will first be committed to your branch. Then, once you are sure that your code is ready to be added to the main project, you can submit a pull request (covered down below). 

## Github Desktop

You should download Github Desktop as it is the best visualiser for committing and managing your code. The link to download the app is [here](https://desktop.github.com/ 'github desktop link'). Once you download the app, log in to your github account. After that you can choose a repository to download on to your local computer. Pick the "clone repository" option and the project should come up as an option under the "your repos" tab. Click on the project, then choose a location on your computer to store the repo (sorry I don't have a picture for any of this).

Now you should be seeing a menu not unlike the one you see below (with the exception of the tab in blue, don't worry about that for now).
<img src="/Tutorial_pics/github_desktop/Github_Desktop_main_page.png" alt="Main Menu for Github Desktop" />

There are three main tabs on the top left of your screen. The "Current Repository" tab tells you what repo you are currently working on and gives you the option of switching to another repo if you like.

 Next to it, is the "Current Branch" tab. This will tell you what branch you are working on. **Important Note:** Make sure you are working on your own branch and not the main branch. Otherwise, any commits you make will be directly added to the main branch whitch could lead to a lot of bugs and breakages. 

 The final tab is useful if you are working on the project across multiple computers (i.e. you laptop and your pc). It will pull any changes made to the branch from the cloud and add them to your local files.

 The options in the centre of the screen allow you to open the project in vscode, open the files in your file explorer and open the github codebase in your web browser. If you have made commits to your branch as I have in the picture above, it will give you the option of previewing and creating a pull request (covered [below](#pull-requests)).

 ## Commits
 
 Opening the project in vscode (I know there are other IDEs but I'm just going to write a tutorial on this) you can edit the code however you want. Whenever you save the project (Ctrl + s), it will automatically show these changes in Github Desktop.

 <img src="/Documents/Tutorial_pics/commit/committing_github_desktop_interface_1.png" alt="Commit Menu"/>

 In the left column, it will tell you what files have been added/altered/deleted. On the right hand side of the screen, it will tell you what lines in the currently selected file have been added/altered/deleted. To commit these changes to the branch, follow these steps:

 ### Step 1: Titling your Commit

 You need to give the commit a title. This title needs to be descriptive as it will tell you and the other members of the group what this commit does for the codebase. You enter this title into the "Summary" box at the bottom left of the screen.

 <img src="/Documents/Tutorial_pics/commit/committing_github_desktop_interface_2.png" alt="Enter Summary Name"/>

### Step 2: Adding a description

 Next you should add a description. While this is not completly neccessary it will be helpful to give as much info on the changes this commit makes as possible. For very minor changes, the title might suffice in giving as much context as needed, however for more complex changes, a description is going to be very useful to others in the group.

  <img src="/Documents/Tutorial_pics/commit/committing_github_desktop_interface_3.png" alt="Give a Description"/>

### Step 3: Commiting and Pushing the Origin

  Now just press the "commit to [branch name]" button. This will commit the change to the local machine only. To push this change to the cloud, you will need to hit the "push origin" button that will appear in a blue tab in the centre of the Github Desktop main menu.

   <img src="/Documents/Tutorial_pics/commit/pushing_origin_github.png" alt="push to origin"/>

   ## Pull Requests

   A pull request allows you to add a number of commits into the codebase of the parent branch. The commits that go into your pull requests should be related to each other. For example, you are working on an early version of a feature. Once you finish coding this feature, and you have tested it to make sure it works and is stable, then you can create a pull request. **Note:** All commits you have made will be included in your pull request, so you should only work on one thing at a time. If you want to work on multiple things at once, then use multiple branches.

   ### Step 1: Getting to the Pull Request Menu

   First, go into the code page of your branch. There should be a message in a yellow box at the top saying that there were recent pushes to this branch. Click on the "Compare & Pull Request" button in green.

   <img src="/Documents/Tutorial_pics/pull_request/creating_pull_request_1.png" alt="Main code page"/>

   ### Step 2: Titling, Describing, and Labeling Your Pull Request

   This will bring you to a new menu. Here you can give a title and description to the pull request. As with the commits, please give as much context as possible. Now you should add a label to the pull request. If it is a bug fix(s), add the "bug" label. If it is a new feature add the "enhancement" tag. If it is documentation then add the "documentation" tag. Then once your happy with your pull request, click the "Create pull request" button.

   <img src="/Documents/Tutorial_pics/pull_request/creating_pull_request_2.png" alt="Main code page"/>

   ### Step 3: Approval

   Now you need to get the pull request approved. If you are committing to the dev branch you need to get one other person to approve the pull request before it can be merged. Committing to the main branch needs everyones approval before it can be merged. This is to facilitate code reviews. To view open pull requests go to the corresponding tab in the project, and click on the pull request you want to review. You can request changes to the code if you need to. When you are happy with the pull request, you can hit the "approve pull request" button.

   ## Issue Tracker

   The issue tracker feature in Github allows you to keep track of bugs and features that need adressing. I don't know if we are going to use this feature or not, but it could be handy to put the most important issues in here, so when we meet in person we can go through these issues and hopefully resolve them.

   Open the "Issues" tab in the project menu. This will bring you to a menu listing all the current open issues. Clicking on the "new issue" button will bring you to a menu not unlike the pull request menu where you can add a title and description for your issue and label it. When you are done just hit "submit new issue" and it will show up with all the others.

   ## Documentation

   We need to document our code so that other members of the group and the examiner can easily navigate and find out more info on our code. The easiest document format to use is Markdown (which is what I am using to make this tutorial). All Markdown files end in ".md" . There are many great resources to use to learn Markdown basics such as [this](https://www.markdownguide.org/basic-syntax/ 'markdown guide dot org') and [this](https://www.geeksforgeeks.org/introduction-to-markdown/ 'geeks for geeks dot org'). These files will be stored in a docs file when we get the project set up. In the docs folder, they will be stored in relevant folders which will help everyone to find things easier.
