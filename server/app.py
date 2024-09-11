#!/usr/bin/env python3

# Standard library imports (SK: added Flask, make_response and jsonify)
from flask import Flask

#from flask_cors import CORS
#from flask_migrate import Migrate
#from flask_restful import Api
#from flask_sqlalchemy import SQLAlchemy
#from sqlalchemy import MetaData


# Remote library imports
from flask import request, make_response
from flask_restful import Resource


# Local imports
from config import app, db, api
# Add your model imports (SK: added models here to be imported)
from models import User, Project, Interest, UserInterest, ProjectInterest, Comment
#from sqlalchemy.exc import IntegrityError



# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


# | HTTP Verb     |      Path       | Description         |
# |-------------  |:---------------:|-------------------  |
# | GET           |     /users      | READ all users      |
# | POST          |     /users      | CREATE one user     |
# | GET           |   /users/:id    | READ one user       |
# | PATCH         |   /users/:id    | UPDATE one user     |
# | DELETE        |   /users/:id    | DELETE one user     |



## USER Routes
@app.route('/users', methods = ['GET', 'POST'])
def users():

    if request.method == 'GET':

        users = User.query.all()

        if (not users):
            return make_response ({"message":"No Users found"}, 404)

        user_dict = [user.to_dict() for user in users]

        return make_response(user_dict, 200)

    elif request.method == 'POST':

        data = request.get_json()

        existing_user = User.query.filter_by(username=data.get("username")).first()
        if existing_user:
             return make_response(({"error": "Username already exists"}), 400)

        existing_email = User.query.filter_by(email=data.get("email")).first()
        if existing_email:
            return make_response(({"error": "Email already exists"}), 400)

        try:
            users = User(
                username = data.get("username"),
                email = data.get("email"),
                password = data.get("password"),
                bio = data.get("bio"),
                avatar = data.get("avatar")
                )

            db.session.add(users)
            db.session.commit()

            return make_response(users.to_dict(), 201)

        except:
            return make_response({"message":"something went wrong - unprocessable entity"}, 422)


@app.route('/users/<int:id>', methods = ['GET', 'PATCH', 'DELETE'])
def user_by_id(id):

    user = User.query.filter(User.id == id).first()

    if (not user):
            return make_response({"error": f"User {id} not found"}, 404)

    if request.method == 'GET':

        return make_response(user.to_dict(), 200)

    elif request.method == 'PATCH':

        try:
            data = request.get_json()
            for cur_field in data:
                setattr(user, cur_field, data.get(cur_field))
            db.session.add(user)
            db.session.commit()

            return make_response(user.to_dict(), 200)

        except:
            return make_response({"message":"patch went wrong"}, 422)

    elif request.method == 'DELETE':

        db.session.delete(user)
        db.session.commit()

        response_body = {
            "delete_successful": True,
            "message": "User deleted."
        }

        return make_response(response_body, 204)


## PROJECT Routes
@app.route('/projects', methods = ['GET', 'POST'])
def projects():

    if request.method == 'GET':

        projects = Project.query.all()

        if (not projects):
            return make_response ({"message":"No Projects found"}, 404)

        project_dict = [project.to_dict() for project in projects]

        return make_response(project_dict, 200)

    elif request.method == 'POST':

        data = request.get_json()

        try:
            projects = Project(
                user_id = data.get('user_id'),
                title = data.get("title"),
                description = data.get("description"),
                link = data.get("link")
                )

            db.session.add(projects)
            db.session.commit()

            return make_response(projects.to_dict(), 201)

        except:
            return make_response({"message":"something went wrong - unprocessable entity"}, 422)


@app.route('/projects/<int:id>', methods = ['GET', 'PATCH', 'DELETE'])
def project_by_id(id):

    project = Project.query.filter(Project.id == id).first()

    if (not project):
            return make_response({"error": f"Project {id} not found"}, 404)

    if request.method == 'GET':

        return make_response(project.to_dict(), 200)

    elif request.method == 'PATCH':

        try:
            data = request.get_json()
            for cur_field in data:
                setattr(project, cur_field, data.get(cur_field))
            db.session.add(project)
            db.session.commit()

            return make_response(project.to_dict(), 200)

        except:
            return make_response({"message":"patch went wrong"}, 422)

    elif request.method == 'DELETE':

        db.session.delete(project)
        db.session.commit()

        response_body = {
            "delete_successful": True,
            "message": "Project deleted."
        }

        return make_response(response_body, 204)


## INTEREST Routes
@app.route('/interests', methods = ['GET', 'POST'])
def interests():

    if request.method == 'GET':

        interests = Project.query.all()

        if (not interests):
            return make_response ({"message":"No Interests found"}, 404)

        interest_dict = [interest.to_dict() for interest in interests]

        return make_response(interest_dict, 200)

    elif request.method == 'POST':

        data = request.get_json()

        try:
            interests = Interest(name = data.get("name"))

            db.session.add(interests)
            db.session.commit()

            return make_response(interests.to_dict(), 201)

        except:
            return make_response({"message":"something went wrong - unprocessable entity"}, 422)


@app.route('/interests/<int:id>', methods = ['GET', 'PATCH', 'DELETE'])
def interest_by_id(id):

    interest = Interest.query.filter(Interest.id == id).first()

    if (not interest):
            return make_response({"error": f"Interest {id} not found"}, 404)

    if request.method == 'GET':

        return make_response(interest.to_dict(), 200)

    elif request.method == 'PATCH':

        try:
            data = request.get_json()
            for cur_field in data:
                setattr(interest, cur_field, data.get(cur_field))
            db.session.add(interest)
            db.session.commit()

            return make_response(interest.to_dict(), 200)

        except:
            return make_response({"message":"patch went wrong"}, 422)

    elif request.method == 'DELETE':

        db.session.delete(interest)
        db.session.commit()

        response_body = {
            "delete_successful": True,
            "message": "Interest deleted."
        }

        return make_response(response_body, 204)



## COMMENT Routes
@app.route('/comments', methods = ['GET', 'POST'])
def comments():

    if request.method == 'GET':

        comments = Comment.query.all()

        if (not comments):
            return make_response ({"message":"No Comments found"}, 404)

        comment_dict = [comment.to_dict() for comment in comments]

        return make_response(comment_dict, 200)

    elif request.method == 'POST':

        data = request.get_json()

        try:
            comments = Comment(content = data.get("content"),
                                project_id = data.get('project_id'),
                                user_id = data.get('user_id')
                                )

            db.session.add(comments)
            db.session.commit()

            return make_response(comments.to_dict(), 201)

        except:
            return make_response({"message":"something went wrong - unprocessable entity"}, 422)


@app.route('/comments/<int:id>', methods = ['GET', 'DELETE', 'PATCH'])
def comment_by_id(id):

    comment = Comment.query.filter(Comment.id == id).first()

    if (not comment):
            return make_response({"error": f"Comment {id} not found"}, 404)

    if request.method == 'GET':

        return make_response(comment.to_dict(), 200)

    elif request.method == 'PATCH':

        try:
            data = request.get_json()
            for cur_field in data:
                setattr(comment, cur_field, data.get(cur_field))
            db.session.add(comment)
            db.session.commit()

            return make_response(comment.to_dict(), 200)

        except:
            return make_response({"message":"patch went wrong"}, 422)

    elif request.method == 'DELETE':

        db.session.delete(comment)
        db.session.commit()

        response_body = {
            "delete_successful": True,
            "message": "Comment deleted."
        }

        return make_response(response_body, 204)



if __name__ == '__main__':
    app.run(port=5555, debug=True)

