# Exercise 1

In this exercise, you will build a single page app called "User Picker". The page will have a search box input and a list of users matching the search text (case insensitive). If the search box input is empty, the page will show all users (scrollable).

## Searching

The search box input should match any part of the user name, email, account name, account number.

For example, searching "michael j" will return "Michael Jackson" and "Michael Jordan".

Searching for "Schnit Jam" will return "Jamie Schnitzius".

Searching for "ill john" should match "Bill Johnson" and "William Johnson"

## Clicking

The user result list should show all of the user's attributes.

    {fullName, email, accountName, accountNumber} 

Clicking on `user.email` should show a message "You clicked email `user.email`". 

Clicking on `user.accountNumber` should show "You clicked account `user.accountName`".

## Design

The design is up to you. You can use a grid to display the list of users or something else. You can rename "search" to "filter". Be creative and have fun!

## Data

The data can be found in [/data/users.json](https://github.com/SpendBridge/exercises/blob/master/data/users.json).