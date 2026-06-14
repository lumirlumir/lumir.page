---
title: 'What Are ***Github Issues***?'
description: 'GitHub **Issues** is a tool for managing bug fixes, schedules, ideas, and more; it integrates with **Projects** to provide visualization and automation features, and helps track issues by linking with **Commit**.'
created: '2024-03-21'
updated: '2024-07-21'
categories:
  - 'git'
references:
  - 'https://docs.github.com/ko/issues'
---

***Issues*** is a tool provided by ***Github*** to enable ***Issues Tracking***. It also provides various visualization tools such as its own ***Issues***, ***Projects***, and ***Insights*** features.

You can think of it as a collaboration management tool such as ***Asana*** or ***Jira***.

However, the biggest difference is that ***Github*** ***Issues*** are directly integrated with a ***Github*** ***Repository***, making them much more useful for developers to track and resolve ***Issues*** along with code work.

New features are continuously added to ***Issues***, and sometimes beta features are added and then removed. Because the content of the document may continue to be revised, I have briefly summarized the link to the official ***Github*** documentation and the content of that part.

For accurate content, referring to the official documentation is the most certain. Looking at the official documentation, you can see that ***Issues*** can be strongly integrated with various features on ***Github***, and various features are also provided within ***Issues***.

## 1. ***Issues***(Problems)

In ***Issues***, you can manage not only content about fixes such as bugs, but also everything such as schedules, ideas, feedback, task content, documentation changes, bug management, and so on.

It can be used together with ***Pull Request***, used together with ***Projects***, and even automation of ***Issues*** through ***Workflows*** is possible.

### 1-1. Linking with ***Commit***

***Issues*** have numbers such as `#1`, `#2`, and `#3`. If you enter this in a ***Commit Message*** as `"Commit Message... #1"`, the related ***Commit*** is automatically shown in the ***Issues***.

## 2. ***Projects***

As ***Issues*** increase, management inevitably becomes difficult. Among countless ***Issues***, it will not be easy to distinguish and classify 'what I need to do now' or 'what a team member needs to proceed with.'

Therefore, ***Projects*** are used to automatically classify and visualize these various ***Issues*** according to specific conditions. (In other words, ***Projects*** operate based on ***Issues***.)

For how to use them, I recommend creating ***Projects*** and ***Issues*** for testing, then directly clicking and checking various features. Because it is ***Spreadsheet***-based, you should be able to understand the rough features easily without a user manual.

### 2-1. Learn about ***Projects***

An overview of ***Projects***.

### 2-2. Create ***Projects***

Explains how to create and copy organization or user ***Projects***. It also explains how to ***Migration*** from the old version, ***Projects Classic***.

### 2-3. Manage Items in ***Projects***

Explains how to bring ***Issues*** items into ***Projects***.

### 2-4. Understand ***Field***(Fields)

Explains ***Field***.

### 2-5. Customize Views

Explains ***Layout*** options such as ***Table***, ***Board***, and ***Roadmap***.

In the 'project filtering' part, it explains how to filter ***Field*** values such as `assignee:USERNAME`, `is:STATE`, and `is:TYPE`.

### 2-6. Automate ***Projects***

There are three ways to automate ***Projects***.

1. Using the built-in automation, ***Projects Workflows***.
1. Using the ***Github API***.
1. Using ***Github Workflows***.

### 2-7. View ***Insights***

Explains ***Insights***, a feature that can create charts related to ***Projects***.

### 2-8. Manage ***Projects***

Explains how to change ***Projects*** to ***Public*** or ***Private***, manage ***Access***, manage ***Template***, and so on.

## 3. ***Tracklists***(Task Lists)

As of the time of writing, it says, 'Task lists are in private beta and subject to change. We have temporarily paused beta onboarding.' Currently, detailed task management using the <code>```[tasklist]</code> syntax is not possible.

Instead, it is possible to manage detailed tasks using only the `- []` checklist feature of ***Github Markdown***. You can check detailed progress, such as how many tasks have been completed, just below the title.

![6 tasks done](/apps/blog/public/images/posts/what-is-github-issues/1.webp?raw=true)

![tasklist](/apps/blog/public/images/posts/what-is-github-issues/2.webp?raw=true)

## 4. ***Projects Classic***

'***4. Projects Classic***' is the previous ***Github*** project management system and refers to the old version.

The ***Projects*** explained in '***2. Projects***' are the latest version of ***Github Projects*** and provide much more diverse and flexible features.

***Github*** provides methods for ***Migration*** from the old version, ***Projects Classic***, to the latest version, ***Projects***.

Currently, creating new ***Projects Classic*** is restricted only to users who already have at least one ***Projects Classic***.
In other words, people who used ***Projects Classic*** can continue using it or create new ones, but new users are restricted from creating ***Projects Classic*** and can only create the latest version, ***Projects***.

Therefore, people who want to use ***Projects*** for the first time must use the latest version, ***Projects***.

## 5. ***Labels*** and ***Milestones***

Explains ***Labels*** and ***Milestones*** in the ***Issues*** tab of a ***Repository***. There is nothing very difficult, so please read the official documentation carefully.
