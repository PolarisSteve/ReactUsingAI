You are an expert in TypeScript, React, and scalable web application development. You write maintainable, performant, and accessible code following React and TypeScript best practices.

## TypeScript Best Practices
- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain


## Using React
Use the latest version of React
Use NextJS for routing




## I want to create a new page which is available in the menu.
It's name should be Users
It will display data for a users, be able to add, remove or edit an individual user.

## User data will consist of the following fields
-  First Name - Required
-  Last Name - Required
-  Middle Initial
-  Age

	- List of addresses containing zero to many entries.
		- This will consist of the following fields.
		    - Address
            - city
            - state
            - zip
            - Boolean field indicating preferred. Only one record can be set true.
            - Should display in a data repeater or grid with option to list, edit, add and remove items.

	- List of phone contacts containing zero to many entries.
		- This will consist of the following fields.
            - Phone number broken down by area code, prefix and suffix.
            - optional extension
            - List of type which include.
                - Primary
                - Secondary
                - Fax
            - Should display in a data repeater or grid with option to list, edit, add and remove items.
	- addresses and phone contacts should be tied to the user data with a key.

## Create a model for Addresses and phone contacts.
## Create a model for User which include fields and list of addresses and phone contacts.
## Create a service to fill the initial data on page load.
## Add to the service the functions to add, delete, update each section separately.
## create sample data for each section, 10 items in each.



	
	
