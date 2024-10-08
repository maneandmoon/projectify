# phase4project

# Projectify

## Description

Projectify is a straightforward platform that allows students and professionals to showcase their work and connect with other students or professionals and recruiters based on interests/desires.

## Wireframe

Home Page

![projectifyhomepageP4](https://github.com/user-attachments/assets/0101747d-239c-4d9e-86d6-c14d9a36ccd7)


Profile Page

![profilepageP4](https://github.com/user-attachments/assets/b4a580ea-3cbb-43b2-a124-9aa5e12c3a42)


Project Page

![projectpageP4](https://github.com/user-attachments/assets/06b4371d-f003-49f8-ac31-0bac5552368f)


Interests Page

![interestslistP4](https://github.com/user-attachments/assets/01241f57-908e-4ef6-911d-61817812b06d)

## Prerequisites
Before starting, make sure you have completed the following:

    Git is installed.
    
    You have a GitHub account.
    
    Node.js and npm are installed.
    
    Python and pipenv are installed.
    
    Honcho is installed for managing Procfile-based applications.

## Getting Started
To set up a local instance, follow these steps:

## Front-end Installation

1. Clone the repository:

   git clone git@github.com:maneandmoon/projectify.git

3. Change to the root directory:

   cd projectify

4. Install npm packages:

   npm install

5. Move to the front-end directory:

   cd client

6. Install npm packages in the front-end directory:

   npm install

## Back-end Installation

Make sure you are in the root directory of the project.

1. Install pipenv and the necessary dependencies:

   pipenv install

3. Activate the virtual environment:

   pipenv shell

## Database Setup

1. Navigate to the data directory:

   cd server/Database-Imports

3. Create a database file from the SQL file:

   sqlite3 app.db < backup.sql

4. Alternatively, you can create a migration environment by navigating to cd server and following these prompts to create two new directories--
   instance and migrations, where app.db will be added to the instance directory.


           flask db init

           flask db migrate -m "Initial migration."

           flask db upgrade

           python seed.py

    

## Running the Application
Ensure you are in the root directory of the project.

Start the application using Honcho:

    honcho start -f Procfile.dev

## API Usage
To interact with the API, send requests to the endpoints defined in your backend. For example:

    curl -X GET http://localhost:3000

Alternatively, use a tool like Postman to set the URL to your local server's API endpoint and make your desired requests.

## Additional Notes
Verify that your SQLite database file is correctly set up before starting the back-end server.

## User Stories

1.    Users can create a basic account (global user) to access the platform
2.    Users complete their profile including adding their projects and selecting interests and then are able to view the Home page
3.    Navbar has Home (Projects), Profiles, Interests buttons
4.    Home displays cards of all the projects with details and links
1.    [If needed to satisfy model relationship requirements, users can add comments to projects]
5.    Profiles displays cards of all of the user profiles
1.    Users can click on profiles to view details including associated projects and interests
6.    Interests displays list of interests with associated users
7.    Users can edit their own profile

## Stretch Goals

1.    Add authorization and authentication for users
2.    Add project upvotes
3.    Display most upvoted projects

## React Tree Diagram
![ReactTreeUpdatedP4](https://github.com/user-attachments/assets/19a679c0-58fb-4edd-883d-b9b88c29602c)


## Schema
![SchemaUpdatedP4](https://github.com/user-attachments/assets/34dd71d7-b723-46d0-a291-6898a4dfb584)



## API Routes

**User Routes**

    GET /users: Retrieve a list of all users.
    
    POST /users: Create a new user.
    
    GET /users/<id>: Retrieve a specific user by ID.
    
    PATCH /users/<id>: Partially update a specific user by ID.
    
    DELETE /users/<id>: Delete a specific user by ID.

**Project Routes**
    
    GET /projects: Retrieve a list of all projects.

    POST /projects: Create a new project.
    
    GET /projects/<id>: Retrieve a specific project by ID.
    
    PATCH /projects/<id>: Partially update a specific project by ID.
    
    DELETE /projects/<id>: Delete a specific project by ID.

**Interest Routes**
    
    GET /interests: Retrieve a list of all interests.
    
    POST /interests: Create a new interest.
    
    GET /interests/<id>: Retrieve a specific interest by ID.
    
    PATCH /interests/<id>: Partially update a specific interest by ID.
    
    DELETE /interests/<id>: Delete a specific interest by ID.



## Stretch Goals

1. Users can enter desires (what they are looking for or building), search for and view desires, and click to collaborate
2. Display most upvoted projects and filter
3. Add authorization and authentication for users
4. Recruiters can post jobs and users can view jobs

## Kanban Board
https://trello.com/b/QsYydeA5/phase-iv-kanban
![image](https://github.com/user-attachments/assets/173424f5-e409-4fee-97ca-4af9898bb80f)


## Constraints

- A
- A

## Validations

- D
- D

